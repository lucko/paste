import Editor, {
  BeforeMount,
  Monaco,
  OnChange,
  OnMount,
} from '@monaco-editor/react';
import history from 'history/browser';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import themes, { makeMonacoTheme, Theme } from '../style/themes';

import type { editor } from 'monaco-editor';
import { ResetFunction } from './Editor';

export interface EditorTextAreaProps {
  forcedContent: string;
  actualContent: string;
  setActualContent: (value: string) => void;
  theme: Theme;
  language: string;
  fontSize: number;
  readOnly: boolean;
  resetFunction: MutableRefObject<ResetFunction | undefined>;
}

export default function EditorTextArea({
  forcedContent,
  actualContent,
  setActualContent,
  theme,
  language,
  fontSize,
  readOnly,
  resetFunction,
}: EditorTextAreaProps) {
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor>();
  const [monaco, setMonaco] = useState<Monaco>();
  const [selected, toggleSelected] = useSelectedLine();
  const editorAreaRef = useRef<HTMLDivElement>(null);

  useLineNumberMagic(
    editorAreaRef,
    selected,
    toggleSelected,
    forcedContent,
    editor,
    monaco
  );

  usePlaceholderText(actualContent, editor, monaco);

  const beforeMount: BeforeMount = monaco => {
    for (const [id, theme] of Object.entries(themes)) {
      monaco.editor.defineTheme(id, makeMonacoTheme(theme));
    }

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: true,
    });
  };

  const onMount: OnMount = (editor, monaco) => {
    editor.addAction({
      id: 'search',
      label: 'Search with Google',
      contextMenuGroupId: '9_cutcopypaste',
      contextMenuOrder: 5,
      run: editor => {
        const selection = editor.getSelection();
        if (selection && !selection.isEmpty()) {
          const model = editor.getModel();
          if (model) {
            const query = model.getValueInRange(selection);
            window.open('https://www.google.com/search?q=' + query, '_blank');
          }
        }
      },
    });

    setEditor(editor);
    setMonaco(monaco);

    resetFunction.current = () => {
      editor.setValue('');
      editor.focus();
    };

    editor.focus();
  };

  const onChange: OnChange = useCallback(
    value => {
      setActualContent(value as string);
    },
    [setActualContent]
  );

  // detect indentation whenever new forced content is set
  useEffect(() => {
    if (!editor) {
      return;
    }

    const model = editor.getModel();
    if (!model) {
      return;
    }

    model.detectIndentation(true, 2);
  }, [editor, forcedContent]);

  return (
    <EditorArea ref={editorAreaRef}>
      <Editor
        theme={theme.id}
        language={language === 'plain' ? 'plaintext' : language}
        options={{
          fontFamily: 'JetBrains Mono',
          fontSize: fontSize,
          fontLigatures: true,
          wordWrap: 'on',
          renderLineHighlight: 'none',
          renderValidationDecorations: 'off',
          readOnly,
          domReadOnly: readOnly,
        }}
        beforeMount={beforeMount}
        onMount={onMount}
        onChange={onChange}
        value={forcedContent}
      />
    </EditorArea>
  );
}

const EditorArea = styled.main`
  margin-top: 2.5em;
  height: 100%;

  .line-numbers {
    cursor: pointer !important;
  }

  .highlighted-line + div {
    color: ${props => props.theme.editor.lineNumberHl};
    background-color: ${props => props.theme.editor.lineNumberHlBackground};
    font-weight: bold;
  }

  .placeholder-text {
    position: absolute;
    opacity: 0.5;
    font-weight: lighter;

    &::after {
      content: 'Paste (or type) some code...';
    }
  }
`;

function usePlaceholderText(
  actualContent: string,
  editor: editor.IStandaloneCodeEditor | undefined,
  monaco: Monaco | undefined
) {
  useEffect(() => {
    if (!editor || !monaco || actualContent) {
      return;
    }
    const decoration = {
      range: new monaco.Range(1, 0, 1, 1),
      options: {
        after: {
          content: '\u200B',
          inlineClassName: 'placeholder-text',
        },
      },
    };
    const decorations = editor.deltaDecorations([], [decoration]);

    return () => {
      editor.deltaDecorations(decorations, []);
    };
  }, [editor, monaco, actualContent]);
}

type SelectedLine = [number, number];
type ToggleSelectedFunction = (lineNo: number, e: MouseEvent) => void;

function useSelectedLine(): [SelectedLine, ToggleSelectedFunction] {
  // extract highlighted lines from window hash
  const [selected, setSelected] = useState<[number, number]>(() => {
    const hash = window.location.hash;
    if (/^#L\d+(-\d+)?$/.test(hash)) {
      const [start, end] = hash.substring(2).split('-').map(Number);
      return [start, isNaN(end) ? start : end];
    } else {
      return [-1, -1];
    }
  });

  // update window hash when a new line is highlighted
  useEffect(() => {
    let hash = '';

    if (selected[0] !== -1) {
      if (selected[1] !== selected[0]) {
        const start = Math.min(...selected);
        const end = Math.max(...selected);
        hash = `#L${start}-${end}`;
      } else {
        hash = `#L${selected[0]}`;
      }
    }

    history.replace({ hash });
  }, [selected]);

  // toggle the highlighting for a given line
  const toggleSelected = useCallback(
    (lineNo: number, e: MouseEvent) => {
      const shift = e.shiftKey;
      if (selected[0] === lineNo && selected[1] === lineNo) {
        setSelected([-1, -1]);
      } else if (selected[0] === -1 || !shift) {
        setSelected([lineNo, lineNo]);
      } else {
        setSelected([selected[0], lineNo]);
      }
    },
    [selected, setSelected]
  );

  return [selected, toggleSelected];
}

function useLineNumberMagic(
  editorAreaRef: React.RefObject<HTMLDivElement>,
  selected: SelectedLine,
  toggleSelected: ToggleSelectedFunction,
  forcedContent: string,
  editor: editor.IStandaloneCodeEditor | undefined,
  monaco: Monaco | undefined
) {
  // add an event listener for clicking on line numbers
  useEffect(() => {
    const node = editorAreaRef.current;
    if (!node) {
      return;
    }

    const handler = (click: MouseEvent) => {
      const target = click?.target as HTMLElement;
      if (
        target &&
        target.classList.contains('line-numbers') &&
        target.textContent
      ) {
        toggleSelected(parseInt(target.textContent), click);
      }
    };

    node.addEventListener('click', handler);
    return () => node.removeEventListener('click', handler);
  }, [editorAreaRef, toggleSelected]);

  // apply a 'highlighed' decoration to the selected lines
  // and scroll them into view if not already
  useEffect(() => {
    if (!editor || !monaco || selected[0] === -1) {
      return;
    }

    // apply a decoration
    const newDecorations = [
      {
        range: new monaco.Range(selected[0], 1, selected[1], 1),
        options: {
          isWholeLine: true,
          linesDecorationsClassName: 'highlighted-line',
        },
      },
    ];
    const decorations = editor.deltaDecorations([], newDecorations);

    // scroll the selected line into view
    if (selected[0] === selected[1]) {
      editor.revealLineInCenterIfOutsideViewport(selected[0]);
    } else {
      editor.revealLinesInCenterIfOutsideViewport(selected[0], selected[1]);
    }

    // cleanup by removing the decorations
    return () => {
      editor.deltaDecorations(decorations, []);
    };
  }, [editor, monaco, selected, forcedContent]);
}
