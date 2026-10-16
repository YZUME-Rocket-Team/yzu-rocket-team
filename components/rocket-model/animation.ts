import { AnimationMixer, type AnimationClip, type Object3D } from "three";
import { storyFrame } from "./story";

/** Rocket_Web.glb: eight translation clips, Blender frames 1–288 at 24 FPS. */
export function createRocketAnimation(root: Object3D, clips: AnimationClip[]) {
  if (!clips.length || clips.some((clip) => !clip.tracks.length)) {
    throw new Error("模型未包含可用的結構動畫。");
  }

  const ranges = clips.map((clip) => {
    const start = Math.min(...clip.tracks.map((track) => track.times[0]));
    const end = Math.max(...clip.tracks.map((track) => track.times[track.times.length - 1]));
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      throw new Error("模型動畫時間軸無法判讀。");
    }
    return { name: clip.name, start, end };
  });
  const start = Math.min(...ranges.map((range) => range.start));
  const end = Math.max(...ranges.map((range) => range.end));
  const mixer = new AnimationMixer(root);
  const actions = clips.map((clip) => {
    const action = mixer.clipAction(clip).play();
    // Evaluate a fixed pose, without a clock, looping or endpoint state changes.
    action.paused = true;
    return action;
  });

  function setTime(time: number) {
    actions.forEach((action, index) => {
      const range = ranges[index];
      // Use scene seconds, including each clip's exported offset. Never per-clip %.
      action.time = Math.min(range.end, Math.max(range.start, time));
    });
    mixer.update(0);
    root.updateMatrixWorld(true);
  }

  return {
    start,
    end,
    ranges,
    setTime,
    seek(progress: number) {
      setTime(storyFrame(progress, start, end).time);
    },
    dispose() {
      mixer.stopAllAction();
      mixer.uncacheRoot(root);
    },
  };
}
