import { languages } from 'monaco-editor';

export const diffLanguage: languages.IMonarchLanguage = {
  defaultToken: '',
  tokenizer: {
    root: [
      // Meta lines (e.g., @@ -1,2 +3,4 @@)
      [/@@@ +-\d+,\d+ +\+\d+,\d+ +@@@/, 'meta'],
      [/^\*\*\* +\d+,\d+ +\*\*\*\*$/, 'meta'],
      [/^--- +\d+,\d+ +----$/, 'meta'],

      // Comments
      [/Index: .*/, 'comment'],
      [/^index.*/, 'comment'],
      [/={3,}/, 'comment'],
      [/^-{3}.*/, 'comment'],
      [/^\*{3} .*/, 'comment'],
      [/^\+{3}.*/, 'comment'],
      [/^diff --git.*/, 'comment'],
      [/^\*{15}$/, 'comment'],

      // Additions
      [/^\+.*/, 'addition'],
      [/^!.*/, 'addition'],

      // Deletions
      [/^-.*/, 'deletion'],
    ],
  },
};
