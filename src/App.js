import { useEffect, useState } from 'react';
import Editor from './components/Editor';
import parseContentType from 'content-type-parser';
import { languageIds } from './highlighting';

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
    const resp = await fetch('https://bytebin.lucko.me/' + id);
    if (resp.ok) {
      const content = await resp.text();
      const { type, subtype: subType } = parseContentType(resp.headers.get('content-type'));
      
      document.title = 'paste | ' + id;
      if (type === 'text' && languageIds.includes(subType.toLowerCase())) {
        return { ok: true, content, type: subType.toLowerCase() };
      } else {
        return { ok: true, content };
      }
    } else {
      return { ok: false };
    }
  } catch (e) {
    return { ok: false };
  }
}

const INITIAL = Symbol();
const LOADING = Symbol();
const LOADED = Symbol();

export default function App() {
  const [pasteId] = useState(getPasteIdFromUrl);
  const [state, setState] = useState(INITIAL);
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState();

  useEffect(() => {
    if (pasteId && state === INITIAL) {
      setState(LOADING);
      setContent('// Loading, please wait...')
      loadFromBytebin(pasteId).then(({ ok, content, type }) => {
        if (ok) {
          setContent(content);
          if (type) {
            setContentType(type);
          }
        } else {
          setContent('// Unable to load a paste with the id \'' + pasteId + '\'\n// Are you sure it exists? Maybe it expired?');
        }
        setState(LOADED);
      })
    }
  }, [pasteId, state, setContent])

  return <Editor content={content} setContent={setContent} contentType={contentType} />;
}
