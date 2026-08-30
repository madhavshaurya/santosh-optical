## 2025-05-10 - Cursor Event Listener & Memory Leak Optimization
**Learning:** Attaching `mousemove` event listeners to interactive elements to toggle CSS classes triggers excessive execution on every pixel move. Switching to `mouseenter`/`mouseleave` and properly removing event listeners in `onUnmounted` prevents main-thread thrashing and memory leaks across route navigation.
**Action:** When handling hover/cursor interactions in Vue components, prefer `mouseenter` over `mousemove` for static state toggles and always track event listener cleanups for `onUnmounted`.

## 2025-05-18 - Throttled Scroll Progress & Listener Leak Prevention
**Learning:** Attaching multiple anonymous `scroll` event listeners on window scroll without `requestAnimationFrame` throttling causes main-thread layout thrashing and repetitive DOM element queries on every frame. Additionally, failing to remove window scroll listeners on component unmount causes event listeners to accumulate on client-side route navigation.
**Action:** Always throttle scroll event calculations using `requestAnimationFrame` with `{ passive: true }`, cache DOM references outside the handler loop, and return a cleanup function to be invoked in `onUnmounted`.
