import { Box3, MathUtils, PerspectiveCamera, Vector3 } from "three";
import { callouts, chapterOpacity, smoothstep, storyFrame } from "./story";

type Anchors = Record<string, Vector3>;
export type StoryProjection = {
  width: number; height: number; compact: boolean;
  stage: number; progress: number; glow: number;
  flame: { x: number; y: number; width: number };
  labels: { key: string; x: number; y: number; labelX: number; labelY: number; side: string; opacity: number }[];
};

// Composition is a pure function of scroll; reversing produces the same shot.
const shots = [
  { p: 0, yaw: -0.48, roll: -0.13, focus: "", weight: 0, margin: 1.09 },
  { p: 0.14, yaw: -0.38, roll: -0.1, focus: "", weight: 0, margin: 1.04 },
  { p: 0.26, yaw: -0.68, roll: -0.035, focus: "GROUP_PayloadTube", weight: 0.16, margin: 1.08 },
  { p: 0.34, yaw: -0.55, roll: 0, focus: "GROUP_PayloadInternal", weight: 0.14, margin: 1.08 },
  { p: 0.44, yaw: 0.2, roll: 0.025, focus: "GROUP_ConnectingRing", weight: 0.1, margin: 1.08 },
  { p: 0.54, yaw: 0.55, roll: 0.025, focus: "GROUP_FinAssembly", weight: 0.08, margin: 1.1 },
  { p: 0.61, yaw: 0.44, roll: 0, focus: "", weight: 0, margin: 1.12 },
  { p: 0.69, yaw: 0.44, roll: 0, focus: "", weight: 0, margin: 1.12 },
  { p: 0.88, yaw: -0.48, roll: -0.13, focus: "", weight: 0, margin: 1.09 },
  { p: 1, yaw: -0.48, roll: -0.13, focus: "", weight: 0, margin: 1.09 },
];

export function createCameraDirector(camera: PerspectiveCamera) {
  const center = new Vector3(), target = new Vector3(), direction = new Vector3();
  const corner = new Vector3(), right = new Vector3(), up = new Vector3();
  let width = 1, height = 1, compact = false;
  const focus = (shot: typeof shots[number], anchors: Anchors) => center.clone().lerp(anchors[shot.focus] ?? center, shot.weight);

  return {
    resize(nextWidth: number, nextHeight: number, isCompact: boolean) {
      width = Math.max(1, nextWidth); height = Math.max(1, nextHeight); compact = isCompact;
      camera.aspect = width / height;
      camera.fov = compact ? 32 : 30;
    },
    frame(progress: number, bounds: Box3, anchors: Anchors) {
      bounds.getCenter(center);
      const index = Math.max(0, shots.findIndex((shot) => shot.p >= progress) - 1);
      const a = shots[index], b = shots[Math.min(shots.length - 1, index + 1)];
      const t = smoothstep(a.p, b.p, progress);
      target.copy(focus(a, anchors)).lerp(focus(b, anchors), t);
      const yaw = MathUtils.lerp(a.yaw, b.yaw, t) * (compact ? 0.55 : 1);
      const roll = compact ? 0 : MathUtils.lerp(a.roll, b.roll, t);
      direction.set(Math.sin(yaw), compact ? 0.015 : 0.045, Math.cos(yaw)).normalize();
      camera.up.set(Math.sin(roll), Math.cos(roll), 0);
      camera.position.copy(target).add(direction);
      camera.lookAt(target);
      camera.updateMatrixWorld(true);
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      up.setFromMatrixColumn(camera.matrixWorld, 1);
      const tan = Math.tan(MathUtils.degToRad(camera.fov / 2));
      let distance = 0;
      // Fit all moving corners, with separate side lanes for engineering labels.
      const horizontal = compact ? 0.58 : 0.68;
      for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
        corner.set(x, y, z).sub(target);
        const depth = corner.dot(direction);
        distance = Math.max(distance, depth + Math.abs(corner.dot(up)) / tan,
          depth + Math.abs(corner.dot(right)) / (tan * camera.aspect * horizontal));
      }
      distance *= MathUtils.lerp(a.margin, b.margin, t);
      camera.position.copy(target).addScaledVector(direction, distance);
      camera.near = Math.max(0.01, distance / 1000);
      camera.far = distance + bounds.getSize(corner).length() * 8;
      camera.lookAt(target);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld(true);
    },
    project(progress: number, anchors: Anchors, tail: Vector3): StoryProjection {
      const frame = storyFrame(progress);
      const point = (position: Vector3) => {
        const projected = position.clone().project(camera);
        return { x: (projected.x + 1) * width / 2, y: (1 - projected.y) * height / 2 };
      };
      const labels = callouts.map((callout) => {
        const projected = point(anchors[callout.node] ?? center);
        return {
          key: callout.key, ...projected, side: callout.side,
          opacity: compact && !callout.mobile ? 0 : Math.max(...callout.stages.map((stage) => chapterOpacity(progress, stage))),
          labelX: width * (callout.side === "left" ? 0.025 : 0.975),
          labelY: MathUtils.clamp(projected.y, 28, height - 28),
        };
      });
      for (const side of ["left", "right"]) {
        const lane = labels.filter((label) => label.side === side && label.opacity > 0.01).sort((a, b) => a.labelY - b.labelY);
        const gap = compact ? 30 : 38;
        lane.forEach((label, index) => { if (index) label.labelY = Math.max(label.labelY, lane[index - 1].labelY + gap); });
        for (let index = lane.length - 1; index >= 0; index--) {
          lane[index].labelY = Math.min(lane[index].labelY, index === lane.length - 1 ? height - 24 : lane[index + 1].labelY - gap);
        }
      }
      return { width, height, compact, stage: frame.stage, progress, glow: frame.glow, labels,
        flame: { ...point(tail), width: compact ? 18 : 26 } };
    },
  };
}
