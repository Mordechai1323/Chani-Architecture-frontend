import React from 'react';
import { styled } from 'styled-components';

export default function AboutText() {
  return (
    <TextStyle data-aos='fade-left' data-aos-duration='1000'>
      <p tabIndex='0'>
        The firm of architects Chani Ben Shimon came to Israel after it's dizzying success around the world in order to bring Israel to the forefront of architectural innovation
        that has existed for years in countries such as the United States, Dubai, Singapore, etc.
        <br />
        Our firm specializes in building luxury towers in inspiring design that create a lot of interest around them.
      </p>
    </TextStyle>
  );
}

const TextStyle = styled.div`
  width: 100%;
  min-height: 400px;
  color: white;
  text-align: center;
  font-family: 'Noto Sans Mono', monospace;

  @media (min-width: 550px) {
    width: 45%;
    min-height: 250px;

    & p {
      font-size: 1.25em;
    }
  }

  @media (min-width: 1300px) {
    & p {
      font-size: 1.75em;
    }
  }
`;
