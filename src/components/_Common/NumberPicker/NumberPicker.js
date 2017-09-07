import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;
const CircleButton = styled.a`
  border-radius: 100% !important;
  width: 35px !important;
  height: 35px !important;
`;
const PickerValue = styled.span`
  margin-left: 1rem;
  margin-right: 1rem;
`;

export class NumberPicker extends Component {
  state = { value: 0 };

  constructor(props) {
    super(props);
    this.state = { value: props.defaultValue };
  }

  handleClickSubtract = async () => {
    const { minValue, onChange } = this.props;
    const { value } = this.state;
    if (value > minValue) {
      await this.setState({ value: value - 1 });
      onChange(this.state.value);
    }
  };

  handleClickAdd = async () => {
    const { maxValue, onChange } = this.props;
    const { value } = this.state;
    if (value < maxValue) {
      await this.setState({ value: value + 1 });
      onChange(this.state.value);
    }
  };

  render = () => {
    const { minValue, maxValue } = this.props;
    const { value } = this.state;
    return (
      <Container>
        <CircleButton className="button is-primary is-outlined" disabled={value <= minValue} onClick={this.handleClickSubtract}>
          <svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{ display: 'block', fill: 'currentcolor', height: '1em', width: '1em' }}>
            <rect width="26" height="4" x="0" y="11" rx="1"/>
          </svg>
        </CircleButton>
        <PickerValue className="is-size-5">
          {value}
        </PickerValue>
        <CircleButton className="button is-primary is-outlined" disabled={value >= maxValue} onClick={this.handleClickAdd}>
          <svg viewBox="0 0 24 24" role="img" aria-label="subtract" focusable="false" style={{ display: 'block', fill: 'currentcolor', height: '1em', width: '1em' }}>
            <rect width="26" height="4" x="0" y="11" rx="1"/>
            <rect width="4" height="26" x="10" y="0" rx="1"/>
          </svg>
        </CircleButton>
      </Container>
    );
  }
}

NumberPicker.propTypes = {
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  defaultValue: PropTypes.number
};

NumberPicker.defaultProps = {
  maxValue: 20,
  minValue: 0,
  defaultValue: 0
};

export default NumberPicker;
