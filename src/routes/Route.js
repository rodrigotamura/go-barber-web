import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

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

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false, // default value
};
