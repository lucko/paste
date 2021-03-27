import { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import ls from 'local-storage';

import EditorControls from './EditorControls';
import EditorTextArea from './EditorTextArea';
import themes from '../style/themes';

export default function Editor({ content, setContent, contentType }) {
  const [language, setLanguage] = useState('plain');
  const [theme, setTheme] = useState(() => {
    const preference = ls.get('theme');
    if (preference && themes[preference]) {
      return preference;
    } else {
      return 'dark';
    }
  });
  const [fontSize, setFontSize] = useState(() => {
    const preference = ls.get('fontsize');
    if (preference && preference >= 10 && preference <= 22) {
      return preference;
    } else {
      return 16;
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      ls.remove('theme');
    } else {
      ls.set('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (fontSize === 16) {
      ls.remove('fontsize');
    } else {
      ls.set('fontsize', fontSize);
    }
  }, [fontSize]);

  useEffect(() => {
    if (contentType) {
      setLanguage(contentType);
    }
  }, [contentType]);

  function zoom(delta) {
    const result = fontSize + delta;
    if (result && result >= 10 && result <= 22) {
      setFontSize(result);
    }
  }

  return <>
    <ThemeProvider theme={themes[theme]}>
      <EditorControls
        code={content} setCode={setContent}
        language={language} setLanguage={setLanguage}
        theme={theme} setTheme={setTheme}
        zoom={zoom}
      />
      <EditorTextArea code={content} setCode={setContent} language={language} fontSize={fontSize} />
    </ThemeProvider>
  </>
}
