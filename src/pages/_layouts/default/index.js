import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper } from './styles';

/**
 *
 * @param {*} children will be the content itself
 * <AuthLayout>
 *  // children content
 * </AuthLayout>
 */
export default function DefaultLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired, // it means that children will come as <element>
};
