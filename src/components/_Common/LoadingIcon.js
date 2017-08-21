import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Icon = styled.i`
  border: none;
  color: black;
`;

const LoadingIcon = ({ size, type }) => (
  <Icon className={`icon is-loading is-${type}`} style={{ fontSize: size }}/>
);

LoadingIcon.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string
};

LoadingIcon.defaultProps = {
  size: '30px',
  type: 'primary'
};

export default LoadingIcon;
