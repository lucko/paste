import type { editor } from 'monaco-editor';

export interface Theme {
  id: string;
  primary: string;
  secondary: string;
  highlight: string;
  lightOrDark: string;

  editor: {
    background: string;
    lineNumber: string;
    lineNumberHl: string;
    lineNumberHlBackground: string;
    primary: string;
    selection: string;
    comment: string;
    commentTag: string;
    punctuation: string;
    annotation: string;
    namespace: string;
    property: string;
    constant: string;
    number: string;
    selector: string;
    operator: string;
    keyword: string;
    function: string;
    className: string;
    variable: string;
  };
}

export interface Themes {
  light: Theme;
  blue: Theme;
  dark: Theme;
}

const themes: Themes = {
  light: {
    id: 'light',
    primary: '#aaddff',
    secondary: '#022550',
    highlight: '#36368c',
    lightOrDark: 'light',

    editor: {
      background: '#ffffff',
      lineNumber: '#cccccc',
      lineNumberHl: '#000000',
      lineNumberHlBackground: '#e0f6ff',
      primary: '#000000',
      selection: '#b3d4fc',
      comment: '#708090',
      commentTag: '#A082BD',
      punctuation: '#999999',
      annotation: '#999999',
      namespace: '#708090',
      property: '#ee9900',
      constant: '#990055',
      number: '#990055',
      selector: '#669900',
      operator: '#9a6e3a',
      keyword: '#0077aa',
      function: '#DD4A68',
      className: '#DD4A68',
      variable: '#ee9900',
    },
  },
  blue: {
    id: 'blue',
    primary: '#022550',
    secondary: '#aaddff',
    highlight: '#77c8f9',
    lightOrDark: 'dark',

    editor: {
      background: '#041f29',
      lineNumber: '#81969A',
      lineNumberHl: '#ffffff',
      lineNumberHlBackground: '#0e303e',
      primary: '#E0E2E4',
      selection: '#E0E2E4',
      comment: '#7D8C93',
      commentTag: '#A082BD',
      punctuation: '#E8E2B7',
      annotation: '#00FFF8',
      namespace: '#7CA8CF',
      property: '#ee9900',
      constant: '#F77669',
      number: '#FFCD22',
      selector: '#E2B671',
      operator: '#E8E2B7',
      keyword: '#1CCBEF',
      function: '#BCBCBC',
      className: '#82CF75',
      variable: '#ee9900',
    },
  },
  dark: {
    id: 'dark',
    primary: '#c9d1d9', // fg.default
    secondary: '#010409', // canvas.inset
    highlight: '#161b22', // canvas.overlay
    lightOrDark: 'dark',

    editor: {
      background: '#0d1117', // canvas.default
      lineNumber: '#484f58', // fg.subtle
      lineNumberHl: '#f0f6fc', // fg.onEmphasis
      lineNumberHlBackground: '#161b22', // canvas.overlay
      primary: '#c9d1d9', // fg.default
      selection: '#c9d1d9', // fg.default
      comment: '#8b949e',
      commentTag: '#79c0ff',
      punctuation: '#d2a8ff',
      annotation: '#a5d6ff',
      namespace: '#c9d1d9',
      property: '#7ee787',
      constant: '#ff7b72',
      number: '#f2cc60',
      selector: '#79c0ff',
      operator: '#ff7b72',
      keyword: '#ff7b72',
      function: '#e2c5ff',
      className: '#ffa657',
      variable: '#ffa657',
    },
  },
};

export default themes;

export function makeMonacoTheme(theme: Theme): editor.IStandaloneThemeData {
  return {
    base: theme.lightOrDark === 'light' ? 'vs' : 'vs-dark',
    inherit: true,
    rules: [
      {
        token: '', // minimap
        foreground: theme.editor.primary.substring(1),
        background: theme.editor.background.substring(1),
      },
      {
        token: 'string',
        foreground: theme.editor.selector.substring(1),
      },
      {
        token: 'keyword',
        foreground: theme.editor.keyword.substring(1),
      },
      {
        token: 'constant',
        foreground: theme.editor.constant.substring(1),
      },
      {
        token: 'number',
        foreground: theme.editor.number.substring(1),
      },
      {
        token: 'annotation',
        foreground: theme.editor.annotation.substring(1),
      },
      {
        token: 'variable',
        foreground: theme.editor.variable.substring(1),
      },
      {
        token: 'operator',
        foreground: theme.editor.operator.substring(1),
      },
      {
        token: 'operators',
        foreground: theme.editor.operator.substring(1),
      },
      {
        token: 'punctuation',
        foreground: theme.editor.operator.substring(1),
      },
      {
        token: 'delimiter',
        foreground: theme.editor.punctuation.substring(1),
      },
      {
        token: 'delimiter.square',
        foreground: theme.editor.punctuation.substring(1),
      },
      {
        token: 'delimiter.bracket',
        foreground: theme.editor.punctuation.substring(1),
      },
      {
        token: 'delimiter.parenthesis',
        foreground: theme.editor.punctuation.substring(1),
      },
      {
        token: 'identifier',
        foreground: theme.editor.primary.substring(1),
      },
      {
        token: 'type',
        foreground: theme.editor.className.substring(1),
      },
      {
        token: 'comment',
        foreground: theme.editor.comment.substring(1),
      },
    ],
    colors: {
      'editor.background': theme.editor.background,
      'editor.foreground': theme.editor.primary,
    },
  };
}
