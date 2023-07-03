import React from 'react';
import { styled } from 'styled-components';

export default function Burger({ toggleNavBar, isOpen }) {
  return (
    <BurgerStyle onClick={toggleNavBar} onKeyDown={(e) => (e.key == 'Enter' ? toggleNavBar() : '')}>
      {!isOpen ? <i tabIndex='0' className='fa-solid fa-bars'></i> : <i className='fa-solid fa-xmark'></i>}
    </BurgerStyle>
  );
}

const BurgerStyle = styled.div`
  display: block;
  margin-right: 8px;
  color: white;
  font-size: 1.2em;
  cursor: pointer;

  @media (min-width: 550px) {
    display: none;
  }
`;
