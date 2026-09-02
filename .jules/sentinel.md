## 2025-05-21 - Cryptographically Secure Coupon Code Generation & DB Error Sanitization
**Vulnerability:** Coupon generation components used `Math.random()`, an insecure pseudo-random number generator susceptible to sequence prediction. Additionally, administrative verification pages exposed raw database error details (`error.message`) to end users.
**Learning:** PRNGs like `Math.random()` are predictable and unsafe for coupon codes or security tokens. Furthermore, exposing raw database error strings leaks schema and constraint information.
**Prevention:** Use `crypto.getRandomValues()` for unguessable token generation and sanitize user-facing error messages while logging technical details internally.
