import {
  ACESFilmicToneMapping, Box3, DirectionalLight, Group,
  HemisphereLight, Mesh, PerspectiveCamera, PMREMGenerator, Scene, SRGBColorSpace,
  Texture, Vector3, WebGLRenderer, type Material, type Object3D, type WebGLRenderTarget,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { createRocketAnimation } from "./animation";
import { createCameraDirector, type StoryProjection } from "./director";
import { storyFrame } from "./story";

export type RocketViewer = {
  seek: (progress: number) => void;
  resize: () => void;
  dispose: () => void;
};

function disposeModel(roots: Object3D[]) {
  const geometries = new Set<Mesh["geometry"]>();
  const materials = new Set<Material>();
  const textures = new Set<Texture>();
  for (const root of roots) root.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    geometries.add(object.geometry);
    for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
      materials.add(material);
      for (const value of Object.values(material)) if (value instanceof Texture) textures.add(value);
    }
  });
  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  textures.forEach((texture) => {
    texture.dispose();
    if (typeof ImageBitmap !== "undefined" && texture.image instanceof ImageBitmap) texture.image.close();
  });
}

/** Called only after the section approaches the viewport, inside a client effect. */
export async function createRocketViewer(
  host: HTMLDivElement,
  modelUrl: string,
  signal: AbortSignal,
  onContextLost: () => void,
  onFrame: (projection: StoryProjection) => void,
): Promise<RocketViewer> {
  const canvas = document.createElement("canvas");
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    const error = new Error("此瀏覽器或裝置目前無法使用 WebGL 2。");
    error.name = "WebGLUnavailableError";
    throw error;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  const scene = new Scene();
  scene.add(new HemisphereLight(0xdbeafe, 0x111827, 1.4));
  const key = new DirectionalLight(0xf1f5ff, 3);
  key.position.set(-3, 4, 5);
  const rim = new DirectionalLight(0xffa45b, 4);
  rim.position.set(3, 2, -4);
  scene.add(key, rim);
  const camera = new PerspectiveCamera(30, 1, 0.01, 100);
  const director = createCameraDirector(camera);
  const flight = new Group();
  const centered = new Group();
  scene.add(flight);
  flight.add(centered);
  let roots: Object3D[] = [];
  let animation: ReturnType<typeof createRocketAnimation> | undefined;
  let environmentMap: WebGLRenderTarget | undefined;
  let disposed = false;
  const contextLost = (event: Event) => {
    event.preventDefault();
    if (!disposed) onContextLost();
  };
  canvas.addEventListener("webglcontextlost", contextLost);

  function dispose() {
    if (disposed) return;
    disposed = true;
    signal.removeEventListener("abort", dispose);
    canvas.removeEventListener("webglcontextlost", contextLost);
    animation?.dispose();
    disposeModel(roots);
    environmentMap?.dispose();
    scene.clear();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  }

  signal.addEventListener("abort", dispose, { once: true });
  try {
    signal.throwIfAborted();
    const response = await fetch(modelUrl, { signal });
    if (!response.ok) throw new Error(`Model HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    signal.throwIfAborted();
    const gltf = await new GLTFLoader().parseAsync(buffer, modelUrl.slice(0, modelUrl.lastIndexOf("/") + 1));
    // Parsing is not abortable; release late results after navigation/unmount.
    if (signal.aborted) {
      disposeModel(gltf.scenes);
      signal.throwIfAborted();
    }
    roots = gltf.scenes;
    // The GLB uses a metallic PBR material; soft studio reflections keep it legible.
    // Generated locally once, with no extra image downloads or animation loop.
    const environment = new RoomEnvironment();
    const pmrem = new PMREMGenerator(renderer);
    try {
      environmentMap = pmrem.fromScene(environment, 0.04);
      scene.environment = environmentMap.texture;
    } finally {
      environment.dispose();
      pmrem.dispose();
    }
    animation = createRocketAnimation(gltf.scene, gltf.animations);
    const oriented = new Group();
    // The exported rocket points along -Z. Present it upright without altering the GLB.
    oriented.rotation.x = Math.PI / 2;
    oriented.add(gltf.scene);
    centered.add(oriented);
    animation.setTime(animation.start);
    const assembled = new Box3().setFromObject(oriented);
    const assembledHeight = assembled.getSize(new Vector3()).y;
    centered.position.copy(assembled.getCenter(new Vector3())).negate();
    const bounds = new Box3();
    const anchors: Record<string, Vector3> = {};
    const groupBounds = new Box3();
    const tail = new Vector3();
    let progress = 0;

    function render() {
      if (disposed) return;
      const frame = storyFrame(progress, animation!.start, animation!.end);
      animation!.setTime(frame.time);
      // Fit the pre-flight pose; translating the wrapper must not drag the camera upward.
      flight.position.y = 0;
      scene.updateMatrixWorld(true);
      bounds.setFromObject(centered);
      for (const node of gltf.scene.children) {
        anchors[node.name] ??= new Vector3();
        groupBounds.setFromObject(node).getCenter(anchors[node.name]);
      }
      director.frame(progress, bounds, anchors);
      tail.set((bounds.min.x + bounds.max.x) / 2, bounds.min.y, (bounds.min.z + bounds.max.z) / 2);
      flight.position.y = assembledHeight * 3.5 * frame.launch;
      tail.y += flight.position.y;
      rim.intensity = 4 + frame.glow * 2;
      scene.updateMatrixWorld(true);
      renderer.render(scene, camera);
      onFrame(director.project(progress, anchors, tail));
    }

    function resize() {
      if (disposed) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const compact = window.matchMedia("(max-width: 767px)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.5));
      director.resize(width, height, compact);
      renderer.setSize(width, height, false);
      render();
    }

    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "display:block;width:100%;height:100%;pointer-events:none";
    host.appendChild(canvas);
    resize();
    return {
      seek(nextProgress) {
        if (disposed) return;
        progress = Math.max(0, Math.min(1, nextProgress));
        render();
      },
      resize,
      dispose,
    };

  } catch (error) {
    dispose();
    throw error;
  }
}
