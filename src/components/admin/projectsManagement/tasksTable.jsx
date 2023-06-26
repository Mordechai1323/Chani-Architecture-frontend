import React, { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import SelectStatus from './selectStatus';

export default function TasksTable({ projects, setProjects, project, getProjects, notify }) {
  const axiosPrivate = useAxiosPrivate();

  const [taskValue, setTaskValue] = useState('');

  const controller = new AbortController();

  const addTask = async (projectID) => {
    if (taskValue.length > 0) {
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
    }
  };

  const deleteTask = async (projectID, taskID) => {
    try {
      const response = await axiosPrivate.delete(`/projects/task/?projectID=${projectID}&taskID=${taskID}`, {
        signal: controller.signal,
      });
      if (response.data._id) {
        notify('success', 'Task has been deleted');
        getProjects();
      }
    } catch (err) {
      console.log('server error', err.response);
      notify('error', 'project not deleted');
    }
  };

  return (
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
              <SelectStatus projects={projects} project={project} setProjects={setProjects} task={task} notify={notify} />
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
              onKeyDown={(e) => e.key === 'Enter' && addTask(project?._id)}
              value={taskValue}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
