# Palette's Journal - UX & Accessibility Learnings

## 2026-09-06 - Modal Dialog and Floating Button Accessibility
**Learning:** Isolated floating widgets and modals created using non-semantic `<div>` elements with click handlers are completely inaccessible to screen readers and keyboard users (no tab focus, no role, no ESC handling).
**Action:** Always wrap floating action triggers and copy action triggers in semantic `<button type="button">` tags, specify `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`, add `aria-live="polite"` for async state changes, and implement `@keydown.esc` handlers.
