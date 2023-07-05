import React from 'react';
import styled from 'styled-components';

export default function Form({ children, onSubmit }) {
  return <FormStyle onSubmit={onSubmit}>{children}</FormStyle>;
}

const FormStyle = styled.form`
  width: 100%;
  min-height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3e3e3e;

  & .login-center {
    width: 70%;
    max-width: 350px;
    min-height: 500px;
    background-color: #eaeaeb;
    border-radius: 38px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;

    & .footer-container {
      width: 80%;
      min-height: 64px;
      display: flex;
      justify-content: space-around;

      & button {
        border: none;
        background: none;
        font-weight: bold;
        font-size: 0.8em;
        height: 100%;
        color: #3e3e3e;
      }
      & a {
        text-decoration: none;
        font-weight: bold;
        font-size: 0.8em;
        color: #3e3e3e;
        height: 100%;
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .login-center {
      max-width: 400px;
      min-height: 590px;
      & .header-container {
        height: 88px;
      }
    }
  }
`;
