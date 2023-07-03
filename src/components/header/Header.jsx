import React, { useState } from 'react';
import Logo from './Logo';
import Nav from './Nav';
import Burger from './Burger';
import { styled } from 'styled-components';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <HeaderStyle>
      <Logo />
      <Burger toggleNavBar={toggleNavBar} isOpen={isOpen} />
      <Nav toggleNavBar={toggleNavBar} isOpen={isOpen} />
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  width: 100%;
  height: 8vw;
  background-color: #3e3e3e;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & a {
    text-decoration: none;
    color: white;
    font-size: 2em;
  }

  @media (min-width: 550px) {
    width: 100%;
    max-height: 80px;

    & a {
      font-size: 1.75vw;

      &:hover {
        color: rgba(111, 142, 180, 255);
        transition: 1s;
        transform: scale(1.05);
      }
    }
  }
`;
