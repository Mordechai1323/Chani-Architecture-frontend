import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import Loading from '.././loading';
import { styled } from 'styled-components';
import Header from './Header';
import ProjectsList from './ProjectsList';

function OurProjects() {
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
    <Loading />
  ) : (
    <OurProjectsStyle id='content'>
      <Header />
      <ProjectsList projects={projects} />
    </OurProjectsStyle>
  );
}

export default OurProjects;

const OurProjectsStyle = styled.div`
  width: 100%;
  min-height: 800px;
  background: #3e3e3e;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
