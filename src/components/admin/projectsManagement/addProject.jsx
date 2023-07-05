import React, { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputProject from '../../UI/inputProject';
import ButtonProject from '../../UI/buttonProject';
import { styled } from 'styled-components';

export default function AddProject() {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();

  const [selectedFile, setSelectedFile] = useState();
  const [formData, setFormData] = useState({
    project_number: '',
    project_name: '',
    client_email: '',
    completion_date: '',
    notes: '',
  });
  const [err, setErr] = useState({
    project_number: '',
    project_name: '',
    client_email: '',
    completion_date: '',
    notes: '',
  });

  const controller = new AbortController();

  const blurHandler = (e) => {
    const { name, value } = e.target;
    let errMsg = inputErrorHandler(name, value);
    setErr({ ...err, [name]: errMsg });
    setFormData({ ...formData, [name]: value });
  };

  function inputErrorHandler(name, value) {
    let errMsg = '';
    if (name === 'project_number') {
      errMsg = value.length > 0 ? '' : 'Enter valid number(min 1 digit)';
    } else if (name === 'project_name') {
      errMsg = value.length >= 2 ? '' : 'Enter valid name(min 2 letters)';
    } else if (name === 'client_email') {
      let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
      errMsg = value.trim().match(regex) || value.length === 0 ? '' : 'Enter valid email';
    }
    return errMsg;
  }

  const sendFileToServer = async (projectID) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axiosPrivate.post(`/projects/uploadFile/${projectID}`, formData, {
        signal: controller.signal,
      });
    } catch (error) {
      console.error(error.response);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const isErr = err.project_number !== '' || err.project_name !== '' || err.client_email !== '' ? true : false;

    if (!isErr) {
      try {
        const response = await axiosPrivate.post(`/projects/`, formData, {
          signal: controller.signal,
        });
        if (response.status === 201) {
          selectedFile && sendFileToServer(response.data._id);
          nav('/account');
        }
      } catch (err) {
        console.log('server error', err.response);
        !err.response
          ? notify('error', 'No Server Response')
          : err.response.status === 400
          ? notify('error', 'Missing info')
          : err.response?.status === 401
          ? notify('error', 'Client not found')
          : notify('error', 'Add project failed');
      }
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

  return (
    <AddProjectStyle>
      <div className='add-project-center'>
        <div className='top-container'>
          <h1>Add project</h1>
        </div>
        <div className='main-container'>
          <form onSubmit={onSubmit}>
            <InputProject
              name={'project_number'}
              label={'Project number'}
              required={true}
              type={'number'}
              onChange={blurHandler}
              errMessage={err.project_number}
            />
            <InputProject
              name={'project_name'}
              label={'Project name'}
              required={true}
              type={'text'}
              onChange={blurHandler}
              errMessage={err.project_name}
            />
            <InputProject
              name={'client_email'}
              label={'Client email'}
              type={'email'}
              onChange={blurHandler}
              errMessage={err.client_email}
            />
            <InputProject
              name={'completion_date'}
              label={'completion date'}
              type={'date'}
              value={formData.completion_date || ''}
              onChange={blurHandler}
            />
            <InputProject
              name={'project_file'}
              type={'file'}
              label={'Upload file'}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
            <InputProject name={'notes'} label={'Notes'} type={'text'} value={formData.notes} onChange={blurHandler} />
            <ButtonProject type={'submit'} text={'Add'} />
          </form>
        </div>
      </div>
      <ToastContainer />
    </AddProjectStyle>
  );
}

export const AddProjectStyle = styled.div`
  min-height: 500px;
  background-color: #3e3e3e;
  display: flex;
  align-items: center;
  justify-content: center;
  & .add-project-center {
    min-height: 410px;
    width: 90%;
    background-color: #eaeaeb;
    border-radius: 4vw;
    font-family: 'Noto Sans Mono', monospace;
    & .top-container {
      width: 100%;
      text-align: center;
      margin: 12px 0;
    }
    & .main-container {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      & form {
        width: 95%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        & .input-container {
          width: 45%;
          position: relative;
          margin: 24px 0;

          & input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 4px;
            font: inherit;
            color: #3e3e3e;
            font-weight: bold;
            background-color: transparent;
            outline: 2px solid #fff;
          }
          & label {
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(10px, 10px);
            transition: transform 0.25s;
            font-weight: bold;
          }

          & input:focus + label,
          & input:valid + label {
            transform: translate(10px, -14px) scale(0.8);
            color: #3e3e3e;
            padding-inline: 5px;
            background: #eaeaeb;
            font-weight: bold;
          }

          & input[type='number'] {
            &::-webkit-inner-spin-button,
            &::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            &[type='number'] {
              -moz-appearance: textfield; /* Firefox */
            }
          }
          & input[type='date'] {
            appearance: none;
            -webkit-appearance: none;
            background-color: transparent;
            border: none;
            padding: 8px;
            font-size: 16px;
            color: #3e3e3e;
            font-weight: bold;
            outline: none;
            outline: 2px solid #fff;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            &::-webkit-calendar-picker-indicator {
              opacity: 0.5;
              cursor: pointer;
            }
          }
          font-family: 'Noto Sans Mono', monospace;
          & input[type='file']::file-selector-button {
            border-radius: 4px;
            padding: 0 16px;
            // height: 25px;
            cursor: pointer;
            // background-color: white;
            border: 1px solid #3e3e3e;
            margin-right: 16px;
            transition: background-color 200ms;
          }
          & input[type='file']::file-selector-button:hover {
            background-color: #f3f4f6;
          }
        }

        & .button-container {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 0px;
          & button {
            outline: 2px solid #fff;
            border-radius: 4px;
            font-weight: bold;
            border: none;
            width: 15%;
            height: 36px;
          }
        }
      }
    }
  }

  @media (min-width: 550px) {
    min-height: 500px;
    & .add-project-center {
      min-height: 410px;
      width: 65%;
      & .main-container {
        height: 90%;
        & form {
          width: 80%;
          & .input-container {
            width: 35%;
          }
        }
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .add-project-center {
      min-height: 550px;
      width: 60%;
      & .main-container {
        & form {
          & .button-container {
            margin-top: 64px;
          }
        }
      }
    }
  }
`;
