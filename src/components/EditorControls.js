import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { gzip } from 'pako';
import history from 'history/browser';
import copy from 'copy-to-clipboard';

import { languageIds } from '../highlighting';
import themes from '../style/themes';

export default function EditorControls({ code, setCode, language, setLanguage, theme, setTheme }) {
  const [saving, setSaving] = useState(false);
  const [recentlySaved, setRecentlySaved] = useState(false);

  useEffect(() => {
    setRecentlySaved(false);
  }, [code, language])

  useEffect(() => {
    const listener = (e) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          save();
        }
      }
    }
    
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function save() {
    if (!code || recentlySaved) {
      return;
    }
    setSaving(true);
    saveToBytebin(code, language).then((pasteId) => {
      setSaving(false);
      setRecentlySaved(true);
      history.replace({
        pathname: pasteId
      });
      copy(window.location.href);
      document.title = 'paste | ' + pasteId;
    });
  }

  function reset() {
    setCode('');
    setLanguage('plain');
    history.replace({
      pathname: '/'
    });
    document.title = 'paste';
  }

  return (
    <Header>
      <Section>
        <Button onClick={reset}>[new]</Button>
        <Button onClick={save}>
          {recentlySaved
            ? '[link copied!]'
            : saving ? '[saving...]' : '[save]'
          }
        </Button>
        <MenuButton label="language" value={language} setValue={setLanguage} ids={languageIds} />
      </Section>
      <Section>
        <MenuButton label="theme" value={theme} setValue={setTheme} ids={Object.keys(themes)} />
        <Button as="a" href="https://github.com/lucko/paste" target="_blank" rel="noreferrer">[about]</Button>
      </Section>
    </Header>
  )
}

const Header = styled.header`
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 2em;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.secondary};
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 .25em;
  color: inherit;
  text-decoration: none;

  :hover {
    background: ${props => props.theme.highlight};
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 2em;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${props => props.theme.highlight};

  > li {
    padding: .15em .5em;
  }

  > li:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

const MenuButton = ({ label, ids, value, setValue }) => {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  function select(e, id) {
    e.stopPropagation();
    setOpen(false);
    setValue(id);
  }

  return (
    <Button onClick={toggleOpen}>
      [{label}: {value}]
      {open && (
        <Menu>  
          {ids.map(id => <li key={id} onClick={e => select(e, id)}>{id}</li>)}
        </Menu>
      )}
    </Button>
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
