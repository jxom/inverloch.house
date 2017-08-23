import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import FormField from '../_Common/Form/FormField';
import { isRequired, isValidMobile } from '../../utils/validate-form';

class ProfileFields extends Component {
  render = () => {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <Field
              isRequired
              isMedium
              component={FormField}
              name="firstName"
              label="First name"
              validate={[isRequired]}
            />
          </div>
          <div className="column">
            <Field
              isRequired
              isMedium
              component={FormField}
              name="lastName"
              label="Last name"
              validate={[isRequired]}
            />
          </div>
        </div>
        <Field
          isDisabled
          isMedium
          component={FormField}
          name="mobile"
          label="Mobile number"
          validate={[isRequired, isValidMobile]}
        />
      </div>
    );
  }
}

ProfileFields.propTypes = {
};

ProfileFields.defaultProps = {
};

export default ProfileFields;

