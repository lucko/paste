import { highlight, languages } from 'prismjs/components/prism-core';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
//import 'prismjs/components/prism-log';
import 'prismjs/components/prism-markdown';
//import 'prismjs/components/prism-php';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-yaml';

export const languageIds = [
  'plain',
  'markup',
  'css',
  'clike',
  'javascript',
  'bash',
  'diff',
  'docker',
  'go',
  'groovy',
  'haskell',
  'java',
  'json',
  'kotlin',
  //'log',
  'markdown',
  //'php',
  'protobuf',
  'python',
  'jsx',
  'typescript',
  'ruby',
  'rust',
  'sql',
  'toml',
  'yaml'
]

export function getHighlighter(language) {
  const grammar = language === 'plain' ? {} : languages[language];
  return (input) => highlight(input, grammar);
}
