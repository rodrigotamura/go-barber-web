import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';

export default function RouteWrapper({
  component: Component, // because we can use <Component /> (<component /> is wrong)
  isPrivate = false,
  ...rest // another variables (like exact, path and so on) we will store at rest
}) {
  const signed = false; // store wether user is loggedin

  if (!signed && isPrivate) {
    // not logged and route is isPrivate setted as true
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    // in this project, if logged user goes to Register or Login pages
    // it will be redirected onto Dashboard page.
    // (there is no sense a logged user to go to these pages)
    return <Redirect to="/dashboard" />;
  }

  // verifying which layout will we rendered - AuthLayout or DefaultLayout
  // now we might call Layout as an element <Layout>, because it is receiving an element format
  const Layout = signed ? DefaultLayout : AuthLayout;

  // Old manner before DefaultLayour or AuthLayout
  // return <Route {...rest} component={Component} />;

  /**
   * Within render, we can pass all properties from the screen (...props) such as
   * properties of navigation, to know which params is comming from route, history (by push),
   * and so on.
   */
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false, // default value
};
