import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from '../../../api/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { Content } from '../../UI/Content.style';
import HeaderForgetPassword from './HeaderForgotPassword';
import { ForgotPasswordStyle } from '../../UI/ForgotPassword';

export default function SendOnTimeCode({ toggle, setForgotPasswordToken, setTimer }) {
  const reRef = useRef();

  const [email, setEmail] = useState('');
  const [err, setErr] = useState('');
  const [isSending, setIsSending] = useState(false);

  const onChangeHandler = (event) => {
    setEmail(event.target.value);
    let regex = /^\w+@[A-z]+\.[A-z]{2,4}/;
    const errMsg = event.target.value.trim().match(regex) ? '' : 'Enter valid email';
    setErr(errMsg);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (err === '') {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();
      setIsSending(true);
      console.log({ email: email, recaptchaToken });
      try {
        const response = await axios.post(
          '/users/forgotPassword',
          { email: email, recaptchaToken },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setForgotPasswordToken(response.data.forgotPasswordToken);
        setIsSending(false);
        setTimer(300)
        toggle();
      } catch (err) {
        console.log('server error', err.response);
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
    }
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
        <HeaderForgetPassword text='One-Time Code Verification' />
        <Input
          label='Your email'
          icon='fa-solid fa-user'
          errMessage={err}
          input={{
            id: 'email',
            type: 'email',
            placeholder: 'Your email',
            onChange: onChangeHandler,
          }}
        />
        <Button text={isSending ? 'Sending...' : 'send code'} width='60%' />
      </ForgotPasswordStyle>
      <ReCAPTCHA sitekey='6Le9MoQmAAAAAEGbLI2EtLp4b5fi6zG_fDM5BEET' size='invisible' ref={reRef} />
      <ToastContainer />
    </Content>
  );
}
