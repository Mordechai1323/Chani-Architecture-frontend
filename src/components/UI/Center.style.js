import { styled } from 'styled-components';

export const Center = styled.div`
  width: ${(p) => (p.width ? p.width : '80%')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: ${(p) => p.background};
  border-radius: 4vw;
`;
