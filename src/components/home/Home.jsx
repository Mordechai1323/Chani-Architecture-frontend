import React from 'react';

import { TopStyle } from './Top.style';
import About from './About';
import { styled } from 'styled-components';

function Home() {
  return (
    <HomeStyle>
      <TopStyle />
      <About />
    </HomeStyle>
  );
}

export default Home;

const HomeStyle = styled.div`
  background-color: #3e3e3e;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (min-width: 550px) {
    width: 100%;
  }
`;
