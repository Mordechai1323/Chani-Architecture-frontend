import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import ReCAPTCHA from 'react-google-recaptcha';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpForm({ setIsRegistered }) {
  const { setAuth } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const reRef = useRef();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const signUp = async (bodyData) => {
    const { passwordConfirm, ...formData } = bodyData;

    formData.recaptchaToken = await reRef.current.executeAsync();
    reRef.current.reset();
    console.log('sent data', formData);

    try {
      const response = await axios.post('/users/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      const { name, role } = response.data.user;
      const { accessToken } = response.data;
      console.log(name, role, accessToken);
      setAuth({
        name,
        role,
        accessToken,
      });
      notify('success', 'success');
      const prevWebPage = location.state?.from?.pathname || '/account';
      nav(prevWebPage, { replace: true });
    } catch (err) {
      serverErrorHandler(err);
    }
  };

  const serverErrorHandler = ({ response }) => {
    console.log(response);
    !response
      ? notify('error', 'No Server Response')
      : response.status === 400
      ? notify('error', 'Missing info')
      : response?.status === 401
      ? notify('error', 'Email already, try login')
      : notify('error', 'Sign up Failed');
  };

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
    <form onSubmit={handleSubmit(signUp)} className='login-container'>
      <div id='content' className='login-center'>
        <div className='header-container'>
          <i className='fa-solid fa-right-to-bracket'></i>
          <h1 className='sr-only'>Page for Sign Up</h1>
        </div>
        <div className='userName-container'>
          <div className='top-container'>
            <label htmlFor='Name'>Name</label>
          </div>
          <div className='down-container'>
            <i className='fa-solid fa-user'></i>
            <input {...register('name', { required: true, minLength: 2 })} id='Name' type='text' placeholder='Name' />
          </div>
          {errors.email && (
            <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
          
              Enter a valid name
            </div>
          )}
        </div>
        <div className='userName-container'>
          <div className='top-container'>
            <label htmlFor='Name'>Email</label>
          </div>
          <div className='down-container'>
            <i className='fa-solid fa-user'></i>
            <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='Email' type='email' placeholder='Email' />
          </div>
          {errors.email && (
            <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
              Enter a valid email
            </div>
          )}
        </div>
        <div className='password-container'>
          <div className='top-container'>
            <label htmlFor='password'>Password</label>
          </div>
          <div className='down-container'>
            <i className='fa-solid fa-lock'></i>
            <input {...register('password', { required: true, minLength: 6 })} id='password' type='password' placeholder=' ············' />
          </div>
          {errors.password && (
            <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
              Enter a valid password (min 6)
            </div>
          )}
        </div>
        <div className='password-container'>
          <div className='top-container'>
            <label htmlFor='passwordConfirm'>Confirm Password</label>
          </div>
          <div className='down-container'>
            <i className='fa-solid fa-lock'></i>
            <input
              {...register('passwordConfirm', { required: true, minLength: 6, validate: (value) => value === watch('password') })}
              id='passwordConfirm'
              type='password'
              placeholder=' ············'
            />
          </div>
          {errors.passwordConfirm && (
            <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
              Passwords do not match
            </div>
          )}
        </div>
        <div className='login-button'>
          <button type="submit">Sign Up</button>
        </div>
        <div className='footer-container'>
          <ul style={{ justifyContent: 'center' }}>
            <li>
              <button onClick={() => setIsRegistered(true)}>Login</button>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
      <ReCAPTCHA sitekey='6Le9MoQmAAAAAEGbLI2EtLp4b5fi6zG_fDM5BEET' size='invisible' ref={reRef} />
    </form>
  );
}
