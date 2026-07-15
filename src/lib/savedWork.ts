export const SAVED_WORK_PREFIX = 'centering:';

export interface SavedWorkArchive {
  version: 1;
  exportedAt: string;
  values: Record<string, unknown>;
}

function storage(): Storage | null {
  return typeof window === 'undefined' ? null : window.localStorage;
}

function savedKeys(store: Storage): string[] {
  return Array.from({ length: store.length }, (_, index) => store.key(index))
    .filter((key): key is string => Boolean(key?.startsWith(SAVED_WORK_PREFIX)))
    .sort();
}

function parseStoredValue(raw: string): unknown {
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return raw;
  }
}

function isArchive(value: unknown): value is SavedWorkArchive {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const archive = value as Partial<SavedWorkArchive>;
  if (archive.version !== 1 || typeof archive.exportedAt !== 'string' || !archive.values || typeof archive.values !== 'object' || Array.isArray(archive.values)) {
    return false;
  }
  return Object.entries(archive.values).every(([key, entry]) => {
    if (!key.startsWith(SAVED_WORK_PREFIX)) return false;
    try {
      return JSON.stringify(entry) !== undefined;
    } catch {
      return false;
    }
  });
}

export function readSavedWork(): SavedWorkArchive {
  const store = storage();
  const values: Record<string, unknown> = {};
  if (store) {
    for (const key of savedKeys(store)) {
      const raw = store.getItem(key);
      if (raw !== null) values[key] = parseStoredValue(raw);
    }
  }
  return { version: 1, exportedAt: new Date().toISOString(), values };
}

export function importSavedWork(archive: unknown): number {
  if (!isArchive(archive)) throw new Error('Choose a valid Centering archive.');
  const store = storage();
  if (!store) return 0;

  const entries = Object.entries(archive.values).map(([key, value]) => [key, JSON.stringify(value)] as const);
  try {
    for (const [key, value] of entries) store.setItem(key, value);
  } catch {
    throw new Error('Centering could not save that archive in this browser.');
  }
  return entries.length;
}

export function clearSavedWork(): number {
  const store = storage();
  if (!store) return 0;
  const keys = savedKeys(store);
  try {
    for (const key of keys) store.removeItem(key);
  } catch {
    throw new Error('Centering could not clear saved work in this browser.');
  }
  return keys.length;
}
