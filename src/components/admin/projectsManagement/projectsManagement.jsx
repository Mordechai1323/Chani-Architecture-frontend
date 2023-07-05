import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivet';
import { useLocation, useNavigate } from 'react-router-dom';
import ProjectsTable from './projectsTable';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './header';
import Loading from '../../loading';
import { styled } from 'styled-components';

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
    <Loading />
  ) : (
    <ProjectManagementStyle>
      <div className='center-container'>
        <Header />
        <div className='main-container'>
          <ProjectsTable projects={projects} setProjects={setProjects} getProjects={getProjects} notify={notify} />
        </div>
      </div>
      <ToastContainer />
    </ProjectManagementStyle>
  );
}

const ProjectManagementStyle = styled.div`
  background-color: #3e3e3e;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .center-container {
    width: 100%;
    min-height: 450px;
    background-color: #eaeaeb;
    border-radius: 4vw;
    font-family: 'Noto Sans Mono', monospace;
    & .top-container {
      height: 10%;
      width: 100%;
      text-align: center;
      margin: 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      & h1 {
        width: 90%;
        padding-left: 32px;
        font-size: 1em;
        font-weight: bold;
      }
      & i {
        width: 10%;
        font-size: 1em;
        text-decoration: none;
        color: #3e3e3e;
      }
    }
    & .main-container {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (min-width: 550px) {
    background-color: #3e3e3e;
    min-height: 500px;
    & .center-container {
      width: 80%;
      min-height: 450px;
      & .top-container {
        & h1 {
          padding-left: 42px;
          font-size: 1.5em;
        }
        & i {
          font-size: 1.5em;
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .center-container {
      min-height: 700px;
      & .top-container {
        & h1 {
          padding-left: 152px;
        }
        i {
          font-size: 1.75em;
        }
      }
    }
  }
`;
