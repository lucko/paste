import ReactEditor from 'react-simple-code-editor';
import { getHighlighter } from '../highlighting';

import 'prismjs/themes/prism.css';

export default function EditorTextArea({ code, setCode, language }) {
  const highlight = getHighlighter(language);

  function highlightWithLineNumbers(input, grammar) {
    return highlight(input, grammar)
      .split('\n')
      .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
      .join('\n');
  }

  return (
    <main>
      <ReactEditor
        value={code}
        onValueChange={setCode}
        highlight={highlightWithLineNumbers}
        placeholder={'Type some code...'}
        padding={10}
        textareaId='code-area'
        className='editor'
      />
    </main>
  )
}
