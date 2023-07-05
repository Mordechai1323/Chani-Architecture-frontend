import React from 'react';

import Project from './project';
import { styled } from 'styled-components';

export default function ProjectsTable({ projects, setProjects, getProjects, notify }) {
  return (
    <TableProjectsStyle>
      <thead className='thead-projects'>
        <tr>
          <th></th>
          <th>Project number</th>
          <th>Project name</th>
          <th>Completion date</th>
          <th>Project status</th>
          <th>Del</th>
          <th>Info</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <Project
            key={project._id}
            projects={projects}
            setProjects={setProjects}
            project={project}
            getProjects={getProjects}
            notify={notify}
          />
        ))}
      </tbody>
    </TableProjectsStyle>
  );
}

const TableProjectsStyle = styled.table`
  width: 100%;

  & .thead-projects {
    & tr {
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      font-size: 0.5em;
      & th {
        width: 15%;
        &:nth-child(1) {
          width: 3%;
        }
        &:nth-child(6) {
          width: 5%;
        }
        &:nth-child(7) {
          width: 5%;
        }
        &:nth-child(8) {
          width: 5%;
        }
      }
    }
  }

  @media (min-width: 550px) {
    width: 90%;
    & .thead-projects {
      & tr {
        width: 90%;
        font-size: 1em;
        & th {
          width: 18%;
        }
      }
    }
  }

  @media (min-width: 1300px) {
    & .thead-projects {
      & tr {
        font-size: 1.1em;
      }
    }
  }
`;
