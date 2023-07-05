import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Content } from '../../UI/Content.style';
import HeaderForgotPassword from './HeaderForgotPassword';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { ForgotPasswordStyle } from '../../UI/ForgotPassword';

export default function VerifyOnTimeCode({
  timer,
  setTimer,
  isCodeSent,
  setIsCodeSent,
  forgotPasswordToken,
  setTokenConfirmationCodeVerified,
  toggle,
}) {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

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

  const onChangeHandler = (event) => {
    setCode(event.target.value);
    if (event.target.value.toString().length >= 6) setErr('');
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (code.toString().length >= 6) {
      try {
        const headers = { Authorization: `Bearer ${forgotPasswordToken}` };
        const response = await axios.post('/users/verifyOneTimeCode', { code }, { headers });
        setTokenConfirmationCodeVerified(response.data.tokenConfirmationCodeVerified);
        console.log(response.data);
        toggle();
      } catch (err) {
        console.log('server error', err.response);
        if (!err?.response) {
          notify('error', 'No Server Response');
        } else if (err.response?.status === 401) {
          notify('error', 'Code does not match');
        } else {
          notify('error', 'Failed');
        }
      }
    } else {
      setErr('Enter valid code (6 digit)');
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

  return (
    <Content>
      <ForgotPasswordStyle onSubmit={onSubmitHandler}>
        <HeaderForgotPassword text='A one-time code has been sent to your email.' />
        <Input
          label='One time code'
          icon='fa-solid fa-lock'
          errMessage={err}
          input={{
            id: 'code',
            type: 'number',
            placeholder: 'One time code',
            onChange: onChangeHandler,
          }}
        />
        <Button text={'Verify'} width='60%' />
        <h6>The code will expire in {reverseSecondsToMinutes(timer)} seconds.</h6>
        <h6>Please wait until the timer finishes before requesting a new code.</h6>
      </ForgotPasswordStyle>

      <ToastContainer />
    </Content>
  );
}
