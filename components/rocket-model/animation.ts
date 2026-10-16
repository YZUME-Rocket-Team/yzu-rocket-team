import { AnimationMixer, type AnimationClip, type Object3D } from "three";

/** Rocket_Web.glb: eight translation clips, Blender frames 1–288 at 24 FPS. */
export function createRocketAnimation(root: Object3D, clips: AnimationClip[]) {
  if (!clips.length || !clips.some((clip) => clip.tracks.length)) {
    throw new Error("模型未包含可用的結構動畫。");
  }

  const start = Math.min(...clips.flatMap((clip) => clip.tracks.map((track) => track.times[0])));
  const end = Math.max(...clips.map((clip) => clip.duration));
  const mixer = new AnimationMixer(root);
  const actions = clips.map((clip) => {
    const action = mixer.clipAction(clip).play();
    // Evaluate a fixed pose, without a clock, looping or endpoint state changes.
    action.paused = true;
    return action;
  });

  function setTime(time: number) {
    for (const action of actions) {
      action.time = Math.min(Math.max(time, start), action.getClip().duration);
    }
    mixer.update(0);
    root.updateMatrixWorld(true);
  }

  return {
    start,
    end,
    setTime,
    seek(progress: number) {
      const p = Math.min(1, Math.max(0, progress));
      // Leave room to read the assembled pose and inspect the fully exploded pose.
      // Six seconds is the fully exploded pose in this GLB, before reassembly.
      const exploded = Math.min(6, end);
      const time = p <= 0.08 ? start
        : p < 0.46 ? start + ((p - 0.08) / 0.38) * (exploded - start)
        : p <= 0.62 ? exploded
        : p < 0.94 ? exploded + ((p - 0.62) / 0.32) * (end - exploded)
        : end;
      setTime(time);
    },
    dispose() {
      mixer.stopAllAction();
      mixer.uncacheRoot(root);
    },
  };
}
