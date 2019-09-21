import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';
import Header from '~/components/Header';

/**
 *
 * @param {*} children will be the content itself
 * <AuthLayout>
 *  // children content
 * </AuthLayout>
 */
export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired, // it means that children will come as <element>
};
