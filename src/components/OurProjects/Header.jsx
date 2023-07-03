import React from 'react';
import { styled } from 'styled-components';

export default function Header() {
  return (
    <HeaderStyle tabIndex='0'>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing .</p>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.div`
  width: 80%;
  max-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 32px 0;

  & p {
    width: 100%;
    padding: 0;
    margin: 0;
    font-family: 'Noto Sans Mono', monospace;
    font-weight: 900;
    font-size: 1.5em;
    color: white;
    text-align: center;
  }
`;
