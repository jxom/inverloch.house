import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import styled from 'styled-components';

import DateRangePickerWrapper from '../_Common/DateRangePickerWrapper';
import FormField from '../_Common/Form/FormField';
import NumberPicker from '../_Common/NumberPicker/NumberPicker';
import { isRequired } from '../../utils/validate-form';

const NumberPickerWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NumberPickerLabel = styled.div`
  width: 100px;
  margin-right: 1.5rem;
  font-weight: 400;
`;

class BookingFields extends Component {
  render = () => {
    const {
      numberOfAdultsDefaultValue,
      numberOfChildrenDefaultValue,
      onNumberOfAdultsChange,
      onNumberOfChildrenChange,
      onDatesChange
    } = this.props;
    return (
      <div>
        <Field name="dateRange" component={FormField} label="Select your dates">
          <DateRangePickerWrapper
            numberOfMonths={document.body.clientWidth < 768 ? 1 : 2}
            onDatesChange={onDatesChange}
          />
        </Field>
        <Field name="guests" component={FormField} label="How many guests?">
          <NumberPickerWrapper style={{ marginTop: '0.75rem' }}>
            <NumberPickerLabel className="is-size-5">Adults</NumberPickerLabel>
            <NumberPicker
              defaultValue={numberOfAdultsDefaultValue}
              minValue={1}
              onChange={onNumberOfAdultsChange}
            />
          </NumberPickerWrapper>
          <NumberPickerWrapper style={{ marginTop: '1rem' }}>
            <NumberPickerLabel className="is-size-5">Children</NumberPickerLabel>
            <NumberPicker
              defaultValue={numberOfChildrenDefaultValue}
              onChange={onNumberOfChildrenChange}
            />
          </NumberPickerWrapper>
        </Field>
        <Field
          isMedium
          isTextArea
          component={FormField}
          name="notes"
          label="Any notes for the owner"
          placeholder="Also going to bring some Glen 20 air fresheners for the toilet."
          validate={[isRequired]}
        />
      </div>
    );
  }
}

BookingFields.propTypes = {
  numberOfAdultsDefaultValue: PropTypes.number,
  numberOfChildrenDefaultValue: PropTypes.number,
  onNumberOfAdultsChange: PropTypes.func,
  onNumberOfChildrenChange: PropTypes.func,
  onDatesChange: PropTypes.func
};

BookingFields.defaultProps = {
  numberOfAdultsDefaultValue: 1,
  numberOfChildrenDefaultValue: 0,
  onNumberOfAdultsChange: () => {},
  onNumberOfChildrenChange: () => {},
  onDatesChange: () => {}
};

export default BookingFields;
