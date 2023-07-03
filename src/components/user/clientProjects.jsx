import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../loading';
import { styled } from 'styled-components';

export default function ClientProjects() {
  const axiosPrivate = useAxiosPrivate();

  const controller = new AbortController();

  const [myProjects, setMyProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getMyProject = async () => {
    try {
      const response = await axiosPrivate.get(`/projects/`, {
        signal: controller.signal,
      });
      setMyProjects(response.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response);
      !err.response ? notify('error', 'No Server Response') : err.response.status === 400 ? notify('error', 'Project not found') : notify('error', 'Something bad happened');
    }
  };

  useEffect(() => {
    getMyProject();
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
    <ClientProjectsStyle>
      <div className='client-projects-center'>
        <div className='top-container'>
          <h2>My projects</h2>
        </div>
        <div className='main-container'>
          <table>
            <thead>
              <tr>
                <th>project number</th>
                <th>project name</th>
              </tr>
            </thead>
            <tbody>
              {myProjects.map((project) => (
                <Link to={`/project-details/${project._id}`} key={project}>
                  <tr key={project._id}>
                    <td>{project.project_number}</td>
                    <td>{project.project_name}</td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </ClientProjectsStyle>
  );
}

const ClientProjectsStyle = styled.div`
  background-color: #3e3e3e;
  min-height: 850px;
  display: flex;
  align-items: center;
  justify-content: center;
  .client-projects-center {
    width: 80%;
    min-height: 650px;
    background-color: #eaeaeb;
    border-radius: 4vw;
    font-family: 'Noto Sans Mono', monospace;
    .top-container {
      width: 100%;
      height: 150%;
      text-align: center;
      margin-top: 16px;
    }
    .main-container {
      height: 80%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      table {
        width: 80%;
        thead {
          tr {
            display: flex;
            th {
              &:nth-child(1) {
                margin-left: 34px;
              }
              width: 20%;
            }
          }
        }
        tbody {
          a {
            color: black;
            text-decoration: none;
            tr {
              height: 42px;
              display: flex;
              border: 1px solid #3e3e3e;
              border-radius: 4vw;
              align-items: center;
              margin: 12px 0px;
              padding: 8px;
              td {
                &:nth-child(1) {
                  margin-left: 34px;
                }
                width: 20%;
              }
            }
          }
        }
      }
    }
  }
`;
