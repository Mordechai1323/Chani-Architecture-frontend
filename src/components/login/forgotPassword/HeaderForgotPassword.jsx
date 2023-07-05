import React from 'react';
import { styled } from 'styled-components';

export default function HeaderForgotPassword({ text }) {
  return (
    <HeaderForgetPasswordStyle>
      <h1>{text}</h1>
    </HeaderForgetPasswordStyle>
  );
}

const HeaderForgetPasswordStyle = styled.div`
  width: 80%;
  text-align: center;
  & h1 {
    font-size: 1.25em;
    font-weight: bold;
  }
`;
