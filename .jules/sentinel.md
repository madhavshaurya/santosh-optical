## 2025-08-27 - Unsafe v-html Rendering of External API Errors

**Vulnerability:** Contact forms rendered response messages using `v-html` containing raw error strings returned from external APIs (such as Formspree).
**Learning:** API error strings (`json?.error`) can contain malicious HTML/script payloads if an API response is tampered with or controlled by an adversary, leading to Cross-Site Scripting (XSS).
**Prevention:** Avoid `v-html` for dynamic user or API message feedback. Use standard Vue template text interpolation `{{ message }}` and dynamically bind CSS alert classes instead.
