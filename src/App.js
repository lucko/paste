import { useCallback, useEffect, useState } from 'react';
import Editor from './components/Editor';
import parseContentType from 'content-type-parser';
import { languageIds } from './util/highlighting';
import { bytebinUrl } from './util/constants';

function getPasteIdFromUrl() {
  const path = window.location.pathname;
  if (path && /^\/[a-zA-Z0-9]+$/.test(path)) {
    return path.substring(1);
  } else {
    return undefined;
  }
}

async function loadFromBytebin(id) {
  try {
    const resp = await fetch(bytebinUrl + id);
    if (resp.ok) {
      const content = await resp.text();
      const type = parseLanguageFromContentType(
        resp.headers.get('content-type')
      );

      document.title = 'pastes | ' + id;
      return { ok: true, content, type };
    } else {
      return { ok: false };
    }
  } catch (e) {
    return { ok: false };
  }
}

function parseLanguageFromContentType(contentType) {
  const { type, subtype: subType } = parseContentType(contentType);
  if (type === 'application' && subType === 'json') {
    return 'json';
  }
  if (type === 'text' && languageIds.includes(subType.toLowerCase())) {
    return subType.toLowerCase();
  }
}

const INITIAL = Symbol();
const LOADING = Symbol();
const LOADED = Symbol();

export default function App() {
  const [pasteId] = useState(getPasteIdFromUrl);
  const [state, setState] = useState(INITIAL);
  const [forcedContent, setForcedContent] = useState('');
  const [actualContent, setActualContent] = useState('');
  const [contentType, setContentType] = useState();

  const setContent = useCallback((content) => {
    setActualContent(content);
    setForcedContent(content);
  }, [setActualContent, setForcedContent]);

  useEffect(() => {
    if (pasteId && state === INITIAL) {
      setState(LOADING);
      setForcedContent('Loading...');
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
  }, [pasteId, state, setContent]);

  return (
    <Editor
      forcedContent={forcedContent}
      setForcedContent={setContent}
      actualContent={actualContent}
      setActualContent={setActualContent}
      contentType={contentType}
      pasteId={pasteId}
    />
  );
}

function get404Message(pasteId) {
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
