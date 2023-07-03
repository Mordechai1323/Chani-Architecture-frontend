import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from 'styled-components';

export default function LogIn({ setIsRegistered }) {
  const { setAuth, persist, setPersist } = useAuth();
  const nav = useNavigate();
  const location = useLocation();

  const reRef = useRef();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  const login = async (bodyData) => {
    bodyData.recaptchaToken = await reRef.current.executeAsync();
    reRef.current.reset();
    console.log(bodyData);
    try {
      const response = await axios.post('/users/login', bodyData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setAuth({
        name: response?.data?.name,
        role: response?.data?.role,
        accessToken: response?.data?.accessToken,
      });

      const prevWebPage = location.state?.from?.pathname || '/';
      nav(prevWebPage, { replace: true });
    } catch (err) {
      serverErrorHandler(err);
    }
  };

  function serverErrorHandler({ response }) {
    console.log('server error', response);
    const errMsg = !response?.status
      ? 'No Server Response'
      : response.status === 400
      ? 'Missing Email or Password'
      : response.status === 401
      ? 'Email or Password not much'
      : 'Login Failed';
    notify('error', errMsg);
  }

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

  return (
    <LoginFormStyle onSubmit={handleSubmit(login)}>
      <div id='content' className='login-center'>
        <div className='header-container'>
          <i className='fa-solid fa-right-to-bracket'></i>
          <h1 className='sr-only'>page for login</h1>
        </div>
        <div className='userName-container'>
          <div className='top-container'>
            <label htmlFor='User name'>User name</label>
          </div>
          <div className='down-container'>
            <i className='fa-solid fa-user'></i>
            {/* <input id='User name' type='text' placeholder='User name' onChange={(e)=> setEmail(e.target.value)}/> */}
            <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='User name' type='text' placeholder='User name' />
          </div>
          {errors.email && (
            <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
              Enter valid email
            </div>
          )}
        </div>
        <div className='password-container'>
          <div className='top-container'>
            <label htmlFor='password'>password</label>
          </div>
          <div className='down-container'>
            <i className='fa-solid fa-lock'></i>

            {/* <input  onChange={(e)=> setPassword(e.target.value)}/> */}
            <input {...register('password', { required: true, minLength: 6 })} id='password' type='password' placeholder=' ············' />
          </div>
          {errors.password && (
            <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
              {' '}
              Enter valid password(min 6)
            </div>
          )}
        </div>

        <div className='login-button'>
          <button>login</button>
        </div>
        <div style={{ display: 'flex', width: '80%', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
          <label htmlFor='persist'>Trust this Device </label>
          <input style={{ margin: '14px 8px' }} type='checkbox' id='persist' defaultChecked={persist} onChange={() => setPersist((prev) => !prev)} />
        </div>
        <div className='footer-container'>
          <ul>
            <li>
              <button onClick={() => setIsRegistered(false)}>sign up</button>
            </li>
            <li>
              <Link to='/forgetPassword'>Forgot password?</Link>
            </li>
          </ul>
        </div>
      </div>
      <ReCAPTCHA sitekey='6Le9MoQmAAAAAEGbLI2EtLp4b5fi6zG_fDM5BEET' size='invisible' ref={reRef} />
      <ToastContainer />
    </LoginFormStyle>
  );
}

const LoginFormStyle = styled.form`
  width: 100%;
  min-height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3e3e3e;

  & .login-center {
    width: 70%;
    max-width: 350px;
    min-height: 500px;
    background-color: #eaeaeb;
    border-radius: 38px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;

    & .header-container {
      height: 25%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      & i {
        font-size: 3.5em;
      }
    }

    & .userName-container {
      margin-top: 18px;
      width: 55%;

      & .top-container {
        & label {
          font-size: 1.5em;
          margin: 0;
          font-weight: bold;
        }
      }

      & .down-container {
        display: flex;
        align-items: center;

        & input {
          width: 100%;
          border: none;
          outline: none;
          margin-left: 8px;
          background: #eaeaeb;
          border-radius: 12px;
          font-weight: bold;
        }
      }
    }

    & .password-container {
      width: 55%;

      & .top-container {
        & label {
          font-size: 1.5em;
          margin: 0;
          font-weight: bold;
        }
      }

      & .down-container {
        display: flex;
        align-items: center;

        & input {
          width: 100%;
          border: none;
          outline: none;
          margin-left: 8px;
          background: #eaeaeb;
          border-radius: 12px;
          font-weight: bold;
        }
      }
    }

    & .login-button {
      margin-top: 16px;
      width: 60%;

      & button {
        width: 100%;
        height: 36px;
        background-color: #3e3e3e;
        color: white;
        border-radius: 32px;
        border: none;
      }
    }

    & .footer-container {
      width: 80%;
      min-height: 64px;

      & ul {
        list-style: none;
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin: 0;
        font-family: 'Montserrat', sans-serif;

        & button {
          border: none;
          background: none;
          font-weight: bold;
          font-size: 0.7em;
        }
        & a {
          text-decoration: none;
          font-weight: bold;
          font-size: 0.7em;
          color: #3e3e3e;
        }
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 850px;
    & .login-center {
      max-width: 400px;
      min-height: 590px;
      & .header-container {
        height: 88px;
      }
    }
  }
`;
