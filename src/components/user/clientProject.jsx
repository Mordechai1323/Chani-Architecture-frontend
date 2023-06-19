import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api/axios';

export default function ClientProject({ project }) {
  const axiosPrivate = useAxiosPrivate();
  const { projectID } = useParams();

  const controller = new AbortController();

  const [myProject, setMyProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [projectStatus, setProjectStatus] = useState('');

  const getProject = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/project/${projectID}`, {
        signal: controller.signal,
      });
      setMyProject(response.data);
      setIsLoading(false);
      getProjectStatus(response.data.status.name);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response);
      notify('error', 'Something bad happened');
    }
  };

  const getProjectStatus = (statusName) => {
    statusName === ''
      ? setProjectStatus('Not Started')
      : statusName === 'Working on it'
      ? setProjectStatus('In Progress')
      : statusName === 'stuck'
      ? setProjectStatus('Stuck')
      : myProject.status.name === 'Done'
      ? setProjectStatus('Done')
      : setProjectStatus('');
  };

  useEffect(() => {
    getProject();
  }, []);

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
    <div className='account-container'>
      <div className='account-center'>
        <div className='top-container'>
          <h1>My Project</h1>
        </div>
        <div className='main-container'>
          <div className='left-container'>
            <div className='info-container'>
              <h4>project number: {myProject.project_number}</h4>
            </div>
            <div className='info-container'>
              <h4>project name: {myProject.project_name}</h4>
            </div>
            <div className='info-container'>
              <h4>project status: {projectStatus}</h4>
            </div>
            <div className='info-container'>
              <h4>notes: {myProject.notes ? myProject.notes : ''}</h4>
            </div>
          </div>
          <div className='right-container'>
            <div className='files-container'>
              <div className='top-files-container'>
                <h2>files</h2>
              </div>
              {myProject.file ? (
                <div className='files-container'>
                  <a href={BASE_URL + '/' + myProject.file} target='_blank'>
                    {myProject.file.substring(20)}
                  </a>
                </div>
              ) : (
                <div className='files-container'>
                  <h6>-</h6>
                </div>
              )}
            </div>

            <div className='upload-files-container'>
              <div className='top-upload-files-container'>
                <h2>upload files</h2>
              </div>
              <div className='upload-files-container'>
                <div className='upload-file-container'>
                  upload file
                  <input type='file' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
