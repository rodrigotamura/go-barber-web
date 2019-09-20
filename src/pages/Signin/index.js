import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

// import { Container } from './styles';
// Styliation from this page is at src/pages/_layouts/auth/styles.js

export default function Signin() {
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <form>
        <input type="email" placeholder="Your email address" />
        <input type="password" placeholder="Your password" />

        <button type="submit">Access</button>
        <Link to="/register">Create free account</Link>
      </form>
    </>
  );
}
