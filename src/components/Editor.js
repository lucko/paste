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

  useEffect(() => {
    if (theme === 'dark') {
      ls.remove('theme');
    } else {
      ls.set('theme', theme);
    }
  }, [theme])

  useEffect(() => {
    if (contentType) {
      setLanguage(contentType);
    }
  }, [contentType]);

  return <>
    <ThemeProvider theme={themes[theme]}>
      <EditorControls code={content} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      <EditorTextArea code={content} setCode={setContent} language={language} />
    </ThemeProvider>
  </>
}
