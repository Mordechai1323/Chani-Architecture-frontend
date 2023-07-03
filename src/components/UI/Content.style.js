import { styled } from 'styled-components';

export const Content = styled.div`
  min-height: 500px;
  width: 100%;
  background: #3e3e3e;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1300px) {
    min-height: 850px;
  }
`;
