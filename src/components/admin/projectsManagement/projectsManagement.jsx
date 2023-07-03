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
      & .table-projects {
        width: 100%;
        & .thead-projects {
          & tr {
            margin: 0;
            width: 100%;
            display: flex;
            justify-content: space-evenly;
            font-size: 0.5em;
            & th {
              width: 15%;
              &:nth-child(1) {
                width: 3%;
              }
              &:nth-child(6) {
                width: 5%;
              }
              &:nth-child(7) {
                width: 5%;
              }
              &:nth-child(8) {
                width: 5%;
              }
            }
          }
        }

        & tbody {
          & .tr-project {
            height: 32px;
            width: 90%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            background: #3e3e3e;
            border-radius: 2vw;
            color: #eaeaeb;
            margin: 2px 0px;
            font-size: 0.5em;
            & td {
              width: 18%;
              padding: 0px 8px;
              &:nth-child(1) {
                width: 3%;
                cursor: pointer;
              }
              &:nth-child(6) {
                width: 5%;
                color: red;
                cursor: pointer;
              }
              &:nth-child(7) {
                width: 5%;
                & a {
                  text-decoration: none;
                  color: #eaeaeb;
                }
              }
              &:nth-child(8) {
                width: 5%;
                a {
                  text-decoration: none;
                  color: #eaeaeb;
                }
              }
            }
          }

          & .table-tasks {
            width: 80%;
            min-height: 25px;
            margin: 8px 0px 22px 48px;
            & .head-tasks {
              width: 100%;
              & tr {
                display: flex;
                justify-content: space-between;
                font-size: 0.75em;
                & th {
                  width: 80%;
                  padding: 0px 8px;
                  &:nth-child(2) {
                    width: 30%;
                  }
                  &:nth-child(3) {
                    width: 8%;
                  }
                }
              }
            }

            & tbody {
              width: 100%;
              & .tr-task {
                min-height: 32px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: #3e3e3e;
                border-radius: 4vw;
                color: #eaeaeb;
                margin: 2px 0px;
                font-size: 0.75em;
                & td {
                  width: 80%;
                  padding: 0px 8px;
                  &:nth-child(2) {
                    width: 30%;
                  }
                  &:nth-child(3) {
                    width: 8%;
                    color: red;
                  }
                }
              }
            }

            & .add-task {
              height: 32px;
              width: 50%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: #3e3e3e;
              border-radius: 2vw;
              color: #eaeaeb;
              margin: 2px 0px;
              & td {
                width: 100%;
                padding: 0px 8px;
                &:nth-child(1) {
                  width: 3%;
                }
                & input {
                  width: 100%;
                  border: none;
                  background: #3e3e3e;
                  color: #17da4b;
                  outline: none;
                  font-weight: bold;
                }
              }
            }
          }

          & .status-select {
            appearance: none;
            -webkit-appearance: none;
            background: none;
            border: none;
            border-radius: 8px;
            width: 70%;
            text-align: center;
            cursor: pointer;
            color: white;
            & option {
              appearance: none;
              -webkit-appearance: none;
              border-radius: 12px;
              border: none;
              background: none;
              &:hover {
                background: none;
              }
            }
          }
        }
      }
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
      & .main-container {
        & .table-projects {
          width: 90%;
          & .thead-projects {
            & tr {
              width: 90%;
              font-size: 1em;
              & th {
                width: 18%;
              }
            }
          }

          & tbody {
            & .tr-project {
              font-size: 1em;
              & td {
                width: 18%;
              }
            }

            & .table-tasks {
              width: 60%;
              & .head-tasks {
                & tr {
                  font-size: 1em;
                }
              }
              & tbody {
                & .tr-task {
                  font-size: 1em;
                }
              }
              & .add-task {
                font-size: 1em;
              }
            }
          }
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
      & .main-container {
        & .table-projects {
          & .thead-projects {
            & tr {
              font-size: 1.1em;
            }
          }
          & tbody {
            & .tr-project {
              font-size: 1.1em;
            }
            & .table-tasks {
              & .head-tasks {
                & tr {
                  font-size: 1.1em;
                }
              }
              & .add-task {
                font-size: 1.1em;
              }
            }
          }
        }
      }
    }
  }
`;
