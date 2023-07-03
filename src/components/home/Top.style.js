import { styled } from 'styled-components';
import image from'../../assets/city.jpg'

export const TopStyle = styled.div`
  width: 100%;
  min-height: 450px;
  background-image: url(${image});
  background-size: cover;
  background-position: center;
  color: white;

  @media (min-width: 550px) {
    width: 100%;
    max-height: 700px;
    background-size: 100% 100%;
  }

  @media (min-width: 1300px) {
    min-height: 790px;
    background-size: 100% 100%;
  }
`;
