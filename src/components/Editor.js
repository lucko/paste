import { useState, useEffect } from 'react';

import EditorControls from './EditorControls';
import EditorTextArea from './EditorTextArea';

export default function Editor({ content, setContent, contentType }) {
  const [language, setLanguage] = useState('plain');
  useEffect(() => {
    if (contentType) {
      setLanguage(contentType);
    }
  }, [contentType]);

  return <>
    <EditorControls code={content} language={language} setLanguage={setLanguage} />
    <EditorTextArea code={content} setCode={setContent} language={language} />
  </>
}
