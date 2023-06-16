import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectsManagement() {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const location = useLocation();

  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusStyle, seStatusStyle] = useState('');
  const [taskValue, setTaskValue] = useState('');

  const [optionsArr, setOptionsArr] = useState([
    { name: '', style: 'rgb(121, 126, 147)' },
    { name: 'Working on it', style: 'rgb(253, 188, 100)' },
    { name: 'Done', style: 'rgb(51, 211, 145)' },
    { name: 'stuck', style: 'rgb(232, 105, 125)' },
  ]);

  const controller = new AbortController();

  const getProjects = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/myProjects`, {
        signal: controller.signal,
      });

      setProjects((prev) => {
        return response.data.map((project, i) => {
          return { ...project, isOpen: prev?.[i]?.isOpen || false };
        });
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      nav('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const changeStatus = async (e, projectID) => {
    const status = {
      name: e.target.value,
    };
    optionsArr.forEach((option) => (option.name === e.target.value ? (status.style = option.style) : ''));
    setProjects(projects.map((project) => (project._id === projectID ? { ...project, status } : project)));
    console.log(status);
    try {
      const response = await axiosPrivate.put(`/projects/status/${projectID}`, status, {
        signal: controller.signal,
      });
      // getProjects();
    } catch (err) {
      console.log('server error', err.response);
      !err.response
        ? notify('error', 'No Server Response')
        : err.response.status === 400
        ? notify('error', 'Missing info')
        : err.response?.status === 401
        ? notify('error', 'Project not found')
        : notify('error', 'Change status failed');
    }
  };

  const changeIsOpen = async (projectID) => {
    setProjects(projects.map((project) => (project._id === projectID ? { ...project, isOpen: !project.isOpen } : project)));
    // try {
    //   const response = await axiosPrivate.put(`/projects/changeIsOpen/${projectID}`, {
    //     signal: controller.signal,
    //   });
    // } catch (err) {
    //   console.log('server error', err.response);
    //   !err.response ? notify('error', 'No Server Response') : err.response?.status === 401 ? notify('error', 'Project not found') : notify('error', 'Open project failed');
    // }
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

  const addTask = async (projectID) => {
    try {
      const response = await axiosPrivate.post(
        `/projects/task/${projectID}`,
        { name: taskValue },
        {
          signal: controller.signal,
        }
      );
      getProjects();
      setTaskValue('');
      console.log(response.data);
    } catch (err) {
      console.log('server error', err.response);
      !err.response
        ? notify('error', 'No Server Response')
        : err.response.status === 400
        ? notify('error', 'Missing info')
        : err.response?.status === 401
        ? notify('error', 'Project not found')
        : notify('error', 'Add project failed');
    }
  };

  const changeTaskStatus = async (e, taskID, projectID) => {
    const status = {
      name: e.target.value,
    };
    optionsArr.forEach((option) => (option.name === e.target.value ? (status.style = option.style) : ''));
    setProjects(
      projects.map((project) => {
        if (project._id === projectID) {
          const tasks = project.tasks.map((task) => (task._id === taskID ? { ...task, status } : task));
          return { ...project, tasks };
        }
        return project;
      })
    );
    console.log(projects);
    try {
      const response = await axiosPrivate.put(`/projects/task/?projectID=${projectID}&taskID=${taskID}`, status, {
        signal: controller.signal,
      });
      // getProjects();
    } catch (err) {
      console.log('server error', err.response);
      !err.response
        ? notify('error', 'No Server Response')
        : err.response.status === 400
        ? notify('error', 'Missing info')
        : err.response?.status === 401
        ? notify('error', 'Project or Task not found')
        : notify('error', 'Change status failed');
    }
  };

  const deleteTask = async (projectID, taskID) => {
    try {
      const response = await axiosPrivate.delete(`/projects/task/?projectID=${projectID}&taskID=${taskID}`, {
        signal: controller.signal,
      });
      console.log(response.data);
      if (response.data._id) {
        notify('success', 'Task has been deleted');
        getProjects();
      }
    } catch (err) {
      console.log('server error', err.response);
      notify('error', 'project not deleted');
    }
  };

  const notify = (status, message) =>
    toast[status](message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  return isLoading ? (
    <img src='https://plaidphotography.com/images/edmontonskylineloading.gif' width='100%' height='100%' />
  ) : (
    <div className='projectsManagement-container'>
      <div className='center-container'>
        <div className='top-container'>
          <h1>Projects Management</h1>
          <Link title='Add project' to='/projectsManagement/add'>
            <i className='fa-solid fa-plus'></i>
          </Link>
        </div>
        <div className='main-container'>
          <table className='table-projects'>
            <thead className='thead-projects'>
              <tr>
                <th></th>
                <th>Project number</th>
                <th>Project name</th>
                {/* <th>Email client</th> */}
                <th>Completion date</th>
                <th>Project status</th>
                <th>Del</th>
                <th>Info</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <React.Fragment key={project._id}>
                  <tr className='tr-project'>
                    <td onClick={() => changeIsOpen(project._id)}>{!project.isOpen ? <i className='fa-solid fa-arrow-right'></i> : <i className='fa-solid fa-arrow-down'></i>}</td>
                    <td>{project.project_number}</td>
                    <td>{project.project_name}</td>
                    {/* <td>{project.client_email}</td> */}
                    <td>{project.completion_date?.substring(0, 10)}</td>
                    <td>
                      <select className='status-select' style={{ background: project?.status?.style }} onChange={(e) => changeStatus(e, project._id)}>
                        <option value={project?.status?.name} style={{ background: project?.status?.style }}>
                          {project?.status?.name}
                        </option>
                        {optionsArr.map((option, i) =>
                          option.name !== project.status.name ? (
                            <option value={option.name} style={{ background: option.style }} key={i}>
                              {option.name}
                            </option>
                          ) : (
                            ''
                          )
                        )}
                      </select>
                    </td>
                    <td title='Delete this project' className='fa-solid fa-trash' onClick={() => window.confirm('Delete project?') && deleteProject(project._id)}></td>
                    <td title='Info or Edit project'>
                      <Link to={'/projectsManagement/info/' + project._id}>
                        <i className='fa-solid fa-circle-info' />
                      </Link>
                    </td>
                    <td title='Edit'>
                      <Link to={'/projectsManagement/edit/' + project._id}>
                        <i className='fa-regular fa-pen-to-square'></i>
                      </Link>
                    </td>
                  </tr>
                  {project.isOpen ? (
                    <tr>
                      <td>
                        <table className='table-tasks'>
                          <thead className='head-tasks'>
                            <tr>
                              <th>task</th>
                              <th>status</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody className='body-tasks'>
                            {project.tasks.map((task) => (
                              <tr className='tr-task' key={task._id}>
                                <td>{task.name}</td>
                                <td>
                                  <select className='status-select' style={{ background: task?.status?.style }} onChange={(e) => changeTaskStatus(e, task?._id, project?._id)}>
                                    <option value={task?.name} style={{ background: task?.status?.style }}>
                                      {task?.status?.name}
                                    </option>
                                    {optionsArr.map((option, i) =>
                                      option?.name !== task?.status?.name ? (
                                        <option value={option?.name} style={{ background: option?.style }} key={i}>
                                          {option?.name}
                                        </option>
                                      ) : (
                                        ''
                                      )
                                    )}
                                  </select>
                                </td>
                                <td className='fa-solid fa-trash' onClick={() => window.confirm('Delete task?') && deleteTask(project?._id, task?._id)}></td>
                              </tr>
                            ))}
                            <tr className='add-task'>
                              <td></td>
                              <td>
                                <input
                                  type='text'
                                  placeholder='task'
                                  name='task'
                                  onChange={(e) => setTaskValue(e?.target?.value)}
                                  onBlur={() => addTask(project?._id)}
                                  onKeyDown={e => e.key === "Enter" && addTask(project?._id)}
                                  value={taskValue}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              ))}
              {/* <tr className='add-project'>
                <td></td>
                <td>
                  <input type='number' placeholder='Project id' onChange={blurHandler} name='project_number' value={formData?.project_number} />
                </td>
                <td>
                  <input type='text' placeholder='Project name' onChange={blurHandler} name='project_name' value={formData?.project_name} />
                </td>
                <td>
                  <input type='email' placeholder='Email client' onChange={blurHandler} name='client_email' value={formData?.client_email} />
                </td>
                <td>
                  <input type='date' placeholder='Completion date' onChange={blurHandler} name='completion_date' onBlur={addProject} />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
        )
      </div>
      <ToastContainer />
    </div>
  );
}
