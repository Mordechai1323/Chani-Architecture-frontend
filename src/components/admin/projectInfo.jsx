import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api/axios';

export default function ProjectInfo() {
  const axiosPrivate = useAxiosPrivate();
  const { projectID } = useParams();

  const controller = new AbortController();

  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [projectStatus, setProjectStatus] = useState('');

  const getProject = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/project/${projectID}`, {
        signal: controller.signal,
      });
      setProject(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return isLoading ? (
    <img src='https://plaidphotography.com/images/edmontonskylineloading.gif' width='100%' height='100%' />
  ) : (
    <div className='account-container'>
      <div className='account-center'>
        <div className='top-container'>
          <h1>project</h1>
        </div>
        <div className='main-container'>
          <div className='left-container'>
            <div className='info-container'>
              <h4>
                <b>project number:</b> {project.project_number}
              </h4>
            </div>
            <div className='info-container'>
              <h4>
                <b>project name:</b> {project.project_name}
              </h4>
            </div>
            <div className='info-container'>
              <h4>
                <b>client email:</b> {project.client_email ? project.client_email : ' -'}
              </h4>
            </div>
            <div className='info-container'>
              <h4>
                <b>notes:</b>
                {project.notes ? project.notes : ' -'}
              </h4>
            </div>
          </div>
          <div className='right-container'>
            <div className='files-container-info'>
              <div className='top-files-container'>
                <h2>files</h2>
              </div>
              {project.file ? (
                <div className='files-container'>
                  <a href={BASE_URL + '/' + project.file} target='_blank'>
                    {project.file.substring(20)}
                  </a>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
