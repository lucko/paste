// todo: line numbers, {} [] brackets, types, variables, arguments
import type { editor } from 'monaco-editor';

import dracula from 'monaco-themes/themes/Dracula.json';
import monokai from 'monaco-themes/themes/Monokai.json';
import solarizedDark from 'monaco-themes/themes/Solarized-dark.json';
import solarizedLight from 'monaco-themes/themes/Solarized-light.json';

type Color = `#${string}`;

export interface Theme {
  id: string;
  primary: Color;
  secondary: Color;
  highlight: Color;
  background: Color;
  lightOrDark: 'light' | 'dark';
  highlightedLine: {
    color: Color;
    backgroundColor: Color;
  };
  editor: editor.IStandaloneThemeData;
}

export interface Themes {
  'dark': Theme;
  'light': Theme;
  'dracula': Theme;
  'monokai': Theme;
  'solarized': Theme;
  'solarized-light': Theme;
  'catppuccin-latte': Theme;
  'catppuccin-frappe': Theme;
  'catppuccin-macchiato': Theme;
  'catppuccin-mocha': Theme;
  'catppuccin-oled': Theme;
}

const themes: Themes = {
  'dark': {
    id: 'dark',
    primary: '#c9d1d9', // fg.default
    secondary: '#010409', // canvas.inset
    highlight: '#161b22', // canvas.overlay
    background: '#0d1117', // canvas.default
    lightOrDark: 'dark',

    highlightedLine: {
      color: '#f0f6fc', // fg.onEmphasis
      backgroundColor: '#161b22', // canvas.overlay
    },

    editor: makeMonacoTheme({
      base: 'vs-dark',
      colors: {
        primary: '#c9d1d9', // fg.default
        background: '#0d1117', // canvas.default
        comment: '#8b949e',
        delimiter: '#d2a8ff',
        annotation: '#a5d6ff',
        constant: '#ff7b72',
        number: '#f2cc60',
        string: '#79c0ff',
        operator: '#ff7b72',
        keyword: '#ff7b72',
        type: '#ffa657',
        variable: '#ffa657',
        logInfo: '#3fb950', // green.3
        logError: '#f85149', // red.4
        logWarning: '#d29922', // yellow.3
        logDate: '#33B3AE', // teal.3
        logException: '#f8e3a1', // yellow.0
        diffMeta: '#33B3AE', // teal.3
        diffAddition: '#3fb950', // green.3
        diffDeletion: '#f85149', // red.4
      },
    }),
  },
  'light': {
    id: 'light',
    primary: '#aaddff',
    secondary: '#022550',
    highlight: '#36368c',
    background: '#ffffff',
    lightOrDark: 'light',

    highlightedLine: {
      color: '#000000',
      backgroundColor: '#e0f6ff',
    },

    editor: makeMonacoTheme({
      base: 'vs',
      colors: {
        primary: '#000000',
        background: '#ffffff',
        comment: '#708090',
        delimiter: '#999999',
        annotation: '#999999',
        constant: '#990055',
        number: '#990055',
        string: '#669900',
        operator: '#9a6e3a',
        keyword: '#0077aa',
        type: '#DD4A68',
        variable: '#ee9900',
        logInfo: '#2da44e', // green.4
        logError: '#cf222e', // red.5
        logWarning: '#d4a72c', // yellow.3
        logDate: '#136061', // teal.6
        logException: '#7d4e00', // yellow.6
        diffMeta: '#136061', // teal.6
        diffAddition: '#2da44e', // green.4
        diffDeletion: '#cf222e', // red.5
      },
    }),
  },
  'dracula': {
    id: 'dracula',
    primary: '#f8f8f2',
    secondary: '#383a59',
    highlight: '#44475a',
    background: '#282a36',
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#586e75',
      backgroundColor: '#44475a',
    },
    editor: addExtraColors(dracula as editor.IStandaloneThemeData, {
      logInfo: '#50FA7B', // green
      logError: '#FF5555', // red
      logWarning: '#FFB86C', // orange
      logDate: '#BD93F9', // purple
      logException: '#F1FA8C', // yellow
      diffMeta: '#BD93F9', // purple
      diffAddition: '#50FA7B', // green
      diffDeletion: '#FF5555', // red
    }),
  },
  'monokai': {
    id: 'monokai',
    primary: '#F8F8F2',
    secondary: '#222218',
    highlight: '#49483E',
    background: '#272822',
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#49483E',
      backgroundColor: '#3E3D32',
    },
    editor: addExtraColors(monokai as editor.IStandaloneThemeData, {
      logInfo: '#a6e22e', // green
      logError: '#f92672', // red
      logWarning: '#fd971f', // orange
      logDate: '#AB9DF2', // purple
      logException: '#F1FA8C', // yellow
      diffMeta: '#AB9DF2', // purple
      diffAddition: '#a6e22e', // green
      diffDeletion: '#f92672', // red
    }),
  },
  'solarized': {
    id: 'solarized',
    primary: '#839496', // base0
    secondary: '#073642', // base02
    highlight: '#002b36', // base03
    background: '#002B36', // base03
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#93a1a1', // base1
      backgroundColor: '#073642', // base02
    },
    editor: addExtraColors(solarizedDark as editor.IStandaloneThemeData, {
      logInfo: '#268bd2', // blue
      logError: '#dc322f', // red
      logWarning: '#b58900', // yellow
      logDate: '#2aa198', // cyan
      logException: '#859900', // green
      diffMeta: '#2aa198', // cyan
      diffAddition: '#859900', // green
      diffDeletion: '#dc322f', // red
    }),
  },
  'solarized-light': {
    id: 'solarized-light',
    primary: '#586E75', // base01
    secondary: '#eee8d5', // base2
    highlight: '#FDF6E3', // base3
    background: '#FDF6E3', // base3
    lightOrDark: 'light',
    highlightedLine: {
      color: '#586e75', // base01
      backgroundColor: '#eee8d5', // base2
    },
    editor: addExtraColors(solarizedLight as editor.IStandaloneThemeData, {
      logInfo: '#268bd2', // blue
      logError: '#dc322f', // red
      logWarning: '#b58900', // yellow
      logDate: '#2aa198', // cyan
      logException: '#859900', // green
      diffMeta: '#2aa198', // cyan
      diffAddition: '#859900', // green
      diffDeletion: '#dc322f', // red
    }),
  },
  'catppuccin-latte': {
    id: 'catppuccin-latte',
    primary: '#4c4f69', // text
    secondary: '#eff1f5', // base
    highlight: '#acb0be', // selection background
    background: '#e6e9ef', // mantle
    lightOrDark: 'light',
    highlightedLine: {
      color: '#dc8a78', // cursor
      backgroundColor: '#acb0be', // selection background
    },
    editor: makeMonacoTheme({
      base: 'vs',
      colors: {
        primary: '#4c4f69', // text
        background: '#e6e9ef', // mantle
        comment: '#9ca0b0', // comment
        delimiter: '#7c7f93', // brace, delimeter
        annotation: '#df8e1d', // class, metadata
        constant: '#fe640b', // constant, number
        number: '#fe640b', // constant, number
        string: '#40a02b', // string
        operator: '#04a5e5', // operator
        keyword: '#8839ef', // keyword
        type: '#df8e1d', // class, metadata
        variable: '#4c4f69', // text
      },
    }),
  },
  'catppuccin-frappe': {
    id: 'catppuccin-frappe',
    primary: '#c6d0f5', // text
    secondary: '#303446', // base
    highlight: '#626880', // selection background
    background: '#292c3c', // mantle
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#f2d5cf', // cursor
      backgroundColor: '#626880', // selection background
    },
    editor: makeMonacoTheme({
      base: 'vs-dark',
      colors: {
        primary: '#c6d0f5', // text
        background: '#292c3c', // mantle
        comment: '#737994', // comment
        delimiter: '#949cbb', // brace, delimeter
        annotation: '#e5c890', // class, metadata
        constant: '#ef9f76', // constant, number
        number: '#ef9f76', // constant, number
        string: '#a6d189', // string
        operator: '#99d1db', // operator
        keyword: '#ca9ee6', // keyword
        type: '#e5c890', // class, metadata
        variable: '#c6d0f5', // text
      },
    }),
  },
  'catppuccin-macchiato': {
    id: 'catppuccin-macchiato',
    primary: '#cad3f5', // text
    secondary: '#24273a', // base
    highlight: '#5b6078', // selection background
    background: '#1e2030', // mantle
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#f4dbd6', // cursor
      backgroundColor: '#5b6078', // selection background
    },
    editor: makeMonacoTheme({
      base: 'vs-dark',
      colors: {
        primary: '#cad3f5', // text
        background: '#1e2030', // mantle
        comment: '#6e738d', // comment
        delimiter: '#939ab7', // brace, delimeter
        annotation: '#eed49f', // class, metadata
        constant: '#f5a97f', // constant, number
        number: '#f5a97f', // constant, number
        string: '#a6da95', // string
        operator: '#91d7e3', // operator
        keyword: '#c6a0f6', // keyword
        type: '#eed49f', // class, metadata
        variable: '#cad3f5', // text
      },
    }),
  },
  'catppuccin-mocha': {
    id: 'catppuccin-mocha',
    primary: '#cdd6f4', // text
    secondary: '#1e1e2e', // base
    highlight: '#585b70', // selection background
    background: '#181825', // mantle
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#f5e0dc', // cursor
      backgroundColor: '#585b70', // selection background
    },
    editor: makeMonacoTheme({
      base: 'vs-dark',
      colors: {
        primary: '#cdd6f4', // text
        background: '#181825', // mantle
        comment: '#6c7086', // comment
        delimiter: '#9399b2', // brace, delimeter
        annotation: '#f9e2af', // class, metadata
        constant: '#fab387', // constant, number
        number: '#fab387', // constant, number
        string: '#a6e3a1', // string
        operator: '#89dceb', // operator
        keyword: '#cba6f7', // keyword
        type: '#f9e2af', // class, metadata
        variable: '#cdd6f4', // text
      },
    }),
  },
  'catppuccin-oled': {
    id: 'catppuccin-oled',
    primary: '#cdd6f4', // text
    secondary: '#020202', // base
    highlight: '#585b70', // selection background
    background: '#010101', // mantle
    lightOrDark: 'dark',
    highlightedLine: {
      color: '#f5e0dc', // cursor
      backgroundColor: '#585b70', // selection background
    },
    editor: makeMonacoTheme({
      base: 'vs-dark',
      colors: {
        primary: '#cdd6f4', // text
        background: '#010101', // mantle
        comment: '#6c7086', // comment
        delimiter: '#9399b2', // brace, delimeter
        annotation: '#f9e2af', // class, metadata
        constant: '#fab387', // constant, number
        number: '#fab387', // constant, number
        string: '#a6e3a1', // string
        operator: '#89dceb', // operator
        keyword: '#cba6f7', // keyword
        type: '#f9e2af', // class, metadata
        variable: '#cdd6f4', // text
      },
    }),
  },
};

export default themes;

interface ExtraColors {
  logInfo: Color;
  logError: Color;
  logWarning: Color;
  logDate: Color;
  logException: Color;
  diffMeta: Color;
  diffAddition: Color;
  diffDeletion: Color;
}

interface MonacoThemeProps {
  base: 'vs' | 'vs-dark';
  colors: {
    primary: Color;
    background: Color;
    string: Color;
    comment: Color;
    delimiter: Color;
    annotation: Color;
    constant: Color;
    number: Color;
    operator: Color;
    keyword: Color;
    type: Color;
    variable: Color;
  } & ExtraColors;
}

export function makeMonacoTheme(
  props: MonacoThemeProps
): editor.IStandaloneThemeData {
  const colors = Object.fromEntries(
    Object.entries(props.colors).map(([key, color]) => [
      key,
      color.substring(1),
    ])
  ) as Record<keyof MonacoThemeProps['colors'], string>;

  return {
    base: props.base,
    inherit: true,
    rules: [
      {
        token: '' /* minimap */,
        foreground: colors.primary,
        background: colors.background,
      },
      { token: 'string', foreground: colors.string },
      { token: 'keyword', foreground: colors.keyword },
      { token: 'constant', foreground: colors.constant },
      { token: 'number', foreground: colors.number },
      { token: 'annotation', foreground: colors.annotation },
      { token: 'variable', foreground: colors.variable },
      { token: 'operator', foreground: colors.operator },
      { token: 'operators', foreground: colors.operator },
      { token: 'punctuation', foreground: colors.operator },
      { token: 'delimiter', foreground: colors.delimiter },
      { token: 'delimiter.square', foreground: colors.delimiter },
      { token: 'delimiter.bracket', foreground: colors.delimiter },
      { token: 'delimiter.parenthesis', foreground: colors.delimiter },
      { token: 'identifier', foreground: colors.primary },
      { token: 'type', foreground: colors.type },
      { token: 'comment', foreground: colors.comment },
      { token: 'info.log', foreground: colors.logInfo },
      { token: 'error.log', foreground: colors.logError, fontStyle: 'bold' },
      { token: 'warning.log', foreground: colors.logWarning },
      { token: 'date.log', foreground: colors.logDate },
      { token: 'exception.log', foreground: colors.logException },
      { token: 'meta.diff', foreground: colors.diffMeta },
      { token: 'addition.diff', foreground: colors.diffAddition },
      { token: 'deletion.diff', foreground: colors.diffDeletion },
    ],
    colors: {
      'editor.background': `#${colors.background}`,
      'editor.foreground': `#${colors.primary}`,
    },
  };
}

export function addExtraColors(
  theme: editor.IStandaloneThemeData,
  extraColors: ExtraColors
): editor.IStandaloneThemeData {
  const colors = Object.fromEntries(
    Object.entries(extraColors).map(([key, color]) => [key, color.substring(1)])
  ) as Record<keyof ExtraColors, string>;
  theme.rules.push(
    ...[
      { token: 'info.log', foreground: colors.logInfo },
      { token: 'error.log', foreground: colors.logError, fontStyle: 'bold' },
      { token: 'warning.log', foreground: colors.logWarning },
      { token: 'date.log', foreground: colors.logDate },
      { token: 'exception.log', foreground: colors.logException },
      { token: 'meta.diff', foreground: colors.diffMeta },
      { token: 'addition.diff', foreground: colors.diffAddition },
      { token: 'deletion.diff', foreground: colors.diffDeletion },
    ]
  );
  return theme;
}
