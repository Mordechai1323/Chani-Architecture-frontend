import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../api/axios';

function Project() {
  const { projectID } = useParams();
  const [count, setCount] = useState(0);
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getProject = async () => {
    try {
      const response = await axios.get(`/ourProjects/${projectID}`);
      setIsLoading(false);
      setProject(response.data);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response.data);
    }
  };

  useEffect(() => {
    getProject();
    // const myInterval = setInterval(() => plus(),1000);
    // return function cleanup() {
    //   clearInterval(myInterval);
    // };
  }, []);

  console.log('count: ', count, 'length: ', project?.images?.length);
  const plus = () => {
    setCount((prev) => (prev + 1) % project?.images?.length);
  };

  const minus = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    } else setCount(project?.images?.length - 1);
  };

  return isLoading ? (
    <img src='https://plaidphotography.com/images/edmontonskylineloading.gif' width='100%' height='100%' />
  ) : (
    <div className='project-container'>
      <div className='top-project-container'>
        <div className='left-container'>
          <button onClick={  minus}>
            <i className='fa-solid fa-arrow-left'></i>
          </button>
        </div>

        <div className='img-container'>
          <img src={project.images[count]} alt='' />
        </div>
        <div className='right-container'>
          <button onClick={plus}>
            <i className='fa-solid fa-arrow-right'></i>
          </button>
        </div>
      </div>
      <div className='text-container'>
        <h4>
          about : {project.name} {count}
        </h4>
        <p>{project.info}</p>
      </div>
    </div>
  );
}

export default Project;
