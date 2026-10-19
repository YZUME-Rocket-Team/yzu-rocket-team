import {
  ACESFilmicToneMapping, Box3, Color, DirectionalLight, Group,
  HemisphereLight, Mesh, OrthographicCamera, PMREMGenerator, Scene, SRGBColorSpace,
  Texture, Vector3, WebGLRenderer, type Material, type Object3D, type WebGLRenderTarget,
} from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

import { createRocketAnimation } from "./animation";

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
): Promise<RocketViewer> {
  const canvas = document.createElement("canvas");
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  } catch {
    const error = new Error("此瀏覽器或裝置目前無法使用 WebGL 2。");
    error.name = "WebGLUnavailableError";
    throw error;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  const scene = new Scene();
  scene.background = new Color("#050b14");
  scene.add(new HemisphereLight(0xdbeafe, 0x263044, 2.5));
  const key = new DirectionalLight(0xffffff, 3.5);
  key.position.set(4, 3, 5);
  const rim = new DirectionalLight(0xfdba74, 2);
  rim.position.set(-4, 1, -2);
  scene.add(key, rim);
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0.01, 100);
  const centered = new Group();
  scene.add(centered);
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
    centered.position.copy(assembled.getCenter(new Vector3())).negate();

    // Measure the entire exported timeline, not only the assembled rocket.
    // Linear translation extrema occur at track keys; also include every exact key.
    const bounds = new Box3();
    const sampleTimes = new Set<number>([animation.start, animation.end]);
    for (const clip of gltf.animations) for (const track of clip.tracks) {
      for (const time of track.times) sampleTimes.add(time);
    }
    for (const time of sampleTimes) {
      animation.setTime(time);
      bounds.union(new Box3().setFromObject(centered));
    }
    animation.seek(0);
    const distance = Math.max(1, bounds.getSize(new Vector3()).length() * 2);
    camera.position.set(distance * 0.55, 0, distance);
    camera.far = distance * 4;
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld(true);
    let halfWidth = 0;
    let halfHeight = 0;
    for (const x of [bounds.min.x, bounds.max.x]) {
      for (const y of [bounds.min.y, bounds.max.y]) {
        for (const z of [bounds.min.z, bounds.max.z]) {
          const corner = new Vector3(x, y, z).applyMatrix4(camera.matrixWorldInverse);
          halfWidth = Math.max(halfWidth, Math.abs(corner.x));
          halfHeight = Math.max(halfHeight, Math.abs(corner.y));
        }
      }
    }

    function resize() {
      if (disposed) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      const aspect = width / height;
      const vertical = Math.max(halfHeight, halfWidth / aspect) * 1.16;
      camera.left = -vertical * aspect;
      camera.right = vertical * aspect;
      camera.top = vertical;
      camera.bottom = -vertical;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    }

    canvas.setAttribute("aria-hidden", "true");
    canvas.style.cssText = "display:block;width:100%;height:100%;pointer-events:none";
    host.appendChild(canvas);
    resize();
    return {
      seek(progress) {
        if (disposed) return;
        animation!.seek(progress);
        renderer.render(scene, camera);
      },
      resize,
      dispose,
    };
  } catch (error) {
    dispose();
    throw error;
  }
}
