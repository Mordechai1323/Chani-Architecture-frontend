import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../api/axios';
import Loading from '../loading';
import { styled } from 'styled-components';

export default function ClientProject() {
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
    <Loading />
  ) : (
    <ProjectStyle>
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
                  <a href={BASE_URL + '/' + myProject.file} target='_blank' rel='noopener noreferrer'>
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
    </ProjectStyle>
  );
}

export const ProjectStyle = styled.div`
  background-color: #3e3e3e;
  min-height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .account-center {
    background-color: #eaeaeb;
    width: 80vw;
    height: 75vh;
    border-radius: 4vw;
    font-family: 'Noto Sans Mono', monospace;
    & .top-container {
      width: 100%;
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      & h1 {
        text-align: center;
        width: 90%;
        padding-left: 102px;
      }
      & i {
        width: 10%;
        font-size: 1.5em;
        text-decoration: none;
        color: #3e3e3e;
        cursor: pointer;
      }
    }
    & .main-container {
      height: 90%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      & .left-container {
        width: 100%;
        height: 50%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        & .info-container {
          width: 80%;
          height: 68px;
          align-items: center;
          & h4 {
            font-size: 1em;
          }
        }
      }
      & .right-container {
        height: 50%;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        & .files-container {
          width: 60%;
          height: 50%;
          & .top-files-container {
            height: 25%;
            text-align: center;
          }
          & .files-container {
            height: 90%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            & a {
              text-decoration: none;
              min-width: 80%;
              min-height: 25%;
              border-radius: 4vw;
              background-color: #3e3e3e;
              color: #eaeaeb;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        & .files-container-info {
          width: 60%;
          height: 100%;
          & .top-files-container {
            height: 25%;
            text-align: center;
          }
          & .files-container {
            height: 90%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            & a {
              text-decoration: none;
              min-width: 80%;
              height: 15%;
              border-radius: 4vw;
              background-color: #3e3e3e;
              color: #eaeaeb;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
        }
        & .upload-files-container {
          width: 60%;
          height: 50%;
          & .top-upload-files-container {
            height: 15%;
            text-align: center;
          }
          & .upload-files-container {
            height: 90%;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            & .upload-file-container {
              cursor: pointer;
              position: relative;
              overflow: hidden;
              display: inline-block;
              width: 80%;
              height: 25%;
              border-radius: 4vw;
              background-color: #3e3e3e;
              color: #eaeaeb;
              display: flex;
              justify-content: center;
              align-items: center;
              & input {
                position: absolute;
                font-size: 100px;
                opacity: 0;
                right: 0;
                top: 0;
                &:hover {
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: 550px) {
    min-height: 500px;
    & .account-center {
      width: 60vw;
      height: 75vh;
      & .main-container {
        height: 80%;
        & .left-container {
          width: 65%;
          & .info-container {
            width: 80%;
            height: 68px;
            & h4 {
              font-size: 1.25em;
            }
          }
        }
        & .right-container {
          height: 100%;
          width: 35%;
          & .files-container {
            width: 60%;
            height: 50%;
            & .top-files-container {
              height: 25%;
              text-align: center;
            }
            & .files-container {
              height: 90%;
              width: 100%;
              & a {
                min-width: 80%;
                min-height: 25%;
              }
            }
          }
          & .files-container-info {
            width: 60%;
            height: 100%;
            & .top-files-container {
              height: 25%;
            }
            & .files-container {
              height: 90%;
              width: 100%;
              & a {
                min-width: 80%;
                height: 15%;
              }
            }
          }
          & .upload-files-container {
            width: 60%;
            height: 50%;
            & .top-upload-files-container {
              height: 15%;
            }
            & .upload-files-container {
              height: 90%;
              width: 100%;
              & .upload-file-container {
                cursor: pointer;
                width: 80%;
                height: 25%;
                & input {
                  position: absolute;
                  font-size: 100px;
                  &:hover {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .account-center {
      width: 55vw;
      height: 65vh;
    }
  }
`;
