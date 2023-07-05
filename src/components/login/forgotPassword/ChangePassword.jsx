import React, { useState } from 'react';
import axios from '../../../api/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Content } from '../../UI/Content.style';
import HeaderForgotPassword from './HeaderForgotPassword';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { ForgotPasswordStyle } from '../../UI/ForgotPassword';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword({ tokenConfirmationCodeVerified }) {
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [err, setErr] = useState({
    password: '',
    confirmPassword: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    let errMsg = inputErrorHandler(name, value);
    setErr({ ...err, [name]: errMsg });
    setFormData({ ...formData, [name]: value });
  };

  function inputErrorHandler(name, value) {
    let errMsg = '';
    if (name === 'password') {
      errMsg = value.length >= 6 ? '' : 'Enter valid password(min 6 digit)';
    } else if (name === 'confirmPassword') {
      errMsg = value === formData.password ? '' : `Password  don't match`;
    }

    return errMsg;
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const isErr = err.password !== '' || err.confirmPassword !== '';
    if (!isErr) {
      try {
        const headers = { Authorization: `Bearer ${tokenConfirmationCodeVerified}` };
        await axios.put('/users/editPassword/oneTimeCode', { password: formData.password }, { headers });
        notify('success', 'Your password has been reset');
        nav('/');
      } catch (err) {
        console.log('server error', err.response);
        if (!err?.response) {
          notify('error', 'No Server Response');
        } else {
          notify('error', 'edit password Failed');
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
        <HeaderForgotPassword text='Enter new password.' />
        <Input
          label='Password'
          icon='fa-solid fa-lock'
          errMessage={err.password}
          input={{
            id: 'password',
            name: 'password',
            type: 'password',
            placeholder: ' ············',
            onChange: onChangeHandler,
          }}
        />
        <Input
          label='Confirm password'
          icon='fa-solid fa-lock'
          errMessage={err.confirmPassword}
          input={{
            id: 'confirmPassword',
            name: 'confirmPassword',
            type: 'password',
            placeholder: ' ············',
            onChange: onChangeHandler,
          }}
        />
        <Button text={'Submit'} width='60%' />
      </ForgotPasswordStyle>

      <ToastContainer />
    </Content>
  );
}
