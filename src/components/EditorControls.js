import { useState, useEffect } from 'react';
import { languageIds } from '../highlighting';
import { gzip } from 'pako';
import history from 'history/browser';
import copy from 'copy-to-clipboard';

export default function EditorControls({ code, language, setLanguage }) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [recentlySaved, setRecentlySaved] = useState(false);

  useEffect(() => {
    setRecentlySaved(false);
  }, [code, language])

  function save() {
    if (!code || recentlySaved) {
      return;
    }
    setSaving(true);
    saveToBytebin(code, language).then((pasteId) => {
      setSaving(false);
      setRecentlySaved(true);
      history.replace({
        pathname: pasteId,
        hash: ''
      });
      copy(window.location.href);
      document.title = 'paste | ' + pasteId;
    });
  }

  function toggleLangMenu() {
    setLangMenuOpen(!langMenuOpen);
  }

  function selectLanguage(e, language) {
    e.stopPropagation();
    setLangMenuOpen(false);
    setLanguage(language);
  }

  return (
    <header>
      <div className="section">
        <div className="button" onClick={save}>
          {recentlySaved
            ? '[link copied!]'
            : saving ? '[saving...]' : '[save]'
          }
        </div>
        <div className="button" onClick={toggleLangMenu}>
          [language: {language}]
          {langMenuOpen && (
            <ul>  
              {languageIds.map(id => <li key={id} onClick={e => selectLanguage(e, id)}>{id}</li>)}
            </ul>
          )}
        </div>
      </div>
      <div className="section">
        <a className="button" href="https://bytebin.lucko.me/" target="_blank" rel="noreferrer">[not pasting code?]</a>
        <a className="button" href="https://github.com/lucko/paste" target="_blank" rel="noreferrer">[about paste]</a>
      </div>
    </header>
  )
}

async function saveToBytebin(code, language) {
  try {
    const compressed = gzip(code);
    const contentType = 'text/' + language;

    const resp = await fetch('https://bytebin.lucko.me/post', {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        'Content-Encoding': 'gzip',
        'Accept': 'application/json'
      },
      body: compressed
    });

    if (resp.ok) {
      const json = await resp.json();
      return json.key;
    }
  } catch (e) {
    console.log(e);
  }
  return null;
}
