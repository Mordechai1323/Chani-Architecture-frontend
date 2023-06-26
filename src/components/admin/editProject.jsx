import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useNavigate, useParams } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../loading';
import InputProject from './inputProject';
import ButtonProject from './buttonProject';

export default function EditProject() {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const { projectID } = useParams();

  const [selectedFile, setSelectedFile] = useState();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
      errMsg = value.length > 0 || value.length === 0 ? '' : 'Enter valid number(min 1 digit)';
    } else if (name === 'project_name') {
      errMsg = value.length >= 2 || value.length === 0 ? '' : 'Enter valid name(min 2 letters)';
    } else if (name === 'client_email') {
      let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
      errMsg = value.trim().match(regex) || value.length === 0 ? '' : 'Enter valid email';
    }
    return errMsg;
  }

  const getProject = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/project/${projectID}`, {
        signal: controller.signal,
      });
      setProject(response.data);
      // setDate(response.data.completion_date?.substring(0, 10));
      setFormData({ ...formData, completion_date: response.data.completion_date?.substring(0, 10), notes: response.data.notes });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response);
      notify('error', 'Something bad happened, Try again');
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const sendFileToServer = async (urlFile) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axiosPrivate.post(`/projects/${urlFile}`, formData, {
        signal: controller.signal,
      });
      if (response.data.modifiedCount === 1) {
        nav('/account');
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let updatedData = {}

    for (const key in formData) {
      if (formData[key] !== '' || key === 'notes') {
        updatedData[key] = formData[key];
      } else {
        updatedData[key] = project[key];
      }
    }
    const isErr = err.project_number !== '' || err.project_name !== '' || err.client_email !== '' ? true : false;
    if (!isErr) {
      try {
        const response = await axiosPrivate.put(`/projects/?projectID=${projectID}`, updatedData, {
          signal: controller.signal,
        });
        const urlFile = project.file ? `editFile/${project._id}` : `uploadFile/${project._id}`;
        selectedFile && sendFileToServer(urlFile);
        if (response.data.modifiedCount === 1) {
          nav('/account');
        } else {
          notify('error', `You didn't change anything`);
        }
      } catch (err) {
        console.log('server error', err.response);
        !err.response
          ? notify('error', 'No Server Response')
          : err.response.status === 400
          ? notify('error', 'Missing info')
          : err.response?.status === 401
          ? notify('error', 'Client not found')
          : notify('error', 'Edit project failed');
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

  return isLoading ? (
    <Loading />
  ) : (
    <div className='add-project-container'>
      <div className='add-project-center'>
        <div className='top-container'>
          <h1>Edit project</h1>
        </div>
        <div className='main-container'>
          <form onSubmit={onSubmit}>
            <InputProject
              name={'project_number'}
              label={'Project number'}
              type={'number'}
              placeholder={project.project_number}
              onChange={blurHandler}
              errMessage={err.project_number}
            />
            <InputProject name={'project_name'} label={'Project name'} type={'text'} placeholder={project.project_name} onChange={blurHandler} errMessage={err.project_name} />
            <InputProject name={'client_email'} label={'Client email'} type={'email'} placeholder={project.client_email} onChange={blurHandler} errMessage={err.client_email} />
            <InputProject name={'completion_date'} label={'completion date'} type={'date'} value={formData.completion_date || ''} onChange={blurHandler} />
            <InputProject
              name={'project_file'}
              type={'file'}
              label={project.file ? 'Update file' : 'Upload file'}
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
