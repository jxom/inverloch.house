import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';

import Button from '../_Common/Button';
import FormField from '../_Common/Form/FormField';
import { isRequired, isNumber, isLengthEqualTo } from '../../utils/validate-form';

const CoolField = styled(Field)`
  & input {
    text-align: center !important;
  }
`;

const isLengthEqualTo6 = field => isLengthEqualTo(6)(field);

class MFA extends Component {
  handleSubmit = async ({ code }) => {
    await this.props.onSubmit({ code });
  }

  render = () => {
    const { handleSubmit, submitting, mobile } = this.props;
    return (
      <form noValidate onSubmit={handleSubmit(this.handleSubmit)}>
        <h5 className="is-size-4 has-text-white" style={{ marginBottom: '15px', fontWeight: 'bold' }}>Gotta make sure you{'\''}re you!</h5>
        <p className="has-text-white" style={{ marginBottom: '15px' }}>
          We just sent an SMS to <strong className="has-text-white">{mobile}</strong> with your 6-digit code to log in.
        </p>
        <CoolField
          isMedium
          component={FormField}
          labelClass="has-text-white"
          name="code"
          label="Enter your 6-digit code"
          pattern="[0-9]*"
          validate={[
            isRequired,
            isNumber,
            isLengthEqualTo6
          ]}
        />
        <div style={{ marginBottom: '15px' }}><Button buttonStyle="is-info" isLoading={submitting} type="submit"><strong>Log in</strong></Button></div>
        {/* <p className="has-text-white" style={{ marginBottom: '10px' }}>
          Didn{'\''}t get your code?&nbsp;
          <a className="has-text-white" style={{ textDecoration: 'underline' }} onClick={onClickResendCode}>Resend code</a>
        </p>
        <p><a className="has-text-white" style={{ textDecoration: 'underline' }} onClick={onClickGoBack}>Go back</a></p> */}
      </form>
    );
  }
}

MFA.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool.isRequired,
  mobile: PropTypes.string
};

MFA.defaultProps = {
  onSubmit: () => {},
  mobile: null
};

const MFAForm = reduxForm({
  form: 'mfa'
})(MFA);

export default MFAForm;
