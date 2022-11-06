import { get as lsGet, remove as lsRemove, set as lsSet } from 'local-storage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

// hook used to load "preference" settings from local storage, or fall back to a default value.
export default function usePreference<T>(
  id: string,
  defaultValue: T,
  valid: (value: T) => boolean
): [T, Dispatch<SetStateAction<T>>, (value: T) => boolean] {
  const [value, setValue] = useState<T>(() => {
    const pref = lsGet(id) as T;
    if (pref && valid(pref)) {
      return pref;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === defaultValue) {
      lsRemove(id);
    } else {
      lsSet(id, value);
    }
  }, [value, id, defaultValue]);

  return [value, setValue, valid];
}
