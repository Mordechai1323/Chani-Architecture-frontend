import React from 'react';
import { styled } from 'styled-components';

export default function Input({ label, input, icon, errMessage }) {
  return (
    <InputStyle>
      <label htmlFor={input.id}>{label}</label>
      <div className='input-container'>
        <i className={icon}></i>
        <input {...input} />
      </div>
      {errMessage && (
        <span tabIndex='0' className='err-container'>
          {errMessage}
        </span>
      )}
    </InputStyle>
  );
}

const InputStyle = styled.div`
  margin-top: 18px;
  width: 55%;

  & label {
    font-size: 1.4em;
    margin: 0;
    font-weight: bold;
  }

  & .input-container {
    display: flex;
    align-items: center;

    & input {
      width: 100%;
      border: none;
      outline: none;
      margin-left: 8px;
      background: #eaeaeb;
      border-radius: 12px;
      font-weight: bold;
    }
  }

  & input::-webkit-outer-spin-button,
  & input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  & .err-container {
    color: red;
    font-weight: bold;
    font-size: 0.85em;
  }
`;
