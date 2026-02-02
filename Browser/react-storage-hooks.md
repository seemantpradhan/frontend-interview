# React Hooks for Browser Storage
## useLocalStorage • useSessionStorage • useIndexedDB

---

# 1. useLocalStorage

```ts
import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setValue(JSON.parse(e.newValue))
      }
    }

    window.addEventListener("storage", handler)
    return () => window.removeEventListener("storage", handler)
  }, [key])

  return [value, setValue] as const
}
```

Usage:

```tsx
const [theme, setTheme] = useLocalStorage("theme", "light")
```

---

# 2. useSessionStorage

```ts
import { useEffect, useState } from "react"

export function useSessionStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = sessionStorage.getItem(key)
    return stored ? JSON.parse(stored) : initial
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

Usage:

```tsx
const [draft, setDraft] = useSessionStorage("draft", {})
```

---

# 3. useIndexedDB (async)

Install:

```
npm install idb
```

```ts
import { openDB } from "idb"
import { useCallback } from "react"

const dbPromise = openDB("AppDB", 1, {
  upgrade(db) {
    db.createObjectStore("store")
  },
})

export function useIndexedDB(key: string) {
  const get = useCallback(async () => {
    const db = await dbPromise
    return db.get("store", key)
  }, [key])

  const set = useCallback(async (value: any) => {
    const db = await dbPromise
    await db.put("store", value, key)
  }, [key])

  const remove = useCallback(async () => {
    const db = await dbPromise
    await db.delete("store", key)
  }, [key])

  return { get, set, remove }
}
```

Usage:

```tsx
const { get, set } = useIndexedDB("products")
```

---

# Quick Strategy

- Preferences → useLocalStorage
- Temp tab state → useSessionStorage
- Large/async cache → useIndexedDB
