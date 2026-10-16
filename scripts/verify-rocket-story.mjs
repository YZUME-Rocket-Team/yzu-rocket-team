// Geometry and timeline regressions against the real GLB. No browser or new test package.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const ts = require("typescript");
const modules = new Map();
function loadSource(filename) {
  if (modules.has(filename)) return modules.get(filename).exports;
  const module = { exports: {} };
  modules.set(filename, module);
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const localRequire = (id) => id === "three" ? THREE : id.startsWith("@/")
    ? loadSource(path.join(root, `${id.slice(2)}.ts`))
    : id.startsWith(".") ? loadSource(path.resolve(path.dirname(filename), `${id}.ts`)) : require(id);
  new Function("require", "module", "exports", code)(localRequire, module, module.exports);
  return module.exports;
}
const { createRocketAnimation } = loadSource(path.join(root, "components/rocket-model/animation.ts"));
const { createCameraDirector } = loadSource(path.join(root, "components/rocket-model/director.ts"));
const { storyFrame } = loadSource(path.join(root, "components/rocket-model/story.ts"));
const bytes = fs.readFileSync(path.join(root, "public/models/Rocket_Web.glb"));
assert.equal(createHash("sha256").update(bytes).digest("hex"), "d207e87256762d75d7fa05a093d901d6acd15cd22be6c91f05438951033aaaac", "Original GLB must remain unchanged");
const gltf = await new GLTFLoader().parseAsync(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength), "");
assert.equal(gltf.animations.length, 8);
const animation = createRocketAnimation(gltf.scene, gltf.animations);
assert.ok(Math.abs(animation.start - 1 / 24) < 1e-7);
assert.equal(animation.end, 12);
const pose = () => gltf.scene.children.flatMap((node) => node.position.toArray());
const same = (a, b) => a.forEach((value, i) => assert.ok(Math.abs(value - b[i]) < 1e-7));
animation.seek(0); const assembled = pose();
animation.seek(0.6); const exploded = pose();
assert.equal(gltf.scene.children.filter((node, i) => node.position.toArray().some((v, axis) => Math.abs(v - assembled[i * 3 + axis]) > 0.1)).length, 8);
animation.seek(0.65); same(pose(), exploded);
animation.seek(1); same(pose(), assembled);
animation.seek(0.6); same(pose(), exploded);
animation.seek(0); same(pose(), assembled);
for (const p of [0.88, 0.9, 0.95, 1]) assert.equal(storyFrame(p, animation.start, animation.end).time, 12);
assert.equal(storyFrame(0.9).launch, 0);
assert.ok(storyFrame(0.95).launch > 0);
console.log("PASS: original GLB, eight synchronized clips, hold, endpoints, reverse, launch after reassembly");

// Differently offset clips must receive scene seconds, not individually normalized progress.
const syntheticRoot = new THREE.Group();
for (const name of ["early", "late"]) { const node = new THREE.Object3D(); node.name = name; syntheticRoot.add(node); }
const synthetic = createRocketAnimation(syntheticRoot, [
  new THREE.AnimationClip("early", -1, [new THREE.VectorKeyframeTrack("early.position", [2, 4], [0, 0, 0, 4, 0, 0])]),
  new THREE.AnimationClip("late", -1, [new THREE.VectorKeyframeTrack("late.position", [6, 10], [0, 0, 0, 8, 0, 0])]),
]);
synthetic.setTime(8); assert.equal(syntheticRoot.children[0].position.x, 4); assert.equal(syntheticRoot.children[1].position.x, 4);
synthetic.setTime(3); assert.equal(syntheticRoot.children[0].position.x, 2); assert.equal(syntheticRoot.children[1].position.x, 0);
synthetic.dispose();
console.log("PASS: clips with different start/end times use absolute scene timestamps");

const oriented = new THREE.Group(); oriented.rotation.x = Math.PI / 2; oriented.add(gltf.scene);
const centered = new THREE.Group(); centered.add(oriented);
animation.seek(0); centered.position.copy(new THREE.Box3().setFromObject(oriented).getCenter(new THREE.Vector3())).negate();
const bounds = new THREE.Box3(), groupBounds = new THREE.Box3(), point = new THREE.Vector3();
const anchors = {};
for (const [width, height, compact] of [[850, 745, false], [374, 416, true], [307, 215, true], [500, 250, false], [1200, 850, false], [500, 890, false]]) {
  const camera = new THREE.PerspectiveCamera();
  const director = createCameraDirector(camera); director.resize(width, height, compact);
  const evaluate = (p) => {
    animation.seek(p); centered.updateMatrixWorld(true); bounds.setFromObject(centered);
    for (const node of gltf.scene.children) anchors[node.name] = groupBounds.setFromObject(node).getCenter(new THREE.Vector3());
    director.frame(p, bounds, anchors);
    return [...camera.matrixWorld.elements, ...camera.projectionMatrix.elements];
  };
  let previous;
  for (let step = 0; step <= 450; step++) {
    const p = step / 500; evaluate(p);
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      point.set(x, y, z).project(camera);
      assert.ok(Math.abs(point.x) < 0.99 && Math.abs(point.y) < 0.99 && Math.abs(point.z) < 1, `Frustum clipping at ${width}x${height}, p=${p}`);
    }
    if (previous) assert.ok(previous.distanceTo(camera.position) < 0.3, "Camera must remain continuous");
    previous = camera.position.clone();
  }
  const forward = evaluate(0.24); evaluate(1); evaluate(0.72); const reverse = evaluate(0.24);
  forward.forEach((value, i) => assert.ok(Math.abs(value - reverse[i]) < 1e-10, "Camera reverse must be deterministic"));
}
animation.dispose();
console.log("PASS: 2,706 camera poses fit all model bounds; continuous and deterministic camera reverse");
