import React, { useState } from 'react';
import SendOnTimeCode from './SendOnTimeCode';
import VerifyOnTimeCode from './VerifyOnTimeCode';
import ChangePassword from './ChangePassword';

export default function ForgotPassword() {
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isVerify, setIsVerify] = useState(false);
  const [forgotPasswordToken, setForgotPasswordToken] = useState('');
  const [tokenConfirmationCodeVerified, setTokenConfirmationCodeVerified] = useState('');

  const toggleISCodeSend = () => {
    setIsCodeSent((prevSate) => !prevSate);
  };

  const toggleIsVerify = () => {
    setIsVerify((prevSate) => !prevSate);
  };

  if (!isVerify && !isCodeSent)
    return (
      <SendOnTimeCode
        isCodeSent={isCodeSent}
        toggle={toggleISCodeSend}
        setForgotPasswordToken={setForgotPasswordToken}
        setTimer={setTimer}
      />
    );

  if (!isVerify && isCodeSent)
    return (
      <VerifyOnTimeCode
        timer={timer}
        setTimer={setTimer}
        isCodeSent={isCodeSent}
        setIsCodeSent={setIsCodeSent}
        toggle={toggleIsVerify}
        forgotPasswordToken={forgotPasswordToken}
        setTokenConfirmationCodeVerified={setTokenConfirmationCodeVerified}
      />
    );

  return <ChangePassword tokenConfirmationCodeVerified={tokenConfirmationCodeVerified} />;
}
