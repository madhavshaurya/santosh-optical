## 2026-08-29 - Throttling Scroll Listeners & Cleaning Up SPA Route Listeners
**Learning:** Attaching multiple unthrottled `scroll` event listeners in global/component scripts without returning cleanup functions causes main-thread frame drops during scrolling and memory/listener leaks upon Nuxt/Vue route transitions.
**Action:** Throttle scroll updates with `requestAnimationFrame`, pass `{ passive: true }` to window scroll listeners, and return cleanup functions from utility scripts to detach listeners in `onUnmounted`.
