import React from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { Link } from 'react-router-dom';

import SelectStatus from './selectStatus';
import TasksTable from './tasksTable';

export default function Project({ projects, setProjects, project, getProjects, notify }) {
  const axiosPrivate = useAxiosPrivate();

  const controller = new AbortController();

  const changeIsOpen = async (projectID) => {
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
      <tr className='tr-project'>
        <td onClick={() => changeIsOpen(project._id)}>{!project.isOpen ? <i className='fa-solid fa-arrow-right'></i> : <i className='fa-solid fa-arrow-down'></i>}</td>
        <td>{project.project_number}</td>
        <td>{project.project_name}</td>
        <td>{project.completion_date?.substring(0, 10)}</td>
        <td>
          <SelectStatus projects={projects} project={project} setProjects={setProjects} notify={notify} />
        </td>
        <td title='Delete this project' className='fa-solid fa-trash' onClick={() => window.confirm('Delete project?') && deleteProject(project._id)}></td>
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
      </tr>
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
