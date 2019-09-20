import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import logo from '~/assets/logo.svg';

// import { Container } from './styles';
// Styliation from this page is at src/pages/_layouts/auth/styles.js

export default function Signin() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Your email address" />
        <Input name="password" type="password" placeholder="Your password" />

        <button type="submit">Access</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
