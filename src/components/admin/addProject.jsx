import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InputProject from './inputProject';
import ButtonProject from './buttonProject';

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
    <div className='add-project-container'>
      <div className='add-project-center'>
        <div className='top-container'>
          <h1>Add project</h1>
        </div>
        <div className='main-container'>
          <form onSubmit={onSubmit}>
            <InputProject name={'project_number'} label={'Project number'} required={true} type={'number'} onChange={blurHandler} errMessage={err.project_number} />
            <InputProject name={'project_name'} label={'Project name'} required={true} type={'text'} onChange={blurHandler} errMessage={err.project_name} />
            <InputProject name={'client_email'} label={'Client email'} type={'email'} onChange={blurHandler} errMessage={err.client_email} />
            <InputProject name={'completion_date'} label={'completion date'} type={'date'} value={formData.completion_date || ''} onChange={blurHandler} />
            <InputProject
              name={'project_file'}
              type={'file'}
              label={'Upload file'}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
              }}
            />
            <InputProject name={'notes'} label={'Notes'} type={'text'} value={formData.notes} onChange={blurHandler} />
            <ButtonProject type={'submit'} text={'Update'} />
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
