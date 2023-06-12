import React, { useState } from 'react';

import LoginForm from './logInForm';
import SignUpForm from './signUpForm';

export default function LoginPage() {
  const [isRegistered, setIsRegistered] = useState(true);
  
  return <>{isRegistered ? <LoginForm setIsRegistered={setIsRegistered} /> : <SignUpForm setIsRegistered={setIsRegistered} />}</>;
}
