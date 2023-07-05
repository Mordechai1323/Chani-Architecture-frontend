import React, { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import SelectStatus from './selectStatus';
import { styled } from 'styled-components';
import DeleteProject from './DeleteProject';
import AddTask from './AddTask';

export default function TasksTable({ projects, setProjects, project, getProjects, notify }) {
  const axiosPrivate = useAxiosPrivate();

  const controller = new AbortController();

  const deleteTaskHandler = async (projectID, taskID) => {
    try {
      const response = await axiosPrivate.delete(`/projects/task/?projectID=${projectID}&taskID=${taskID}`, {
        signal: controller.signal,
      });
      console.log('response: ', response);
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
    <TableTasksStyle>
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
            <SelectStatus projects={projects} project={project} setProjects={setProjects} task={task} notify={notify} />
            <DeleteProject onDelete={() => deleteTaskHandler(project?._id, task?._id)} />
          </tr>
        ))}
        <AddTask projectID={project._id} notify={notify} onAddTask={getProjects} />
      </tbody>
    </TableTasksStyle>
  );
}

const TableTasksStyle = styled.table`
  width: 80%;
  min-height: 25px;
  margin: 8px 0px 22px 48px;
  & .head-tasks {
    width: 100%;
    & tr {
      display: flex;
      justify-content: space-between;
      font-size: 0.75em;
      & th {
        width: 80%;
        padding: 0px 8px;
        &:nth-child(2) {
          width: 30%;
        }
        &:nth-child(3) {
          width: 8%;
        }
      }
    }
  }

  & tbody {
    width: 100%;
    & .tr-task {
      min-height: 32px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #3e3e3e;
      border-radius: 4vw;
      color: #eaeaeb;
      margin: 2px 0px;
      font-size: 0.75em;
      & td {
        width: 80%;
        padding: 0px 8px;
        &:nth-child(2) {
          width: 30%;
        }
        &:nth-child(3) {
          width: 8%;
          color: red;
        }
      }
    }
  }

  @media (min-width: 550px) {
    width: 60%;
    & .head-tasks {
      & tr {
        font-size: 1em;
      }
    }
    & tbody {
      & .tr-task {
        font-size: 1em;
      }
    }
  }

  @media (min-width: 1300px) {
    & .head-tasks {
      & tr {
        font-size: 1.1em;
      }
    }
  }
`;
