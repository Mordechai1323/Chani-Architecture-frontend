import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivet';
import { Link } from 'react-router-dom';
import ClientProject from './clientProject';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      !err.response
      ? notify('error', 'No Server Response')
      : err.response.status === 400
      ? notify('error', 'Project not found')
      : notify('error', 'Something bad happened');
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
    <img src='https://plaidphotography.com/images/edmontonskylineloading.gif' width='100%' height='100%' />
  ) : (
    <div className='client-projects'>
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
                <Link to={`/project-details/${project._id}`}>
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
    </div>
  );
}
