# Browser Storage – Complete Revision Notes
## localStorage vs sessionStorage vs IndexedDB
Senior Frontend / React Interview Cheat Sheet

---

# 0. Mental Model (Interview First Answer)

Think in layers:

```
React State / Memory (fastest)
        ↓
sessionStorage (tab temporary)
        ↓
localStorage (small persistent)
        ↓
IndexedDB (large structured DB)
```

Rule of thumb:

- small + simple → Web Storage
- large + structured → IndexedDB

---

# 1. Web Storage API (localStorage + sessionStorage)

Both belong to the **Web Storage API**.

Common properties:

- key/value store
- string only
- synchronous (blocking)
- same-origin scoped
- ~5–10 MB quota
- simple API

## API

```js
setItem(key, value)
getItem(key)
removeItem(key)
clear()
key(index)
length
```

Always stringify objects:

```js
localStorage.setItem("user", JSON.stringify(user))
JSON.parse(localStorage.getItem("user"))
```

---

# 2. localStorage

## Characteristics

- persists forever
- survives refresh + restart
- shared across tabs
- synchronous (blocks main thread)
- string only

## Good Use Cases

- theme
- language
- preferences
- remember-me flag
- feature toggles

## Avoid

- tokens
- secrets
- big API responses
- images/files

## Example

```js
localStorage.setItem("theme", "dark")
const theme = localStorage.getItem("theme")
```

## Cross-tab sync (important)

```js
window.addEventListener("storage", (e) => {
  if (e.key === "theme") console.log(e.newValue)
})
```

Used for:
- logout everywhere
- theme sync
- multi-tab state

---

# 3. sessionStorage

## Characteristics

- per-tab scoped
- NOT shared across tabs
- cleared when tab closes
- survives refresh
- synchronous
- string only

## Good Use Cases

- multi-step forms
- checkout flow
- temporary drafts
- wizard state
- tab-isolated data

## Example

```js
sessionStorage.setItem("draft", JSON.stringify(form))
```

---

# 4. Key Differences (Most Asked)

| Feature | localStorage | sessionStorage |
|----------|---------------|-----------------|
| Lifetime | forever | tab life |
| Shared across tabs | yes | no |
| Refresh survives | yes | yes |
| Restart survives | yes | no |
| Scope | origin | origin + tab |

---

# 5. Performance Reality (Senior Insight)

Both are:

❌ synchronous (blocking)

Meaning:

```js
localStorage.setItem("bigData", hugeJSON)
```

This blocks UI rendering.

Never store:
- big arrays
- large JSON
- cache data
- blobs

Use IndexedDB instead.

---

# 6. Security Considerations

Do NOT store:

- JWT tokens
- auth credentials
- secrets

Reason:

If XSS happens:

```js
localStorage.getItem("token")
```

Token stolen instantly.

Prefer:

- HttpOnly cookies
- SameSite cookies
- memory storage

---

# 7. IndexedDB (Senior Level Topic)

## What is it?

A low-level **async NoSQL database inside the browser**.

Think:

"Mini MongoDB in the browser"

---

## Characteristics

- async (non-blocking)
- stores objects directly
- supports blobs/files
- large capacity (50MB → GBs)
- indexes
- transactions
- high performance

---

## Why IndexedDB exists?

Problems with localStorage:

- sync blocking
- string only
- small quota

IndexedDB solves:

- async
- structured objects
- large storage
- fast queries

---

## Native Example

```js
const request = indexedDB.open("AppDB", 1)

request.onupgradeneeded = (e) => {
  const db = e.target.result
  db.createObjectStore("users", { keyPath: "id" })
}
```

---

## When to Use IndexedDB

Use when:

- offline-first apps
- API caching
- chat history
- large JSON
- files/images/videos
- PWA storage
- complex queries

---

# 8. Comparison Table (Quick Recall)

| Feature | localStorage | sessionStorage | IndexedDB |
|-----------|---------------|-----------------|-------------|
| Capacity | small | small | huge |
| Data type | string | string | objects |
| Sync/Async | sync ❌ | sync ❌ | async ✅ |
| Tab share | yes | no | yes |
| Persistence | forever | tab life | forever |
| Transactions | no | no | yes |
| Performance | blocking | blocking | fast |

---

# 9. Practical Scenarios

## Theme preference
→ localStorage

## Checkout wizard
→ sessionStorage

## Offline product cache
→ IndexedDB

## Chat messages
→ IndexedDB

## Auth token
→ HttpOnly cookies

---

# 10. Senior Architecture Answer (Interview Gold)

If asked:

"How would you design storage for a large React app?"

Answer:

- Auth → HttpOnly cookies
- Runtime state → memory (Redux/Zustand)
- Preferences → localStorage
- Temp flows → sessionStorage
- Large cache/offline → IndexedDB

Shows system thinking.

---

# 11. Quick Memory Hacks

localStorage = persistent + shared  
sessionStorage = temporary + per tab  
IndexedDB = large + structured + async  

---

# End
