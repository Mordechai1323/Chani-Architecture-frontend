import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectsTable from './projectsTable';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './header';
import Loading from '../../loading';

export default function ProjectsManagement() {
  const axiosPrivate = useAxiosPrivate();
  const nav = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const controller = new AbortController();


  const getProjects = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/myProjects`, {
        signal: controller.signal,
      });

      setProjects((prev) => {
        return response.data.map((project, i) => {
          return { ...project, isOpen: prev?.[i]?.isOpen || false };
        });
      });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      nav('/login', { state: { from: location }, replace: true });
    }
  };

  useEffect(() => {
    getProjects();
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
    <div className='projectsManagement-container'>
      <div className='center-container'>
        <Header />
        <div className='main-container'>
          <ProjectsTable projects={projects} setProjects={setProjects} getProjects={getProjects}  notify={notify} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
