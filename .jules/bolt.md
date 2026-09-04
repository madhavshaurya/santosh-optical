## 2025-05-10 - Cursor Event Listener & Memory Leak Optimization
**Learning:** Attaching `mousemove` event listeners to interactive elements to toggle CSS classes triggers excessive execution on every pixel move. Switching to `mouseenter`/`mouseleave` and properly removing event listeners in `onUnmounted` prevents main-thread thrashing and memory leaks across route navigation.
**Action:** When handling hover/cursor interactions in Vue components, prefer `mouseenter` over `mousemove` for static state toggles and always track event listener cleanups for `onUnmounted`.

## 2025-05-11 - Window Scroll Event Listener Throttling & Unmount Cleanup
**Learning:** Shared UI helper functions in `common/` that attach unthrottled `scroll` listeners to `window` cause forced layout thrashing on every scroll tick and leak listeners across SPA page navigations if cleanups are not returned and invoked in Vue's `onUnmounted`.
**Action:** Always throttle window scroll handlers using `requestAnimationFrame`, pass `{ passive: true }`, cache DOM selections outside the scroll callback, and return a cleanup function from common helper functions to be invoked in `onUnmounted`.
