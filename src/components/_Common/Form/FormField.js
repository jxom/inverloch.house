import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class FormField extends Component {
  render() {
    const {
      isCheckbox,
      isDisabled,
      isSearchSelect,
      isSelect,
      isRequired,
      isTextArea,
      children,
      className,
      labelClass,
      icon,
      input,
      label,
      meta,
      placeholder,
      type,
      isMedium
    } = this.props;
    const isErrorAndTouched = meta.error && meta.touched;

    return (
      <div className={classNames(className, 'field')}>
        { label && <label className={classNames('label', labelClass)}>{label} { isRequired && <span className="has-text-danger">*</span> }</label> }
        {
          (!isSearchSelect && !isSelect && !isCheckbox && !isTextArea && children) ?
          children :
          <div className={classNames('control', icon ? 'has-icons-left' : '', isErrorAndTouched ? 'has-icons-right' : '')}>
            {
              !isSearchSelect && !isSelect && !isCheckbox && !isTextArea &&
              <input
                disabled={isDisabled}
                className={classNames('input', isMedium ? 'is-medium' : '', isErrorAndTouched ? 'is-danger' : '')}
                {...input}
                type={type}
                placeholder={placeholder}
                aria-label={label}
              />
            }
            {
              isSelect &&
              <select
                className={classNames('input', isMedium ? 'is-medium' : '', isErrorAndTouched ? 'is-danger' : '')}
                {...input}
                placeholder={placeholder}
                aria-label={label}
              >
                {children}
              </select>
            }
            {
              isCheckbox &&
              <label>
                <input className="awesome" type="checkbox" {...input}/>
                <span className="label">{label}</span>
              </label>
            }
            {
              isTextArea &&
              <textarea
                disabled={isDisabled}
                className={classNames('textarea', isMedium ? 'is-medium' : '', isErrorAndTouched ? 'is-danger' : '')}
                {...input}
                placeholder={placeholder}
                aria-label={label}
              />
            }
            {
              icon &&
              <span className="icon is-small is-left">
                <i className={icon}/>
              </span>
            }
            {
              isErrorAndTouched &&
              <span className="icon is-small is-right">
                <i className="fa fa-warning has-text-danger"/>
              </span>
            }
          </div>
        }
        {
          isErrorAndTouched &&
          <p className="help is-danger">{meta.error}</p>
        }
      </div>
    );
  }
}

FormField.propTypes = {
  isCheckbox: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSearchSelect: PropTypes.bool,
  isTextArea: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  icon: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  labelClass: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  isMedium: PropTypes.bool,
  selectProps: PropTypes.object,
  isSelect: PropTypes.bool,
  isRequired: PropTypes.bool,
  children: PropTypes.node
};

FormField.defaultProps = {
  isCheckbox: false,
  isDisabled: false,
  isSearchSelect: false,
  isTextArea: false,
  selectProps: {},
  className: null,
  icon: null,
  placeholder: null,
  labelClass: null,
  type: 'input',
  label: null,
  meta: {},
  input: {},
  isMedium: false,
  isSelect: false,
  isRequired: false,
  children: null
};

export default FormField;

