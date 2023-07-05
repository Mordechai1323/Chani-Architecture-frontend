import styled from 'styled-components';

export const ForgotPasswordStyle = styled.form`
  width: 70%;
  max-width: 300px;
  min-height: 400px;
  background-color: #eaeaeb;
  border-radius: 38px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;

  & div {
    margin: 0;
  }

  & h6 {
    width: 80%;
    text-align: center;
    font-weight: bold;
  }

  @media (min-width: 1300px) {
    max-width: 380px;
    min-height: 500px;
  }
`;
