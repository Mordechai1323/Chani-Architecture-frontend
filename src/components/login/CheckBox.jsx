import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { styled } from 'styled-components';

export default function CheckBox() {
  const { persist, setPersist } = useAuth();

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <CheckBoxStyle>
      <label htmlFor='persist'>Trust this Device </label>
      <input type='checkbox' id='persist' defaultChecked={persist} onChange={() => setPersist((prev) => !prev)} />
    </CheckBoxStyle>
  );
}

const CheckBoxStyle = styled.div`
  width: 41%;

  & input {
    margin: 0 8px;
  }
  & label {
    font-weight: bold;
  }
`;
