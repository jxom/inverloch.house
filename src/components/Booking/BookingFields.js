import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import DateRangePickerWrapper from '../_Common/DateRangePickerWrapper';
import FormField from '../_Common/Form/FormField';
import NumberPicker from '../_Common/NumberPicker/NumberPicker';

const NumberPickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NumberPickerLabel = styled.div`
  width: 100px;
  margin-right: 1.5rem;
  font-weight: 400;
`;

class ProfileFields extends Component {
  render = () => {
    return (
      <div>
        <Field component={FormField} label="Select your dates">
          <DateRangePickerWrapper/>
        </Field>
        <Field component={FormField} label="How many guests?">
          <NumberPickerWrapper style={{ marginTop: '0.75rem' }}>
            <NumberPickerLabel className="is-size-5">Adults</NumberPickerLabel>
            <NumberPicker/>
          </NumberPickerWrapper>
          <NumberPickerWrapper style={{ marginTop: '1rem' }}>
            <NumberPickerLabel className="is-size-5">Children</NumberPickerLabel>
            <NumberPicker/>
          </NumberPickerWrapper>
        </Field>
        <Field
          isMedium
          isTextArea
          component={FormField}
          name="notes"
          label="Any notes for the owner"
          placeholder="Also going to bring some Glen 20 air fresheners for the toilet."
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
