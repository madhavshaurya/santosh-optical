## 2025-05-10 - Cursor Event Listener & Memory Leak Optimization
**Learning:** Attaching `mousemove` event listeners to interactive elements to toggle CSS classes triggers excessive execution on every pixel move. Switching to `mouseenter`/`mouseleave` and properly removing event listeners in `onUnmounted` prevents main-thread thrashing and memory leaks across route navigation.
**Action:** When handling hover/cursor interactions in Vue components, prefer `mouseenter` over `mousemove` for static state toggles and always track event listener cleanups for `onUnmounted`.

## 2026-08-31 - Scroll Listener Throttling & Memory Leak Prevention
**Learning:** Attaching un-throttled scroll listeners that perform synchronous layout queries (`scrollHeight`, `innerHeight`, `scrollY`) causes severe layout thrashing during fast scrolling. Additionally, failing to return and execute cleanup functions in global JS helpers leads to orphaned event listeners when Vue components unmount.
**Action:** Throttle scroll progress calculations with `requestAnimationFrame`, pass `{ passive: true }`, cache DOM references, and always return a teardown/cleanup function to be called inside `onUnmounted`.
