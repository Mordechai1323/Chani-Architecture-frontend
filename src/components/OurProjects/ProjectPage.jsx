import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../api/axios';
import Loading from '../loading';
import { styled } from 'styled-components';

export default function ProjectPage() {
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
    <Loading />
  ) : (
    <ProjectStyle>
      <div className='top-project-container'>
        <div className='left-container'>
          <button onClick={minus}>
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
    </ProjectStyle>
  );
}

const ProjectStyle = styled.div`
  width: 100%;
  min-height: 320px;
  background: #3e3e3e;

  & .top-project-container {
    min-height: 240px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 24px;

    & .left-container {
      width: 7%;
      height: 7%;
      display: flex;
      align-items: center;
      justify-content: center;

      & button {
        border: none;
        background: none;
        color: white;
      }
    }

    & .img-container {
      width: 75%;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    & .right-container {
      width: 7%;
      height: 7%;
      display: flex;
      align-items: center;
      justify-content: center;

      & button {
        border: none;
        background: none;
        color: white;
      }
    }
  }

  & .text-container {
    width: 100%;
    min-height: 296px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & h4 {
      font-family: 'Montserrat', sans-serif;
      color: white;
    }

    & p {
      font-family: 'Montserrat', sans-serif;
      color: white;
      text-align: center;
      margin: 0;
      padding: 8px;
    }
  }

  @media (min-width: 550px) {
    min-height: 550px;

    & .top-project-container {
      height: 30vw;

      & .img-container {
        width: 40vw;
        height: 25vw;

        & img {
          width: 40vw;
          height: 25vw;
        }
      }
    }

    & .text-container {
      height: 20vw;

      & h4 {
        font-size: 3vw;
        font-weight: bold;
      }

      & p {
        height: 15vw;
        width: 60vw;
        font-size: 1.5vw;
      }
    }
  }

  @media (min-width: 1300px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    & .top-project-container {
      width: 80%;
      & .left-container .right-container {
        width: 5%;
      }
      & .img-container {
        width: 50%;
        & img {
          height: 90%;
        }
      }
    }
  }
`;
