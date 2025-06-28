import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import About from './components/About.tsx';
import Editor from './components/Editor';
import usePreference from './hooks/usePreference.ts';
import themes, { Themes } from './style/themes.ts';
import { loadFromBytebin } from './util/storage';
import { useQueryRouting } from './util/storage';

const INITIAL = Symbol();
const LOADING = Symbol();
const LOADED = Symbol();

type LoadingState = typeof INITIAL | typeof LOADING | typeof LOADED;

export default function App() {
  const [pasteId] = useState<string | undefined>(getPasteIdFromUrl);
  const [state, setState] = useState<LoadingState>(INITIAL);
  const [forcedContent, setForcedContent] = useState<string>('');
  const [actualContent, setActualContent] = useState<string>('');
  const [contentType, setContentType] = useState<string>();
  const [theme, setTheme] = usePreference<keyof Themes>(
    'theme',
    'dark',
    pref => !!themes[pref]
  );
  const [showAbout, setShowAbout] = useState<boolean>(false);

  function setContent(content: string) {
    setActualContent(content);
    setForcedContent(content);
  }

  useEffect(() => {
    if (pasteId && state === INITIAL) {
      setState(LOADING);
      setContent('Loading...');

      loadFromBytebin(pasteId).then(({ ok, content, type }) => {
        if (ok) {
          setContent(content);
          if (type) {
            setContentType(type);
          }
        } else {
          setContent(get404Message(pasteId));
        }
        setState(LOADED);
      });
    }
  }, [pasteId, state]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <Editor
        forcedContent={forcedContent}
        actualContent={actualContent}
        setActualContent={setActualContent}
        contentType={contentType}
        pasteId={pasteId}
        theme={theme}
        setTheme={setTheme}
        setShowAbout={setShowAbout}
      />
      {showAbout && <About setVisible={setShowAbout} />}
    </ThemeProvider>
  );
}

function get404Message(pasteId: string) {
  return `
  ██╗  ██╗ ██████╗ ██╗  ██╗
  ██║  ██║██╔═████╗██║  ██║
  ███████║██║██╔██║███████║
  ╚════██║████╔╝██║╚════██║
       ██║╚██████╔╝     ██║
       ╚═╝ ╚═════╝      ╚═╝

  not found: '${pasteId}'
  maybe the paste expired?
`;
}

function getPasteIdFromUrl() {
  if (useQueryRouting) {
    return new URLSearchParams(window.location.search).get('id') ?? undefined;
  }

  const path = window.location.pathname;
  return /^\/[a-zA-Z0-9]+$/.test(path) ? path.substring(1) : undefined;
}
