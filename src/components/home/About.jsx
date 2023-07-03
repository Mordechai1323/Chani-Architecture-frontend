import React from 'react';

import { styled } from 'styled-components';
import AboutImage from './AboutImage';
import AboutText from './AboutText';

export default function About() {
  return (
    <AboutStyle id='content'>
      <AboutImage />
      <AboutText />
    </AboutStyle>
  );
}

const AboutStyle = styled.div`
  width: 80%;
  min-height: 700px;

  @media (min-width: 550px) {
    min-height: 550px;
    display: flex;
    align-items: center;
  }

  @media (min-width: 1300px) {
    height: 700px;
  }
`;
