import styled from 'styled-components';

export default function EditorPrismStyle({ children }) {
  return <Main>{children}</Main>;
}

const Main = styled.main`
  padding-top: 2em;
  color: ${props => props.theme.editor.primary};
  background: ${props => props.theme.editor.background};

  code[class*='language-'],
  pre[class*='language-'] {
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: ${props => props.theme.editor.selection};
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: ${props => props.theme.editor.selection};
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${props => props.theme.editor.comment};
  }

  .token.punctuation {
    color: ${props => props.theme.editor.punctuation};
  }

  .token.annotation {
    color: ${props => props.theme.editor.annotation};
  }

  .token.namespace {
    color: ${props => props.theme.editor.namespace};
  }

  .token.property,
  .token.tag {
    color: ${props => props.theme.editor.property};
  }

  .token.tag .punctuation {
    color: ${props => props.theme.editor.primary};
  }

  .token.script > .token.punctuation {
    color: ${props => props.theme.editor.punctuation};
  }

  .token.tag .attr-value {
    color: ${props => props.theme.editor.selector};
  }

  .token.tag .script {
    color: ${props => props.theme.editor.primary};
  }

  .token.boolean {
    color: ${props => props.theme.editor.keyword};
  }

  .token.constant {
    color: ${props => props.theme.editor.constant};
  }

  .token.number,
  .token.symbol,
  .token.deleted {
    color: ${props => props.theme.editor.number};
  }

  .token.attr-name {
    color: ${props => props.theme.editor.function};
  }

  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${props => props.theme.editor.selector};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${props => props.theme.editor.operator};
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${props => props.theme.editor.keyword};
  }

  .token.comment .token.keyword {
    color: ${props => props.theme.editor.primary};
  }

  .token.comment .token.tag,
  .token.comment .token.tag > .token.punctuation {
    color: ${props => props.theme.editor.commentTag};
  }

  .token.function {
    color: ${props => props.theme.editor.function};
  }

  .token.class-name {
    color: ${props => props.theme.editor.className};
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: ${props => props.theme.editor.variable};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`;
