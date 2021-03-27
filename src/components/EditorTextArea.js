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

  return (
    <EditorPrismStyle>
      <StyledReactEditor
        value={code}
        onValueChange={setCode}
        highlight={highlightWithLineNumbers}
        placeholder={'Type some code...'}
        padding={10}
        size={fontSize}
        textareaId='code-area'
      />
    </EditorPrismStyle>
  )
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
  }
`;
