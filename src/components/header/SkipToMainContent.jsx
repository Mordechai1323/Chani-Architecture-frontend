import React from 'react';
import { styled } from 'styled-components';

export default function SkipToMainContent() {
  return (
    <SkipToMainContentStyle>
      <a href='#content'>Skip to Main Content</a>
    </SkipToMainContentStyle>
  );
}

const SkipToMainContentStyle = styled.div`
  & a {
    position: absolute;
    // left: -1000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  & a:focus {
    position: static;
    width: auto;
    height: auto;
  }
`;
