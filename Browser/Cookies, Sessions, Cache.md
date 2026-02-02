# Browser State & Performance — Revision Sheet

## Cookies, Sessions, Cache + HttpOnly

---

# 🍪 Cookies

## Definition
Small client-side key–value storage managed by the browser and automatically attached to every HTTP request for the same domain.

Used for:
- authentication
- tracking
- preferences
- request metadata

---

## Lifecycle Flow

Server → Set-Cookie  
Browser → stores cookie  
Browser → sends Cookie header automatically  
Server → reads cookie

---

## Example

### Response
```http
Set-Cookie: token=abc123; Max-Age=3600; HttpOnly; Secure
```

### Next Request
```http
Cookie: token=abc123
```

---

## Properties

| Attribute | Purpose |
|-----------|-----------|
| Max-Age / Expires | lifetime |
| Domain / Path | scope |
| Secure | HTTPS only |
| HttpOnly | JS cannot read |
| SameSite | CSRF protection |

---

## Storage
- Browser disk/memory
- ~4KB per cookie
- Sent with every request (network overhead)

---

## Use
✅ Auth tokens  
✅ Preferences  
✅ Small flags  

Avoid:
❌ Large data  
❌ Sensitive info without HttpOnly  

---

# 🔐 HttpOnly Cookies

## Definition
Prevents JavaScript access to the cookie via `document.cookie`.

## Why
Protects against XSS token theft.

Without:
```js
document.cookie // token visible
```

With:
```http
Set-Cookie: token=abc; HttpOnly
```

```js
document.cookie // token hidden
```

## Best Practice
```http
Set-Cookie: token=abc; HttpOnly; Secure; SameSite=Lax
```

---

# 🧠 Sessions

## Definition
Server-side storage of user state, referenced by a session ID stored in a cookie.

## Flow
Login → create session → store data → send sessionId → server loads state each request

## Example
Cookie:
```http
Set-Cookie: sessionId=xyz789
```

Server:
```js
sessions = {
  xyz789: { userId: 42, role: "admin" }
}
```

## Characteristics

| Property | Value |
|------------|-----------|
| Stored | Server |
| Size | Large |
| Secure | High |
| Stateless | No |

## Use
✅ Login state  
✅ Cart  
✅ Multi-step workflows  

---

# ⚡ Cache

## Definition
Temporary storage to avoid recomputation or repeated network calls. Focus is performance.

## Types
- Browser cache
- HTTP cache
- CDN cache
- Server cache (Redis)

## HTTP Headers
```http
Cache-Control: max-age=3600
ETag: "abc123"
Last-Modified: Tue, 02 Feb 2026
```

## Strategies

| Strategy | Purpose |
|------------|------------|
| Cache First | fastest |
| Network First | fresh |
| Stale-While-Revalidate | balanced |
| No-store | disable |

## Use
✅ Static assets  
✅ API responses  
✅ Expensive queries  

---

# 🔥 Comparison

## Responsibility

| System | Purpose |
|-----------|----------------|
| Cookie | client persistence |
| Session | server state |
| Cache | performance |

## Storage Location

| | Client | Server |
|-----------|-----------|-----------|
| Cookie | ✅ | ❌ |
| Session | ❌ | ✅ |
| Cache | both | both |

## Automatically sent with requests

| | Yes/No |
|-----------|-----------|
| Cookie | Yes |
| Session | only ID |
| Cache | No |

## Security

| | Level |
|-----------|-----------|
| Cookie | medium |
| HttpOnly Cookie | high |
| Session | high |
| Cache | depends |

---

# 🧠 Quick Mental Model

Cookie   → small client data  
HttpOnly → secure cookie for auth  
Session  → server memory for user state  
Cache    → speed optimization  

---

# 🚀 Interview Rapid Recall

Cookies:
- 4KB
- auto-sent
- good for tokens
- use HttpOnly

HttpOnly:
- protects against XSS
- JS cannot access

Sessions:
- server state
- scalable via Redis

Cache:
- performance only
- needs invalidation
