import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loading from '../../loading';
import Info from './info';
import File from './file';
import { ProjectStyle } from '../../user/clientProject';

export default function ProjectInfo() {
  const axiosPrivate = useAxiosPrivate();
  const { projectID } = useParams();
  const controller = new AbortController();

  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
      notify('error', 'Something bad happened, Try again');
    }
  };

  useEffect(() => {
    getProject();
  },[]);

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
    <ProjectStyle>
      <div className='account-center'>
        <div className='top-container'>
          <h1>project</h1>
        </div>
        <div className='main-container'>
          <div className='left-container'>
            <Info text={'project number'} data={project?.project_number} />
            <Info text={'project name'} data={project?.project_name} />
            <Info text={'Client email'} data={project?.client_email ? project?.client_email : ' -'} />
            <Info text={'Notes'} data={project?.notes ? project?.notes : ' -'} />
          </div>
          <div className='right-container'>
            <div className='files-container-info'>
              <div className='top-files-container'>
                <h2>files</h2>
              </div>
              {project.file ? <File src={project?.file} fileName={project?.file} /> : ''}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </ProjectStyle>
  );
}
