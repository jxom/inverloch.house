import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import styled from 'styled-components';

import Button from '../_Common/Button';
import FormField from '../_Common/Form/FormField';
import { isRequired, isValidMobile } from '../../utils/validate-form';

const CoolField = styled(Field)`
  & input {
    text-align: center !important;
  }
`;

class MobileNumberLogin extends Component {
  handleSubmit = async ({ mobile }) => {
    await this.props.onSubmit({ mobile });
  }

  render = () => {
    const { handleSubmit, submitting } = this.props;
    return (
      <form noValidate onSubmit={handleSubmit(this.handleSubmit)}>
        <CoolField
          isMedium
          component={FormField}
          labelClass="has-text-white"
          name="mobile"
          label="Enter your mobile number to continue"
          pattern="[0-9]*"
          validate={[isRequired, isValidMobile]}
        />
        <Button buttonStyle="is-info" isLoading={submitting} type="submit"><strong>Continue</strong></Button>
      </form>
    );
  }
}

MobileNumberLogin.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  submitting: PropTypes.bool.isRequired
};

MobileNumberLogin.defaultProps = {
  onSubmit: () => {}
};

const MobileNumberLoginForm = reduxForm({
  form: 'mobileNumberLogin'
})(MobileNumberLogin);

export default MobileNumberLoginForm;
