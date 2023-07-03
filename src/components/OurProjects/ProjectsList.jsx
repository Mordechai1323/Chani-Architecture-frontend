import React from 'react';
import { styled } from 'styled-components';
import ProjectItem from './ProjectItem';

export default function Projects({ projects }) {
  return (
    <ProjectsStyle>
      {projects.map((project) => {
        return <ProjectItem key={project._id} id={project._id} name={project.name} mainImage={project.main_image} />;
      })}
    </ProjectsStyle>
  );
}

const ProjectsStyle = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  font-family: 'Montserrat', sans-serif;
  justify-content: center;

  & a {
    color: white;
    text-decoration: none;
    width: 90%;
    min-height: 112px;
  }

  @media (min-width: 550px) {
    & a {
      width: 33%;
      height: 216px;

      & .project {
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
    }
  }

  @media (min-width: 1300px) {
    & a {
      width: 33%;
      height: 288px;
    }
  }
`;
