import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Button = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 .25em;
  color: inherit;
  text-decoration: none;

  :hover {
    background: ${props => props.theme.highlight};
  }

  @media (max-width: 640px) {
    span {
      display: none;
    }
  }
`;

const Menu = styled.ul`
  position: absolute;
  top: 2em;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${props => props.theme.highlight};
  max-height: calc(100vh - 2em);
  overflow: auto;

  > li {
    padding: .15em .5em;
  }

  > li:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

export const MenuButton = ({ label, ids, value, setValue }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const listener = (e) => setOpen(false);
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [open, setOpen]);

  function toggleOpen() {
    setOpen(!open);
  }

  function select(e, id) {
    e.stopPropagation();
    setOpen(false);
    setValue(id);
  }

  return (
    <Button onClick={toggleOpen}>
      [<span>{label}: </span>{value}]
      {open && (
        <Menu>  
          {ids.map(id => <li key={id} onClick={e => select(e, id)}>{id}</li>)}
        </Menu>
      )}
    </Button>
  )
}