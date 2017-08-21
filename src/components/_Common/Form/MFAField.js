import React, { Component } from 'react';
import PropTypes from 'prop-types';
import times from 'lodash/times';

export class MFAField extends Component {
  constructor(props) {
    super(props);
    this.fields = {};
  }

  componentDidMount = () => {
    this.fields[0].focus();
  }

  clearFields = () => {
    const { numberOfFields } = this.props;
    times(numberOfFields, index => {
      this.fields[index].value = null;
    });
    this.fields[0].focus();
  }

  handleKeyDown = index => e => {
    if (e.keyCode === 8 && index !== this.props.numberOfFields && index > 0 && !e.target.value) {
      this.fields[index - 1].focus();
    }
  }

  handleChange = index => e => {
    const { numberOfFields } = this.props;
    if (e.target.value && index < numberOfFields - 1) {
      this.fields[index + 1].focus();
    } else if (index === numberOfFields - 1) {
      this.handleSubmit();
    }
  }

  handleRef = index => e => {
    this.fields[index] = e;
  }

  handleSubmit = () => {
    const { numberOfFields, onComplete } = this.props;
    let mfaCode = '';

    times(numberOfFields, index => {
      mfaCode += this.fields[index].value;
    });

    this.clearFields();
    if (onComplete) {
      onComplete(mfaCode);
    }
  }

  render = () => {
    const { numberOfFields } = this.props;
    return (
      <div className="field has-addons mfa-field margin-top-20">
        {times(numberOfFields, index => (
          <p key={index} className="control margin-bottom-0">
            <input
              ref={this.handleRef(index.toString())}
              className="input"
              type="text"
              onChange={this.handleChange(index)}
              onKeyDown={this.handleKeyDown(index)}
              maxLength="1"
            />
          </p>
        ))}
      </div>
    );
  }
}

MFAField.propTypes = {
  numberOfFields: PropTypes.number,
  onComplete: PropTypes.func
};

MFAField.defaultProps = {
  numberOfFields: 6,
  onComplete: null
};

export default MFAField;
