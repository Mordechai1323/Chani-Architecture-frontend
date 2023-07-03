import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function ProjectItem({ id, name, mainImage }) {
  return (
    <Link to={'/project/' + id} aria-label={'link to' + name}>
      <ProjectItemStyle>
        <h2>{name}</h2>
        <img src={mainImage} alt={name} />
      </ProjectItemStyle>
    </Link>
  );
}

const ProjectItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  & h2 {
    position: absolute;
    margin: 0;
  }

  & img {
    width: 100%;
    height: 100%;
    opacity: 0.5;
    cursor: pointer;
  }

  @media (min-width: 550px) {
    height: 100%;

    &:hover {
      img {
        opacity: 0.4;
        // transition: 1s;
      }

      & h2 {
        opacity: 1;
        transition: 1s;
      }
    }

    & h2 {
      margin: 0;
      opacity: 0;
      width: 25%;
      text-align: center;
    }

    img {
      opacity: 1;
      cursor: pointer;
      transition: all 1s ease-in-out;
    }
  }
`;
