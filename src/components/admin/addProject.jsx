import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddProject() {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();

  const [selectedFile, setSelectedFile] = useState();
  const controller = new AbortController();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendFileToServer = async (projectID) => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      const response = await axiosPrivate.post(`/projects/uploadFile/${projectID}`, formData, {
        signal: controller.signal,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const onSubmit = async (bodyData) => {
    try {
      const response = await axiosPrivate.post(`/projects/`, bodyData, {
        signal: controller.signal,
      });
      console.log(response);
      if (response.status === 201) {
        sendFileToServer(response.data._id);
        nav('/projectsManagement');
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-container'>
              <input {...register('project_number', { required: true })} id='project_number' type='number' />
              <label htmlFor='project_number'>Project number</label>
              {errors.project_number && (
                <div tabIndex='0' className='text-danger font-weight-bold d-block'>
                  Enter valid number(min 1 digit)
                </div>
              )}
            </div>
            <div className='input-container'>
              <input {...register('project_name', { required: true, minLength: 2 })} id='project_name' type='text' />
              <label htmlFor='project_name' required className='input-label'>
                Project name
              </label>
              {errors.project_name && (
                <div tabIndex='0' className='text-danger font-weight-bold d-block'>
                  Enter valid name(min 2 chars)
                </div>
              )}
            </div>
            <div className='input-container'>
              <input {...register('client_email', { required: false, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='client_email' type='email' />
              <label htmlFor='client_email' required className='input-label'>
                Project email
              </label>
              {errors.client_email && (
                <div tabIndex='0' className='text-danger font-weight-bold d-block'>
                  Enter valid email
                </div>
              )}
            </div>
            <div className='input-container'>
              <input {...register('completion_date')} id='completion_date' type='date' />
              <label htmlFor='completion_date' className='input-label'>
                completion date
              </label>
            </div>
            <div className='input-container'>
              <input
                type='file'
                id='project_file'
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setSelectedFile(e.target.files[0]);
                }}
              />
              <label htmlFor='project_file'>Upload file</label>
            </div>
            <div className='input-container'>
              <input {...register('notes', { required: false })} id='notes' type='text' />
              <label htmlFor='notes' required className='input-label'>
                Notes
              </label>
            </div>
            <div className='button-container'>
              <button>send</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
