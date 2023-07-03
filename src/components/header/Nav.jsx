import React from 'react';
import { styled } from 'styled-components';
import NavItem from './NavItem';

export default function Nav({ toggleNavBar, isOpen, isFooter }) {
  return (
    <NavStyle onClick={toggleNavBar} onKeyDown={(e) => (e.key == 'Enter' ? toggleNavBar() : '')} $isOpen={isOpen} $isFooter={isFooter}>
      <ul>
        <NavItem to='/' text='Home' isFooter={isFooter} />
        <NavItem to='/projects' text='Projects' isFooter={isFooter} />
        <NavItem to='/order' text='Order' isFooter={isFooter} />
        <NavItem to='/contact' text='Contact' isFooter={isFooter} />
        <NavItem to='/account' className='fa-solid fa-user' isFooter={isFooter} />
      </ul>
    </NavStyle>
  );
}

const NavStyle = styled.nav`
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  position: absolute;
  top: 9vw;
  right: 0vw;
  background: #3e3e3e7a;

  ${(props) =>
    props.$isFooter &&
    `display: block;
    position: relative;
    top: 0;
    right: 0vw;
    background: none;
    width: 50%;
    text-align: center;
    display:flex;
    align-items: center;
    `}

  & ul {
    width: 200px;
    min-height: 150px;
    list-style: none;
    display: block;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 550px) {
    display: ${(props) => (props.$isFooter ? 'flex' : 'block')};
    position: relative;
    top: 0;
    right: 0vw;
    background: none;

    & ul {
      width: ${(props) => (props.$isFooter ? '50vw' : '55vw')};
      min-height: 22px;
      justify-content: space-around;
      display: ${(props) => (props.$isFooter ? 'block' : 'flex')};
    }
  }
`;
