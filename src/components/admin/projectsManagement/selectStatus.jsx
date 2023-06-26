import React from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';

export default function SelectStatus({ projects, setProjects, project, task, notify }) {
  const axiosPrivate = useAxiosPrivate();

  const controller = new AbortController();

  const optionsArr = [
    { name: '', style: 'rgb(121, 126, 147)' },
    { name: 'Working on it', style: 'rgb(253, 188, 100)' },
    { name: 'Done', style: 'rgb(51, 211, 145)' },
    { name: 'stuck', style: 'rgb(232, 105, 125)' },
  ];

  const changeProjectStatus = async (e, projectID) => {
    const status = {
      name: e.target.value,
    };
    optionsArr.forEach((option) => (option.name === e.target.value ? (status.style = option.style) : ''));
    setProjects(projects.map((project) => (project._id === projectID ? { ...project, status } : project)));
    try {
      const response = await axiosPrivate.put(`/projects/status/${projectID}`, status, {
        signal: controller.signal,
      });
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
    try {
      const response = await axiosPrivate.put(`/projects/task/?projectID=${projectID}&taskID=${taskID}`, status, {
        signal: controller.signal,
      });
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

  const status = task ? task.status : project.status;

  return (
    <select
      className='status-select'
      style={{ background: status?.style }}
      onChange={(e) => (task ? changeTaskStatus(e, task?._id, project?._id) : changeProjectStatus(e, project?._id))}
    >
      <option value={status?.name} style={{ background: status?.style }}>
        {status?.name}
      </option>
      {optionsArr.map((option) =>
        option.name !== status.name ? (
          <option value={option.name} style={{ background: option.style }} key={option.name}>
            {option.name}
          </option>
        ) : (
          ''
        )
      )}
    </select>
  );
}
