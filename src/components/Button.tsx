import styled from 'styled-components';

const Button = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.25em;
  color: inherit;
  text-decoration: none;

  &:hover {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 640px) {
    span {
      display: none;
    }
  }
`;

export default Button;
