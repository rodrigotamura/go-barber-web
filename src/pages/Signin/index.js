import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

// import { Container } from './styles';
// Styliation from this page is at src/pages/_layouts/auth/styles.js

// configuring Yup for this form
const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please, insert a valid e-mail address.')
    .required('E-mail address is required'),
  password: Yup.string().required('Password is required'),
  // now insert into form the schema property
});

export default function Signin() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    // firing e-mail and pass
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit} schema={schema}>
        <Input name="email" type="email" placeholder="Your email address" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">{loading ? 'Loading...' : 'Access'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
