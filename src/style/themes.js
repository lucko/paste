const themes = {
  light: {
    primary: '#aaddff',
    secondary: '#022550',
    highlight: '#36368c',
    lightOrDark: 'light',

    editor: {
      background: 'none',
      lineNumber: '#cccccc',
      lineNumberHl: 'black',
      lineNumberHlBackground: '#e0f6ff',
      primary: 'black',
      selection: '#b3d4fc',
      comment: 'slategray',
      commentTag: '#A082BD',
      punctuation: '#999',
      annotation: '#999',
      namespace: 'slategray',
      property: '#e90',
      constant: '#905',
      number: '#905',
      selector: '#690',
      operator: '#9a6e3a',
      keyword: '#07a',
      function: '#DD4A68',
      className: '#DD4A68',
      variable: '#e90',
    },
  },
  blue: {
    primary: '#022550',
    secondary: '#aaddff',
    highlight: '#77c8f9',
    lightOrDark: 'dark',

    editor: {
      background: '#041f29',
      lineNumber: '#81969A',
      lineNumberHl: '#fff',
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
