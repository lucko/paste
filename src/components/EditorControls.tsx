import copy from 'copy-to-clipboard';
import history from 'history/browser';
import { MutableRefObject, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import themes, { Themes } from '../style/themes';
import { languages } from '../util/highlighting';
import { saveToBytebin } from '../util/storage';
import Button from './Button';
import { ResetFunction } from './Editor';
import MenuButton from './MenuButton';

export interface EditorControlsProps {
  actualContent: string;
  resetFunction: MutableRefObject<ResetFunction | undefined>;
  language: string;
  setLanguage: (value: string) => void;
  readOnly: boolean;
  setReadOnly: (value: boolean) => void;
  theme: keyof Themes;
  setTheme: (value: keyof Themes) => void;
  zoom: (delta: number) => void;
}

export default function EditorControls({
  actualContent,
  resetFunction,
  language,
  setLanguage,
  readOnly,
  setReadOnly,
  theme,
  setTheme,
  zoom,
}: EditorControlsProps) {
  const [saving, setSaving] = useState<boolean>(false);
  const [recentlySaved, setRecentlySaved] = useState<boolean>(false);

  useEffect(() => {
    setRecentlySaved(false);
  }, [actualContent, language]);

  const save = useCallback(() => {
    if (!actualContent || recentlySaved) {
      return;
    }
    setSaving(true);
    saveToBytebin(actualContent, language).then(pasteId => {
      setSaving(false);
      setRecentlySaved(true);
      if (pasteId) {
        history.replace({
          pathname: pasteId,
        });
        copy(window.location.href);
        document.title = 'paste | ' + pasteId;
      }
    });
  }, [actualContent, language, recentlySaved]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          save();
        }

        if (e.key === '=' || e.key === '-') {
          e.preventDefault();
          zoom(e.key === '=' ? 1 : -1);
        }
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [save, zoom]);

  function reset() {
    if (!resetFunction.current) {
      throw new Error();
    }

    resetFunction.current();
    setLanguage('plain');
    history.replace({
      pathname: '/',
      hash: '',
    });
    document.title = 'paste';
  }

  function unsetReadOnly() {
    setReadOnly(false);
  }

  return (
    <Header>
      <Section>
        <Button onClick={reset}>[new]</Button>
        <Button onClick={save}>
          {recentlySaved ? '[link copied!]' : saving ? '[saving...]' : '[save]'}
        </Button>
        <MenuButton
          label="language"
          value={language}
          setValue={setLanguage}
          ids={languages}
        />
        {readOnly && <Button onClick={unsetReadOnly}>[edit]</Button>}
      </Section>
      <Section>
        <Button onClick={() => zoom(1)}>[+ </Button>
        <Button onClick={() => zoom(-1)}> -]</Button>
        <MenuButton
          label="theme"
          value={theme}
          setValue={setTheme}
          ids={Object.keys(themes) as (keyof Themes)[]}
        />
        <Button
          className="optional"
          as="a"
          href="https://github.com/lucko/paste#readme"
          target="_blank"
          rel="noreferrer"
        >
          [about]
        </Button>
      </Section>
    </Header>
  );
}

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 2em;
  color: ${props => props.theme.primary};
  background: ${props => props.theme.secondary};
  display: flex;
  justify-content: space-between;
  user-select: none;
`;

const Section = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 470px) {
    .optional {
      display: none;
    }
  }
`;
