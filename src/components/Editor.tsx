import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ThemeProvider } from 'styled-components';

import usePreference from '../hooks/usePreference';
import themes, { Themes } from '../style/themes';
import EditorControls from './EditorControls';
import EditorGlobalStyle from './EditorGlobalStyle';
import EditorTextArea from './EditorTextArea';

export interface EditorProps {
  forcedContent: string;
  actualContent: string;
  setActualContent: (value: string) => void;
  contentType?: string;
  pasteId?: string;
}

export type ResetFunction = () => void;

export default function Editor({
  forcedContent,
  actualContent,
  setActualContent,
  contentType,
  pasteId,
}: EditorProps) {
  const [language, setLanguage] = useState<string>('plain');
  const [readOnly, setReadOnly] = useState<boolean>(isMobile && !!pasteId);
  const resetFunction = useRef<ResetFunction>(null);

  const [theme, setTheme] = usePreference<keyof Themes>(
    'theme',
    'dark',
    pref => !!themes[pref]
  );
  const [fontSize, setFontSize, fontSizeCheck] = usePreference<number>(
    'fontsize',
    16,
    pref => pref >= 10 && pref <= 22
  );

  const [wordWrap, setWordWrap] = usePreference<boolean>(
    'wordwrap',
    true,
    () => true
  );

  useEffect(() => {
    if (contentType) {
      setLanguage(contentType);
    }
  }, [contentType]);

  function zoom(delta: number) {
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
          resetFunction={resetFunction}
          language={language}
          setLanguage={setLanguage}
          readOnly={readOnly}
          setReadOnly={setReadOnly}
          theme={theme}
          setTheme={setTheme}
          wordWrap={wordWrap}
          setWordWrap={setWordWrap}
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
          wordWrap={wordWrap}
          resetFunction={resetFunction}
        />
      </ThemeProvider>
    </>
  );
}
