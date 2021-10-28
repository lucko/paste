import {
  highlight,
  languages as prismLanguages,
} from 'prismjs/components/prism-core';

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
import 'prismjs/components/prism-javadoclike';
import 'prismjs/components/prism-javadoc';
import 'prismjs/components/prism-javastacktrace';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-log';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-properties';
import 'prismjs/components/prism-protobuf';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-toml';
import 'prismjs/components/prism-yaml';

export const languages = {
  config: ['yaml', 'json', 'toml', 'properties'],
  logs: ['log', 'javastacktrace'],
  code: [
    'java',
    'javascript',
    'typescript',
    'python',
    'kotlin',
    'clike',
    'bash',
    'ruby',
    'rust',
    'sql',
    'go',
    'groovy',
    'haskell',
  ],
  web: ['markup', 'css', 'php', 'jsx', 'tsx'],
  misc: ['plain', 'docker', 'diff', 'markdown', 'protobuf'],
};

export const languageIds = Object.values(languages).flat(1);

export function getHighlighter(language) {
  const grammar = prismLanguages[language] || {};
  return input => highlight(input, grammar);
}
