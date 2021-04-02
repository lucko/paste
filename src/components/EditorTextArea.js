import { useRef } from 'react';
import styled from 'styled-components';
import ReactEditor from 'react-simple-code-editor';
import EditorPrismStyle from './EditorPrismStyle';
import { getHighlighter } from '../highlighting';

export default function EditorTextArea({ code, setCode, language, fontSize }) {
  const highlight = getHighlighter(language);

  function highlightWithLineNumbers(input, grammar) {
    return highlight(input, grammar)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join('\n');
  }

  const editorRef = useRef();
  function keydown(e) {
    handleKeydown(e, editorRef.current);
  }

  return (
    <EditorPrismStyle>
      <StyledReactEditor
        ref={editorRef}
        value={code}
        onValueChange={setCode}
        highlight={highlightWithLineNumbers}
        placeholder={'Paste (or type) some code...'}
        padding={10}
        size={fontSize}
        textareaId="code-area"
        autoFocus={true}
        onKeyDown={keydown}
      />
    </EditorPrismStyle>
  );
}

const StyledReactEditor = styled(ReactEditor)`
  counter-reset: line;
  font-size: ${props => props.size}px;
  outline: 0;
  min-height: calc(100vh - 2rem);

  #code-area {
    outline: none;
    padding-left: 60px !important;
  }

  pre {
    padding-left: 60px !important;
  }

  .editorLineNumber {
    position: absolute;
    left: 0px;
    color: ${props => props.theme.editor.lineNumber};
    text-align: right;
    width: 40px;
    font-weight: 100;
    user-select: none;
  }
`;

const KEYCODE_ENTER = 13;
const KEYCODE_PARENS = 57;
const KEYCODE_BRACKETS = 219;
const KEYCODE_QUOTE = 222;
const KEYCODE_BACK_QUOTE = 192;

function getPair(e) {
  if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
    return ['(', ')'];
  } else if (e.keyCode === KEYCODE_BRACKETS) {
    if (e.shiftKey) {
      return ['{', '}'];
    } else {
      return ['[', ']'];
    }
  } else if (e.keyCode === KEYCODE_QUOTE) {
    if (e.shiftKey) {
      return ['"', '"'];
    } else {
      return ["'", "'"];
    }
  } else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
    return ['`', '`'];
  }
  return null;
}

function handleKeydown(e, editor) {
  const { value, selectionStart, selectionEnd } = e.target;
  if (selectionStart !== selectionEnd) {
    return;
  }

  // When entering an open bracket/quote, add the closing one
  const pair = getPair(e);
  if (pair) {
    e.preventDefault();
    editor._applyEdits({
      value:
        value.substring(0, selectionStart) +
        pair[0] +
        pair[1] +
        value.substring(selectionEnd),
      selectionStart: selectionStart + 1,
      selectionEnd: selectionStart + 1,
    });
  }

  // When pressing enter immediately after an open bracket, automatically add a newline plus extra indent
  if (
    e.keyCode === KEYCODE_ENTER &&
    selectionEnd !== 0 &&
    value[selectionEnd - 1] === '{'
  ) {
    const line = editor._getLines(value, selectionStart).pop();
    const matches = line.match(/^\s+/);
    const existingIndent = matches ? matches[0] : '';

    const indent = '  ';
    const updatedValue =
      value.substring(0, selectionStart) +
      '\n' +
      existingIndent +
      indent +
      '\n' +
      existingIndent +
      value.substring(selectionEnd);
    const updatedSelection =
      selectionStart + 1 /* newline */ + existingIndent.length + indent.length;

    e.preventDefault();
    editor._applyEdits({
      value: updatedValue,
      selectionStart: updatedSelection,
      selectionEnd: updatedSelection,
    });
  }
}
