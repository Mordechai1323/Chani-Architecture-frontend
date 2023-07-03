import React from 'react';
import { styled } from 'styled-components';
import LinkStyle from './LinkStyle';

export default function LinksList() {
  return (
    <LinksListStyle>
      <ul>
        <LinkStyle href={'https://goo.gl/maps/EF35KfNT1wEsaSNWA'} ariaLabel={'link to our address'} className={'fa-solid fa-location-dot'} text={'Azrieli Center'} />
        <LinkStyle href={'tel:0533410494'} ariaLabel={'link to our phone number'} className={'fa-solid fa-phone'} text={'053-3410494'} />
        <LinkStyle href={'https://wa.me/972533410494'} ariaLabel={'link to our whatsapp'} className={'fa-brands fa-whatsapp'} text={'whatsapp'} />
        <LinkStyle href={'mailto:chanimoshe01@gmail.com'} ariaLabel={'link to our email'} className={'fa-solid fa-envelope'} text={'chanim@gmail.com'} />
        <LinkStyle href={'https://www.instagram.com/chani_moshe/'} ariaLabel={'link to our instagram'} className={'fa-brands fa-instagram'} text={'instagram'} />
        <LinkStyle
          href={'https://he-il.facebook.com/people/%D7%97%D7%A0%D7%99-%D7%91%D7%9F-%D7%A9%D7%9E%D7%A2%D7%95%D7%9F/100055724472432/'}
          ariaLabel={'link to our facebook'}
          className={'fa-brands fa-facebook'}
          text={'facebook'}
        />
      </ul>
    </LinksListStyle>
  );
}

const LinksListStyle = styled.div`
  width: 50%;

  & ul {
    list-style: none;
    padding: 8px 8px;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  @media (min-width: 550px) {
    & ul {
      margin-left: 16px;
    }
  }
`;
