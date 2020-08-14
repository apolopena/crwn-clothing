import React, { useState } from 'react';
//import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';

import { signUpStart } from '../../redux/user/user.actions';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {
  SignUpContainer,
  TitleContainer
} from './sign-up.styles';


const SignUp = ({ signUpStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return
    }

    try {
      signUpStart({email, password, displayName})
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = event => {
    const  { value, name } = event.target;
    setUserCredentials({...userCredentials, [name]: value })
  }

  return (
    <SignUpContainer>
      <TitleContainer> I do not have an account</TitleContainer>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Display Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
}

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (signUpCredentials) => dispatch(signUpStart(signUpCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);