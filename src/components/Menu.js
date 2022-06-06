import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Button = styled.div`
  cursor: pointer;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.25em;
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

  > li.title {
    text-align: center;
    padding: 0.7em 0 0.3em 0;
    cursor: initial;
    font-weight: bold;
  }

  > li.title:hover {
    background-color: inherit;
  }

  > li.selected {
    ::before {
      content: '*';
      font-weight: bold;
    }

    padding-left: calc(1em - 1ch);
    font-weight: bold;
  }

  > li {
    padding: 0em 1em 0.05em 1em;
  }

  > li:hover {
    background-color: ${props => props.theme.secondary};
  }
`;

export const MenuButton = ({ label, ids, value, setValue }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const listener = e => setOpen(false);
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [setOpen]);

  function toggleOpen(e) {
    e.stopPropagation();
    setOpen(!open);
  }

  function select(e, id) {
    e.stopPropagation();
    setOpen(false);
    setValue(id);
  }

  function make(ids) {
    return ids.map(id => (
      <li
        key={id}
        className={id === value ? 'selected' : undefined}
        onClick={e => select(e, id)}
      >
        {id}
      </li>
    ));
  }

  let items;
  if (Array.isArray(ids)) {
    items = make(ids);
  } else {
    items = Object.entries(ids).map(([title, values]) =>
      [
        <li className="title" key={title} onClick={e => e.stopPropagation()}>
          [{title}]
        </li>,
      ]
        .concat(make(values))
        .flat()
    );
  }

  return (
    <Button onClick={toggleOpen}>
      [<span>{label}: </span>
      {value}]{open && <Menu>{items}</Menu>}
    </Button>
  );
};
