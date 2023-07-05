import React from 'react';
import { styled } from 'styled-components';

export default function Button({ text, type, color, background, width, onClick }) {
  return (
    <ButtonStyle color={color} background={background} width={width} onClick={onClick}>
      {text}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button`
  width: ${(props) => (props.width ? props.width : '')};
  height: 36px;
  background-color: ${(props) => (props.background ? props.background : '#3e3e3e')};
  color: ${(props) => (props.color ? props.color : 'white')};
  border-radius: 32px;
  border: none;
`;
