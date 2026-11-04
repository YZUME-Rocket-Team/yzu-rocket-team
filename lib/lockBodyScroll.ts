let lockCount = 0;
let restore: (() => void) | null = null;

/** 多層捐款視窗共用同一把鎖，直到最後一層關閉才恢復頁面位置。 */
export function lockBodyScroll() {
  if (lockCount === 0) {
    const body = document.body;
    const { scrollX, scrollY } = window;
    const previousStyle = { position: body.style.position, top: body.style.top, width: body.style.width, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const padding = parseFloat(getComputedStyle(body).paddingRight);
    Object.assign(body.style, { position: "fixed", top: `-${scrollY}px`, width: "100%", overflow: "hidden" });
    if (scrollbarWidth > 0) body.style.paddingRight = `${padding + scrollbarWidth}px`;
    restore = () => {
      Object.assign(body.style, previousStyle);
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      document.documentElement.style.scrollBehavior = previousBehavior;
    };
  }
  lockCount += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    lockCount -= 1;
    if (lockCount === 0) {
      restore?.();
      restore = null;
    }
  };
}
