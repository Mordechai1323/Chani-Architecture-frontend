import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Logo() {
  return (
    <LogoStyle>
      <Link to='/'>
        <h2>chani</h2>
        <h4>Architecture</h4>
      </Link>
    </LogoStyle>
  );
}

const LogoStyle = styled.div`
  width: 12vw;
  font-family: 'Montserrat', sans-serif;

  & a {
    & h2 {
      font-size: 4.1vw;
      margin: 0;
    }
    & h4 {
      font-size: 2vw;
      margin: 0;
    }
  }

  @media (min-width: 550px) {
    & a {
      & h2 {
        font-size: 1.2em;
      }
      & h4 {
        font-size: 0.55em;
      }
    }
  }
`;
