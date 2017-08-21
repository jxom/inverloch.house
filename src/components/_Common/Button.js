import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = ({ className, children, buttonStyle, isDisabled, isLarge, isLoading, type, onClick }) => (
  <button
    className={
      classNames(
        'button',
        className,
        buttonStyle,
        isLarge ? 'is-large' : '',
        isLoading ? 'is-loading' : ''
      )
    }
    disabled={isLoading || isDisabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  buttonStyle: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLarge: PropTypes.bool,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  className: null,
  buttonStyle: null,
  isDisabled: false,
  isLarge: false,
  isLoading: false,
  type: 'button',
  onClick: () => {}
};

export default Button;
