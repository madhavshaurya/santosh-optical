## 2025-05-10 - Cursor Event Listener & Memory Leak Optimization
**Learning:** Attaching `mousemove` event listeners to interactive elements to toggle CSS classes triggers excessive execution on every pixel move. Switching to `mouseenter`/`mouseleave` and properly removing event listeners in `onUnmounted` prevents main-thread thrashing and memory leaks across route navigation.
**Action:** When handling hover/cursor interactions in Vue components, prefer `mouseenter` over `mousemove` for static state toggles and always track event listener cleanups for `onUnmounted`.

## 2025-05-11 - Scroll Listener Consolidation & Throttle Optimization
**Learning:** Attaching unthrottled multiple `scroll` event listeners that query DOM elements (`document.querySelector`) on every scroll event leads to main-thread thrashing and layout recalculations. Caching element references, using `requestAnimationFrame` for scroll updates with passive event listeners, and returning a cleanup function for `onUnmounted` significantly improves scroll performance and prevents listener leaks across route changes.
**Action:** For scroll indicator or scroll progress utilities, cache DOM query references outside the scroll handler, throttle rendering updates via `requestAnimationFrame` with `{ passive: true }`, and always return and execute a cleanup function in component `onUnmounted`.
