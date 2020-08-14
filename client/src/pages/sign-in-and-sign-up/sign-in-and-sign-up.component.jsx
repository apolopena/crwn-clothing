import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import {
  PageContainer
} from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => (
  <PageContainer>
    <SignIn />
    <SignUp />
  </PageContainer>
);

export default SignInAndSignUpPage;