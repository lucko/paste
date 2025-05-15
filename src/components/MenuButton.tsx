import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Button from './Button';

interface MenuButtonProps<T extends string> {
  label: string;
  ids: T[] | Record<string, T[]>;
  value: T;
  setValue: (value: T) => void;
}

export default function MenuButton<T extends string>({
  label,
  ids,
  value,
  setValue,
}: MenuButtonProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = () => setOpen(false);
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, [setOpen]);

  function toggleOpen(e: React.MouseEvent) {
    e.stopPropagation();
    if (!buttonRef.current) {
      return;
    }
    if (!open) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(!open);
  }

  function select(e: React.MouseEvent<HTMLLIElement>, id: T) {
    e.stopPropagation();
    setOpen(false);
    setValue(id);
  }

  function make(idsToMake: T[]) {
    return [...idsToMake].sort((a, b) => a.localeCompare(b)).map(id => (
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
    items = Object.entries(ids)
      .sort(([titleA], [titleB]) => titleA.localeCompare(titleB))
      .map(([title, values]) =>
      [
        <li className="title" key={title} onClick={e => e.stopPropagation()}>
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </li>,
      ]
        .concat(make(values as T[]))
    );
  }

  return (
    <>
      <Button onClick={toggleOpen} ref={buttonRef}>
        [<span>{label}: </span>
        {value}]
      </Button>
      {open &&
        createPortal(
          <Menu style={{ top: menuPosition.top, left: menuPosition.left }}>
            {items}
          </Menu>,
          document.body
        )}
    </>
  );
}

const Menu = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: ${props => props.theme.highlight};
  max-height: calc(100vh - 2em);
  overflow: auto;
  z-index: 20;
  min-width: 180px; 
  border: 1px solid ${props => props.theme.secondary};
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  > li {
    cursor: pointer;
    padding: 0.3em 1em 0.3em 2em; 
    color: ${props => props.theme.primary};
  }

  > li.title {
    text-align: left;
    padding: 0.5em 1em;
    cursor: initial;
    font-weight: bold;
    color: ${props => props.theme.primary};
    background-color: ${props => props.theme.secondary};
    border-bottom: 1px solid ${props => props.theme.highlight};
    margin-top: 0.25em; 
  }

  > li.title:first-child {
    margin-top: 0; 
  }

  > li.title:hover {
    background-color: ${props => props.theme.secondary}; 
  }

  > li.selected {
    background-color: ${props => darken(0.1, props.theme.highlight)}; 
    font-weight: bold; 
    &::before {
      content: '* '; 
      font-weight: bold; 
      position: absolute;
      left: 0.75em; 
    }
  }

  > li:not(.title):hover {
    background-color: ${props => darken(0.05, props.theme.highlight)}; 
  }
`;

const darken = (factor: number, color: string): string => {
  if (!color.startsWith('#') || (color.length !== 7 && color.length !== 4)) {
    return color; 
  }
  let hex = color.substring(1);
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  const num = parseInt(hex, 16);
  let r = (num >> 16) & 0xFF;
  let g = (num >> 8) & 0xFF;
  let b = num & 0xFF;

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - factor))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - factor))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - factor))));

  return `#${(r).toString(16).padStart(2, '0')}${(g).toString(16).padStart(2, '0')}${(b).toString(16).padStart(2, '0')}`;
};
