import { createGlobalStyle } from 'styled-components';

const EditorGlobalStyle = createGlobalStyle`
  html, body {
    color-scheme: ${props => props.theme.lightOrDark};
    scrollbar-color: ${props => props.theme.lightOrDark};
    background-color: ${props => props.theme.background};
  }
`;

export default EditorGlobalStyle;
