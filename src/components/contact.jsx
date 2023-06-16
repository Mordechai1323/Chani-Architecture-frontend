import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Contact() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSub = (bodyData) => {
    console.log(bodyData);
  };
  return (
    <div className='contact-container'>
      <h1 className='sr-only'>page for contact</h1>
      <div className='contact-center'>
        <div className='top-contact-center'>
          <div className='left-container'>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className='right-container'>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
        <div id='content' className='down-contact-center'>
          <div className='left-container'>
            <div className='top-left-container ' tabIndex='0'>
              <h2>contact</h2>
              <h2>us</h2>
              <div className='line'></div>
            </div>
            <div className='down-left-container' tabIndex='0'>
              <h3>contact info: +972 533 410 494</h3>
            </div>
          </div>
          <div className='right-container'>
            <form onSubmit={handleSubmit(onSub)} action='' role='form'>
              <label className='sr-only' htmlFor='name'>
                Name
              </label>
              <input {...register('name', { required: true, minLength: 2 })} id='name' type='text' placeholder='Name' />
              {errors.name && (
                <div tabIndex='0' className='text-danger font-weight-bold d-block'>
                  {' '}
                  Enter valid name(min 2 chars)
                </div>
              )}
              <label className='sr-only' htmlFor='number'>
                Phone number
              </label>
              <input {...register('phone', { required: true, minLength: 9 })} id='number' type='tel' placeholder='Number' />
              {errors.phone && (
                <div tabIndex='0' className='text-danger d-block'>
                  {' '}
                  Enter valid phone(min 9 chars){' '}
                </div>
              )}
              <label className='sr-only' htmlFor='email'>
                Email
              </label>
              <input {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} id='email' type='text' placeholder='Email' />
              {errors.email && (
                <div tabIndex='0' className='text-danger d-block'>
                  Enter valid email
                </div>
              )}
              <label className='sr-only' htmlFor='message'>
                Message
              </label>
              <input id='message' type='text' placeholder='Message' />
              <button>send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
