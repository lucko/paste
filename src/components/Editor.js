import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import ls from 'local-storage';

import EditorControls from './EditorControls';
import EditorTextArea from './EditorTextArea';
import themes from '../style/themes';

export default function Editor({ content, setContent, contentType }) {
  const [language, setLanguage] = useState('plain');
  const [theme, setTheme] = usePreference(
    'theme',
    'dark',
    pref => !!themes[pref]
  );
  const [fontSize, setFontSize, fontSizeCheck] = usePreference(
    'fontsize',
    16,
    pref => pref >= 10 && pref <= 22
  );

  useEffect(() => {
    if (contentType) {
      setLanguage(contentType);
    }
  }, [contentType]);

  function zoom(delta) {
    const newFontSize = fontSize + delta;
    if (fontSizeCheck(newFontSize)) {
      setFontSize(newFontSize);
    }
  }

  return (
    <>
      <ThemeProvider theme={themes[theme]}>
        <EditorControls
          code={content}
          setCode={setContent}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          zoom={zoom}
        />
        <EditorTextArea
          code={content}
          setCode={setContent}
          language={language}
          fontSize={fontSize}
        />
      </ThemeProvider>
    </>
  );
}

// hook used to load "preference" settings from local storage, or fall back to a default value.
function usePreference(id, defaultValue, valid) {
  const [value, setValue] = useState(() => {
    const pref = ls.get(id);
    if (pref && valid(pref)) {
      return pref;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === defaultValue) {
      ls.remove(id);
    } else {
      ls.set(id, value);
    }
  }, [value, id, defaultValue]);

  return [value, setValue, valid];
}
