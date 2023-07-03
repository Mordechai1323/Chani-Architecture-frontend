import React from 'react';
import { styled } from 'styled-components';
import LinksList from './LinksList';
import Nav from '../header/Nav';

export default function Footer() {
  return (
    <FooterStyle>
      <LinksList />
      <Nav isFooter={true}/>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  min-height: 200px;
  width: 100%;
  display: flex;
  background-color: #eaeaeb;

  & a {
    text-decoration: none;
    color: #333232;
    font-weight: 300;
  }
`;
