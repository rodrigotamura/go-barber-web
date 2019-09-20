import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

// import { Container } from './styles';
// Styliation from this page is at src/pages/_layouts/auth/styles.js

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <input placeholder="Full name" />
        <input type="email" placeholder="Your email address" />
        <input type="password" placeholder="Your password" />

        <button type="submit">Create account</button>
        <Link to="/">I already have an account</Link>
      </form>
    </>
  );
}
