import { beforeEach, describe, expect, it } from 'vitest';
import { SAVED_WORK_PREFIX, clearSavedWork, importSavedWork, readSavedWork } from '@/lib/savedWork';

describe('saved work archive', () => {
  beforeEach(() => window.localStorage.clear());

  it('exports only Centering values and restores validated entries', () => {
    window.localStorage.setItem('centering:reflect:calm-abiding:reflection', JSON.stringify('A reader note'));
    window.localStorage.setItem('unrelated:setting', JSON.stringify('leave alone'));

    const archive = readSavedWork();
    expect(archive.values).toEqual({ 'centering:reflect:calm-abiding:reflection': 'A reader note' });

    clearSavedWork();
    expect(window.localStorage.getItem('centering:reflect:calm-abiding:reflection')).toBeNull();
    expect(window.localStorage.getItem('unrelated:setting')).toBe(JSON.stringify('leave alone'));

    expect(importSavedWork(archive)).toBe(1);
    expect(window.localStorage.getItem('centering:reflect:calm-abiding:reflection')).toBe(JSON.stringify('A reader note'));
    expect(SAVED_WORK_PREFIX).toBe('centering:');
  });

  it('rejects malformed archives and does not write their values', () => {
    expect(() => importSavedWork({ version: 1, values: { 'unrelated:setting': 'nope' } })).toThrow('valid Centering archive');
    expect(window.localStorage.length).toBe(0);
  });
});
