import React from 'react';
import { styled } from 'styled-components';

export default function LinkStyle({ href, ariaLabel, className, text }) {
  return (
    <LinkStyles>
      <a href={href} target='_blank' aria-label={ariaLabel}>
        <i className={className}></i>
        <p>{text}</p>
      </a>
    </LinkStyles>
  );
}

const LinkStyles = styled.li`
  margin-top: 4px;

  & a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    font-size: 1em;

    & p {
      margin: 0 0 0 8px;
      font-size: 1.25em;
    }
  }

  @media (min-width: 550px) {
    font-size: 1.25em;
    margin-top: 0;
    padding: 4px;
  }
`;
