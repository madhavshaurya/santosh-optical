## 2025-05-10 - Cursor Event Listener & Memory Leak Optimization
**Learning:** Attaching `mousemove` event listeners to interactive elements to toggle CSS classes triggers excessive execution on every pixel move. Switching to `mouseenter`/`mouseleave` and properly removing event listeners in `onUnmounted` prevents main-thread thrashing and memory leaks across route navigation.
**Action:** When handling hover/cursor interactions in Vue components, prefer `mouseenter` over `mousemove` for static state toggles and always track event listener cleanups for `onUnmounted`.

## 2025-05-11 - Throttled Passive Scroll Listener & Cleanup Pattern
**Learning:** Legacy utility functions attached to window `scroll` events can duplicate scroll event listeners, query the DOM on every frame, and lack teardown logic. Wrapping scroll updates in `requestAnimationFrame` with `{ passive: true }`, caching DOM queries, and returning a cleanup function called in Vue's `onUnmounted` eliminates main-thread scroll jank and listener memory leaks on page navigation.
**Action:** Always return a cleanup function from DOM animation/scroll helpers in `common/` and invoke it in `onUnmounted`.
