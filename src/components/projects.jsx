import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import Loading from './loading';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProjects = async () => {
    try {
      const response = await axios.get('/ourProjects');
      setIsLoading(false);
      setProjects(response.data);
    } catch (err) {
      setIsLoading(false);
      console.log('server error', err.response.data);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return isLoading ? (
   <Loading/>
  ) : (
    <div id='content' className='projects-container'>
      <div tabIndex='0' className='text-container'>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing .</p>
      </div>
      <div className='projects'>
        {projects.map((project) => {
          return (
            <Link to={'/project/' + project._id} aria-label={'link to' + project.name} key={project._id}>
              <div className='project'>
                <h2>{project.name}</h2>
                <img src={project.main_image} alt={project.name} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;
