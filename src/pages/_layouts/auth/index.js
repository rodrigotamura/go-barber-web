import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

/**
 *
 * @param {*} children will be the content itself
 * <AuthLayout>
 *  // children content
 * </AuthLayout>
 */
export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired, // it means that children will come as <element>
};
