import React, { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { styled } from 'styled-components';

export default function AddTask({ projectID, notify, onAddTask }) {
  const axiosPrivate = useAxiosPrivate();

  const [taskValue, setTaskValue] = useState('');

  const controller = new AbortController();

  const addTaskHandler = async (projectID) => {
    if (taskValue.length > 1) {
      const value = taskValue;
      setTaskValue('');
      try {
        const response = await axiosPrivate.post(
          `/projects/task/${projectID}`,
          { name: value },
          {
            signal: controller.signal,
          }
        );
        onAddTask();
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

  return (
    <AddTaskStyle>
      <td></td>
      <td>
        <input
          type='text'
          placeholder='task'
          name='task'
          onChange={(e) => setTaskValue(e?.target?.value)}
          onBlur={() => addTaskHandler(projectID)}
          onKeyDown={(e) => e.key === 'Enter' && addTaskHandler(projectID)}
          value={taskValue}
        />
      </td>
    </AddTaskStyle>
  );
}

const AddTaskStyle = styled.tr`
  height: 32px;
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #3e3e3e;
  border-radius: 2vw;
  color: #eaeaeb;
  margin: 2px 0px;
  & td {
    width: 100%;
    padding: 0px 8px;
    &:nth-child(1) {
      width: 3%;
    }
    & input {
      width: 100%;
      border: none;
      background: #3e3e3e;
      color: #17da4b;
      outline: none;
      font-weight: bold;
    }
  }
  @media (min-width: 550px) {
    font-size: 1em;
  }

  @media (min-width: 1300px) {
    font-size: 1.1em;
  }
`;
