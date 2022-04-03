import { useState, useEffect } from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { isMobile } from 'react-device-detect';
import ls from 'local-storage';

import EditorControls from './EditorControls';
import EditorTextArea from './EditorTextArea';
import themes from '../style/themes';

export default function Editor({
  forcedContent,
  setForcedContent,
  actualContent,
  setActualContent,
  contentType,
  pasteId,
}) {
  const [language, setLanguage] = useState('plain');
  const [readOnly, setReadOnly] = useState(isMobile && pasteId);

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
        <EditorGlobalStyle />
        <EditorControls
          actualContent={actualContent}
          setForcedContent={setForcedContent}
          language={language}
          setLanguage={setLanguage}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
          theme={theme}
          setTheme={setTheme}
          zoom={zoom}
        />
        <EditorTextArea
          forcedContent={forcedContent}
          actualContent={actualContent}
          setActualContent={setActualContent}
          theme={themes[theme]}
          language={language}
          fontSize={fontSize}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
        />
      </ThemeProvider>
    </>
  );
}

const EditorGlobalStyle = createGlobalStyle`
  html, body {
    color-scheme: ${props => props.theme.lightOrDark};
    scrollbar-color: ${props => props.theme.lightOrDark};
    background-color: ${props => props.theme.editor.background};
  }
`;

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
