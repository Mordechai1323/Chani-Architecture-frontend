import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function NavItem({ to, text, className, isFooter }) {
  return (
    <NavItemStyle $isFooter={isFooter}>
      <Link to={to} className={className}>
        {text}
      </Link>
    </NavItemStyle>
  );
}

const NavItemStyle = styled.li`
  cursor: pointer;
  margin-top: 4px;


  ${(p) =>
    !p.$isFooter &&
    `  
  font-family: 'Noto Sans Mono', monospace;
  font-weight: 600;
  border-bottom: 1px solid white;
  padding: 12px;
  text-align: center;`}

  @media (min-width: 550px) {
    height: 5%;
    font-size: 2vw;
    padding: 0 0;
    border-bottom: none;

    & a {
      font-size: 1em;

      &:hover {
        color: rgba(111, 142, 180, 255);
        transition: 1s;
        transform: scale(1.05);
      }
    }
  }

  @media (min-width: 1300px) {
    & a {
      font-size: 0.75em;
    }
  }
`;
