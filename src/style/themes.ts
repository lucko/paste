// todo: line numbers, {} [] () brackets, types, variables, arguments
import type { editor } from 'monaco-editor';

import dracula from 'monaco-themes/themes/Dracula.json';
import monokai from 'monaco-themes/themes/Monokai.json';
import solarizedDark from 'monaco-themes/themes/Solarized-dark.json';
import solarizedLight from 'monaco-themes/themes/Solarized-light.json';
import { CatppuccinFlavor, flavors, ColorFormat } from '@catppuccin/palette';

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
  'latte': Theme;
  'frappe': Theme;
  'macchiato': Theme;
  'mocha': Theme;
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
  'latte': createCatppuccinTheme(flavors.latte),
  'frappe': createCatppuccinTheme(flavors.frappe),
  'macchiato': createCatppuccinTheme(flavors.macchiato),
  'mocha': createCatppuccinTheme(flavors.mocha),
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

export function createCatppuccinTheme(flavor: CatppuccinFlavor): Theme {
  const color = (color: ColorFormat) => color.hex as Color;
  const nameToId: Record<string, string> = {
    [flavors.latte.name]: 'latte',
    [flavors.frappe.name]: 'frappe',
    [flavors.macchiato.name]: 'macchiato',
    [flavors.mocha.name]: 'mocha',
  };

  const editorTheme = makeMonacoTheme({
    base: flavor.dark ? 'vs-dark' : 'vs',
    colors: {
      // Monaco
      primary: color(flavor.colors.text),
      background: color(flavor.colors.mantle),
      string: color(flavor.colors.green),
      comment: color(flavor.colors.overlay0),
      delimiter: color(flavor.colors.overlay2),
      annotation: color(flavor.colors.yellow),
      constant: color(flavor.colors.peach),
      number: color(flavor.colors.peach),
      operator: color(flavor.colors.sky),
      keyword: color(flavor.colors.mauve),
      type: color(flavor.colors.yellow),
      variable: color(flavor.colors.text),

      // Log Files
      logDate: color(flavor.colors.mauve),
      logInfo: color(flavor.colors.green),
      logWarning: color(flavor.colors.yellow),
      logError: color(flavor.colors.red),
      logException: color(flavor.colors.yellow),

      // Diff Files
      diffMeta: color(flavor.colors.sky),
      diffAddition: color(flavor.colors.green),
      diffDeletion: color(flavor.colors.red),
    }
  });

  return {
    id: nameToId[flavor.name],
    lightOrDark: flavor.dark ? 'dark' : 'light',
    primary: color(flavor.colors.text),
    secondary: color(flavor.colors.base),
    highlight: color(flavor.colors.surface0),
    background: color(flavor.colors.mantle),
    highlightedLine: {
      color: color(flavor.colors.rosewater),
      backgroundColor: color(flavor.colors.surface2)
    },
    editor: editorTheme
  };
}