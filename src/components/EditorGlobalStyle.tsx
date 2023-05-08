import { createGlobalStyle, ThemeProps } from 'styled-components';
import { Theme } from '../style/themes';

const EditorGlobalStyle = createGlobalStyle<ThemeProps<Theme>>`
  html, body {
    color-scheme: ${props => props.theme.lightOrDark};
    scrollbar-color: ${props => props.theme.lightOrDark};
    background-color: ${props => props.theme.background};
  }
`;

export default EditorGlobalStyle;
