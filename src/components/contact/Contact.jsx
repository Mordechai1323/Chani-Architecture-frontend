import React, { useState } from 'react';
import axios from '../../api/axios';
import { useForm } from 'react-hook-form';
import Top from './Top';
import { styled } from 'styled-components';
import { Content } from '../UI/Content.style';

function Contact() {
  const [isSendEmail, setIsSendEmail] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (bodyData) => {
    try {
      const response = await axios.post('/contact', bodyData);
      setIsSendEmail(true);
      console.log(response);
    } catch (err) {
      console.log('server error', err.response.data);
    }
  };

  return (
    <Content>
      <h1 className='sr-only'>page for contact</h1>
      <ContactStyle>
        <Top />

        {!isSendEmail ? (
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
              <form onSubmit={handleSubmit(onSubmit)} action='' role='form'>
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
                <input {...register('message', { required: false })} id='message' type='text' placeholder='Message' />
                <button>send</button>
              </form>
            </div>
          </div>
        ) : (
          <div id='content' className='down-contact-center'>
            <div className='left-container'>
              <div className='top-left-container ' tabIndex='0' style={{ textAlign: 'center', width: '100%', fontSize: '2.5em' }}>
                <h2>Our team will get back to you</h2>
              </div>
            </div>
          </div>
        )}
      </ContactStyle>
    </Content>
  );
}

export default Contact;

const ContactStyle = styled.div`
  width: 90%;
  height: 380px;
  background: #eaeaeb;
  border-radius: 4vw;

  & .down-contact-center {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    color: #3e3e3e;

    & .left-container {
      width: 100%;
      min-height: 78px;
      margin-top: 5vw;
      display: flex;
      flex-wrap: wrap;
      margin-left: 32px;

      & .top-left-container {
        display: flex;
        font-size: 1em;
        width: 100%;

        & h2 {
          margin: 0;
          font-size: 1.5em;
          margin-right: 8px;
          font-weight: 500;
        }
      }

      & .down-left-container {
        width: 100%;
        margin-top: 2vw;

        & h3 {
          font-size: 0.7em;
          font-weight: bold;

          & a {
            text-decoration: none;
            color: #3e3e3e;
          }
        }
      }
    }

    & .right-container {
      width: 100%;
      min-height: 258px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      & form {
        width: 80%;

        & input {
          width: 100%;
          border: none;
          background: none;
          outline: none;
          border-bottom: 1px solid #666;
          margin-top: 5vw;
          font-size: 0.7em;
          font-weight: bold;
        }
      }

      & button {
        border: none;
        background: none;
        font-weight: bold;
        margin: 5vw 0vw 0vw 0vw;
        font-size: 5vw;
      }
    }
  }

  @media (min-width: 550px) {
    min-height: 396px;
    width: 53%;
    border-radius: 32px;



    & .down-contact-center {
      & .left-container {
        width: 50%;
        margin: 0;

        & .top-left-container {
          min-height: 216px;
          font-size: 2.6vw;
          flex-direction: column;
          margin: 18px 0 0 55px;

          & h4 {
            margin: 0;
          }

          & .line {
            border-bottom: solid;
            border-radius: 10vw;
            width: 3vw;
          }
        }

        & .down-left-container {
          font-size: 1em;
          margin: 98px 0 0 55px;

          & a {
            text-decoration: none;
            color: #3e3e3e;
          }
        }
      }

      & .right-container {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        & form {
          & input {
            margin: 24px 0;
          }
        }

        & button {
          margin: 4px 0 0 83%;
          font-size: 1em;
          cursor: pointer;
        }
      }
    }
  }

  @media (min-width: 1300px) {
    min-height: 496px;
    width: 45%;
    border-radius: 32px;

    & .down-contact-center {
      min-height: 458px;
    }
  }
`;
