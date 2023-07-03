import React from 'react';
import meeting from '../../assets/meeting.jpg';
import { styled } from 'styled-components';

export default function AboutImage() {
  return (
    <ImageStyle data-aos='fade-right' data-aos-duration='1000'>
      <img src={meeting} alt='people' tabIndex='0' />
    </ImageStyle>
  );
}

const ImageStyle = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 90%;
    height: 90%;
  }

  @media (min-width: 550px) {
    width: 55%;
  }

`;
