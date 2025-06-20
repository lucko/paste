import { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import usePreference from '../hooks/usePreference';
import { Themes } from '../style/themes.ts';
import EditorControls from './EditorControls';
import EditorGlobalStyle from './EditorGlobalStyle';
import EditorTextArea from './EditorTextArea';

export interface EditorProps {
  forcedContent: string;
  actualContent: string;
  setActualContent: (value: string) => void;
  contentType?: string;
  pasteId?: string;
  theme: keyof Themes;
  setTheme: (value: keyof Themes) => void;
  setShowAbout: (value: boolean) => void;
}

export type ResetFunction = () => void;

export default function Editor({
  forcedContent,
  actualContent,
  setActualContent,
  contentType,
  pasteId,
  theme,
  setTheme,
  setShowAbout,
}: EditorProps) {
  const [language, setLanguage] = useState<string>('plain');
  const [readOnly, setReadOnly] = useState<boolean>(isMobile && !!pasteId);
  const resetFunction = useRef<ResetFunction>(null);

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
        setShowAbout={setShowAbout}
      />
      <EditorTextArea
        forcedContent={forcedContent}
        actualContent={actualContent}
        setActualContent={setActualContent}
        language={language}
        fontSize={fontSize}
        readOnly={readOnly}
        wordWrap={wordWrap}
        resetFunction={resetFunction}
      />
    </>
  );
}
