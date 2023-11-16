import styled from 'styled-components';

export default function EditorOverlay() {
  return (
    <EditorIntroOverlay>
      <h1>&#123;pastes&#125;</h1>
      <ul>
        <li>
          <span># Upload a file</span>
        </li>
        <li>$ curl -T example.txt https://pastes.dev</li>
        <br />
        <li>
          <span># Pipe output from another command</span>
        </li>
        <li>$ tail -n 50 file.log | curl -T - https://pastes.dev</li>
        <br />
        <li>
          <span># Upload a file (without curl)</span>
        </li>
        <li>$ cat example.txt | netcat nc.pastes.dev 1337</li>
      </ul>
    </EditorIntroOverlay>
  );
}

const EditorIntroOverlay = styled.div`
  width: max(50vw, 400px);
  height: 450px;

  h1 {
    color: ${props => props.theme.primary};
    text-align: center;
    font-size: 5vw;
  }

  ul {
    list-style-type: none;
  }

  span {
    color: ${props => props.theme.comment};
  }

  color: ${props => props.theme.primary};
  border: 5px solid ${props => props.theme.secondary};
  background: ${props => props.theme.background};

  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
