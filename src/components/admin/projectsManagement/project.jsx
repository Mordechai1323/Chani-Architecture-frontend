import React from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { Link } from 'react-router-dom';

import SelectStatus from './selectStatus';
import TasksTable from './tasksTable';
import { styled } from 'styled-components';
import DeleteProject from './DeleteProject';

export default function Project({ projects, setProjects, project, getProjects, notify }) {
  const axiosPrivate = useAxiosPrivate();

  const controller = new AbortController();

  const showTasksHandler = async (projectID) => {
    setProjects(projects.map((project) => (project._id === projectID ? { ...project, isOpen: !project.isOpen } : project)));
  };

  const deleteProject = async (projectID) => {
    try {
      const response = await axiosPrivate.delete(`/projects/project/${projectID}`, {
        signal: controller.signal,
      });
      if (response.data.deletedCount) {
        notify('success', 'Project has been deleted');
        getProjects();
      }
    } catch (err) {
      console.log('server error', err.response);
      notify('error', 'project not deleted');
    }
  };

  return (
    <>
      <ProjectStyle>
        <td onClick={() => showTasksHandler(project._id)}>
          {!project.isOpen ? <i className='fa-solid fa-arrow-right'></i> : <i className='fa-solid fa-arrow-down'></i>}
        </td>
        <td>{project.project_number}</td>
        <td>{project.project_name}</td>
        <td>{project.completion_date?.substring(0, 10)}</td>
        <SelectStatus projects={projects} project={project} setProjects={setProjects} notify={notify} />
        <DeleteProject onDelete={() => deleteProject(project._id)}/>
        <td title='Project info'>
          <Link to={'/projectsManagement/info/' + project._id}>
            <i className='fa-solid fa-circle-info' />
          </Link>
        </td>
        <td title='Edit project'>
          <Link to={'/projectsManagement/edit/' + project._id}>
            <i className='fa-regular fa-pen-to-square'></i>
          </Link>
        </td>
      </ProjectStyle>
      {project.isOpen ? (
        <tr>
          <td>
            <TasksTable projects={projects} setProjects={setProjects} project={project} getProjects={getProjects} notify={notify} />
          </td>
        </tr>
      ) : (
        ''
      )}
    </>
  );
}

const ProjectStyle = styled.tr`
  height: 32px;
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #3e3e3e;
  border-radius: 2vw;
  color: #eaeaeb;
  margin: 2px 0px;
  font-size: 0.5em;
  & td {
    width: 18%;
    padding: 0px 8px;
    &:nth-child(1) {
      width: 3%;
      cursor: pointer;
    }
    &:nth-child(6) {
      width: 5%;
      color: red;
      cursor: pointer;
    }
    &:nth-child(7) {
      width: 5%;
      & a {
        text-decoration: none;
        color: #eaeaeb;
      }
    }
    &:nth-child(8) {
      width: 5%;
      a {
        text-decoration: none;
        color: #eaeaeb;
      }
    }
  }

  @media (min-width: 550px) {
    font-size: 1em;
    & td {
      width: 18%;
    }
  }

  @media (min-width: 1300px) {
    font-size: 1.1em;
  }
`;
