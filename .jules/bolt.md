## 2025-05-10 - Cursor Event Listener & Memory Leak Optimization
**Learning:** Attaching `mousemove` event listeners to interactive elements to toggle CSS classes triggers excessive execution on every pixel move. Switching to `mouseenter`/`mouseleave` and properly removing event listeners in `onUnmounted` prevents main-thread thrashing and memory leaks across route navigation.
**Action:** When handling hover/cursor interactions in Vue components, prefer `mouseenter` over `mousemove` for static state toggles and always track event listener cleanups for `onUnmounted`.

## 2025-05-11 - Scroll Progress Event Listener & Layout Thrashing Optimization
**Learning:** Legacy utility scripts attached multiple unthrottled `scroll` event listeners to `window`, re-queried the DOM on every frame, and lacked cleanup handlers. In Nuxt single-page applications, uncleaned global window event listeners accumulate across route changes, causing layout thrashing and memory leaks.
**Action:** Always batch window scroll event handlers with `requestAnimationFrame`, mark them as `{ passive: true }`, cache target DOM element references outside the event loop, and return a cleanup function to be called in `onUnmounted`.
