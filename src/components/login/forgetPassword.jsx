import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import axios from '../../api/axios';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from 'styled-components';

export default function ForgetPassword({ setIsRegistered }) {
  const reRef = useRef();
  const nav = useNavigate();

  const [code, setCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [forgotPasswordToken, setForgotPasswordToken] = useState('');
  const [tokenConfirmationCodeVerified, setTokenConfirmationCodeVerified] = useState('');
  const [isVerify, setIsVerify] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleSendCode = async (bodyData) => {
    const recaptchaToken = await reRef.current.executeAsync();
    reRef.current.reset();
    setIsSending(true);
    console.log({ email: bodyData.email, recaptchaToken });
    try {
      const response = await axios.post(
        '/users/forgotPassword',
        { email: bodyData.email, recaptchaToken },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      // console.log(response.data);
      setForgotPasswordToken(response.data.forgotPasswordToken);
      setIsSending(false);
      setIsCodeSent(true);
      setTimer(300);
    } catch (err) {
      if (!err?.response) {
        notify('error', 'No Server Response');
      } else if (err.response?.status === 400) {
        notify('error', 'Missing Email');
      } else if (err.response?.status === 401) {
        notify('error', 'Email not found');
      } else {
        notify('error', 'Login Failed');
      }
    }
  };

  useEffect(() => {
    let interval = null;
    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCodeSent(false);
    }
    return () => clearInterval(interval);
  }, [isCodeSent, timer]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const headers = { Authorization: `Bearer ${forgotPasswordToken}` };
      const response = await axios.post('/users/verifyOneTimeCode', { code }, { headers });
      setTokenConfirmationCodeVerified(response.data.tokenConfirmationCodeVerified);
      setIsVerify(true);
    } catch (err) {
      if (!err?.response) {
        notify('error', 'No Server Response');
      } else if (err.response?.status === 401) {
        notify('error', 'Code does not match');
      } else {
        notify('error', 'Failed');
      }
    }
  };

  const changePassword = async (bodyData) => {
    try {
      const headers = { Authorization: `Bearer ${tokenConfirmationCodeVerified}` };
      console.log(headers);
      await axios.put('/users/editPassword/oneTimeCode', { password: bodyData.password }, { headers });
      notify('success', 'Your password has been reset');
      nav('/');
    } catch (err) {
      if (!err?.response) {
        notify('error', 'No Server Response');
      } else {
        notify('error', 'edit password Failed');
      }
    }
  };

  const reverseSecondsToMinutes = (seconds) => {
    return '0' + Math.floor(seconds / 60) + ':' + (seconds % 60 < 10 ? '0' : '') + (seconds % 60).toString();
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

  return !isVerify ? (
    <ForgetPasswordStyle onSubmit={handleSubmit(handleSendCode)}>
      {!isCodeSent && (
        <div className='forget-password-center'>
          <div className='header-container'>
            <h1 className='sr-only'>page for forget password</h1>
            <h2>One-Time Code Verification</h2>
          </div>
          <div className='email-container'>
            <div className='top-container'>
              <label htmlFor='email'>Enter your email</label>
            </div>
            <div className='down-container'>
              <i className='fa-solid fa-user'></i>
              <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='email' type='email' placeholder='Email' />
            </div>
            {errors.email && (
              <div tabIndex='0' className='text-danger d-block' style={{ fontWeight: 'bold' }}>
                Enter valid email
              </div>
            )}
          </div>
          <div className='forget-password-button'>
            <button>{isSending ? 'Sending...' : 'send code'}</button>
          </div>
          <ReCAPTCHA sitekey='6Le9MoQmAAAAAEGbLI2EtLp4b5fi6zG_fDM5BEET' size='invisible' ref={reRef} />
          <ToastContainer />
        </div>
      )}

      {isCodeSent && (
        <div className='forget-password-center'>
          <div className='header-container'>
            <h2>A one-time code has been sent to your email.</h2>
          </div>
          <div className='email-container'>
            <div className='top-container'>
              <label htmlFor='email'>One time code</label>
            </div>
            <div className='down-container'>
              <i className='fa-solid fa-lock'></i>
              <input
                id='code'
                type='number'
                placeholder='Code'
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              />
            </div>
          </div>
          <div className='forget-password-button'>
            <button onClick={handleVerifyCode}>Verify Code</button>
          </div>
          <h6 style={{ fontWeight: 'bold' }}>The code will expire in {reverseSecondsToMinutes(timer)} seconds.</h6>
          <h6 style={{ fontSize: '0.75em', fontWeight: 'bold' }}>Please wait until the timer finishes before requesting a new code.</h6>
          <ToastContainer />
        </div>
      )}
    </ForgetPasswordStyle>
  ) : (
    <ForgetPasswordStyle onSubmit={handleSubmit(changePassword)}>
      <div className='forget-password-center'>
        <div className='header-container'>
          <h2>Enter new password</h2>
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
        <div className='forget-password-button'>
          <button>submit</button>
        </div>
        <ToastContainer />
      </div>
    </ForgetPasswordStyle>
  );
}

const ForgetPasswordStyle = styled.form`
  width: 100%;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3e3e3e;

  & .forget-password-center {
    width: 70%;
    max-width: 300px;
    min-height: 400px;
    background-color: #eaeaeb;
    border-radius: 38px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    text-align: center;

    & .header-container {
      height: 25%;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;

      & h2 {
        font-size: 1.25em;
        font-weight: bold;
      }
    }

    & .email-container {
      width: 70%;
      & .top-container {
        & label {
          font-size: 1em;
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

        & input::-webkit-outer-spin-button,
        & input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }

    & .password-container {
      width: 60%;

      & .top-container {
        & label {
          font-size: 1.25em;
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

    & .forget-password-button {
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
  }

  @media (min-width: 1300px) {
    min-height: 850px;

    & .forget-password-center {
      max-width: 380px;
      min-height: 500px;
    }
  }
`;
