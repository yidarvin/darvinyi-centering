import { useCallback, useEffect, useRef, useState } from 'react';

type Setter<T> = (value: T | ((prev: T) => T)) => void;

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/**
 * Typed, safe localStorage state. Reads lazily on mount and guards every access,
 * so a private-mode or quota error never breaks a page, and there are no SSR
 * assumptions on either the read or the write path.
 *
 * The initial value is captured once, so passing a fresh object or array literal
 * (for example `useLocalStorage('k', [])`) does not retrigger the re-read on
 * every render. The stored value is re-read only when the key itself changes.
 *
 * Keys are namespaced under `centering:` by callers (see ExerciseCard, Reflection).
 */
export function useLocalStorage<T>(key: string, initial: T): [T, Setter<T>] {
  const initialRef = useRef(initial);
  const [value, setValue] = useState<T>(() => readStorage(key, initialRef.current));

  // re-read only when the key actually changes (for example navigating chapters)
  const keyRef = useRef(key);
  useEffect(() => {
    if (keyRef.current === key) return;
    keyRef.current = key;
    setValue(readStorage(key, initialRef.current));
  }, [key]);

  const set = useCallback<Setter<T>>(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          } catch {
            // storage unavailable or full: keep the in-memory value, drop the write
          }
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, set];
}
