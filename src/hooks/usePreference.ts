import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// hook used to load "preference" settings from local storage, or fall back to a default value.
export default function usePreference<T>(
  id: string,
  defaultValue: T,
  valid: (value: T) => boolean
): [T, Dispatch<SetStateAction<T>>, (value: T) => boolean] {
  const [value, setValue] = useState<T>(() => {
    const prefRaw = localStorage.getItem(id);
    const pref = prefRaw !== null ? (JSON.parse(prefRaw) as T) : undefined;
    if (pref !== null && pref !== undefined && valid(pref)) {
      return pref;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === defaultValue) {
      localStorage.removeItem(id);
    } else {
      localStorage.setItem(id, JSON.stringify(value));
    }
  }, [value, id, defaultValue]);

  return [value, setValue, valid];
}
