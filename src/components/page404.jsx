import React from 'react';
import { Link } from 'react-router-dom';
import { Center } from './UI/Center.style';
import { Content } from './UI/Content.style';
import { styled } from 'styled-components';

function Page404() {
  return (
    <Content>
      <Center>
        <Page404Style>Page not found, 404</Page404Style>
        <Link style={{textDecoration: 'none', color: 'white', fontSize: '2em'}} to='/'>Back to home</Link>
      </Center>
    </Content>
  );
}

export default Page404;

const Page404Style = styled.h2`
     font-family: 'Montserrat', sans-serif;
  color: white;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 5em;
`;
