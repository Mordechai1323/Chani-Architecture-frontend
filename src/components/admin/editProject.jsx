import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditProject() {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const { projectID } = useParams();

  const [selectedFile, setSelectedFile] = useState();
  const [project, setProject] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');

  const controller = new AbortController();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getProject = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/project/${projectID}`, {
        signal: controller.signal,
      });
      setProject(response.data);
      setDate(response.data.completion_date?.substring(0, 10));
      setIsLoading(false);
      console.log(response.data);
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
    console.log('sent image');
    try {
      const response = await axiosPrivate.post(`/projects/${urlFile}`, formData, {
        signal: controller.signal,
      });
      if (response.data.modifiedCount === 1) {
        nav('/projectsManagement');
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const onSubmit = async (bodyData) => {
    let updatedData = {};

    for (const key in bodyData) {
      if (key === 'completion_date' && bodyData[key] !== project.completion_date.substring(0, 10)) {
        updatedData[key] = bodyData[key];
      } else if (bodyData[key] !== '' && key !== 'completion_date') {
        updatedData[key] = bodyData[key];
      } else {
        updatedData[key] = project[key];
      }
    }

    try {
      const response = await axiosPrivate.put(`/projects/${projectID}`, updatedData, {
        signal: controller.signal,
      });
      console.log(response.data);
      const urlFile = project.file ? `editFile/${project._id}` : `uploadFile/${project._id}`;
      sendFileToServer(urlFile);
      if (response.data.modifiedCount === 1) {
        nav('/projectsManagement');
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
    <div className='add-project-container'>
      <div className='add-project-center'>
        <div className='top-container'>
          <h1>Edit project</h1>
        </div>
        <div className='main-container'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='input-container'>
              <input {...register('project_number', { required: false })} id='project_number' type='number' placeholder={project.project_number} />
              <label htmlFor='project_number'>Project number</label>
              {errors.project_number && (
                <div tabIndex='0' className='text-danger font-weight-bold d-block'>
                  Enter valid number(min 1 digit)
                </div>
              )}
            </div>
            <div className='input-container'>
              <input {...register('project_name', { required: false, minLength: 2 })} id='project_name' type='text' placeholder={project.project_name} />
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
              <input
                {...register('client_email', { required: false, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                id='client_email'
                type='email'
                placeholder={project.client_email}
              />
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
              <input {...register('completion_date')} id='completion_date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
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
              <label htmlFor='project_file'>{project.file ? 'Update file' : 'Upload file'}</label>
            </div>
            <div className='input-container'>
              <input {...register('notes', { required: false })} id='notes' type='text' value={project.notes} onChange={(e) => setProject({ ...project, notes: e.target.value })} />
              <label htmlFor='notes' required className='input-label'>
                Notes
              </label>
            </div>
            <div className='button-container'>
              <button>Update</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
