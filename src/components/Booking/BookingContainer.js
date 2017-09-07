import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { push } from 'react-router-redux';
import moment from 'moment';
import _get from 'lodash/get';

import { successNotif } from '../../actions/ui/notifications';
import MainPageWrapper from '../_Layout/MainPageWrapper';
import Message from '../_Common/Message';
import SaveCancelButtons from '../_Common/SaveCancelButtons';
import BookingFields from './BookingFields';

const _validateForm = values => {
  const errors = {};
  if (!_get(values, 'dateRange.startDate') || !_get(values, 'dateRange.endDate')) {
    errors.dateRange = 'Please select a date range';
  }
  return errors;
};

class BookingContainer extends Component {
  state = {
    errorMessage: null,
    startDate: null,
    endDate: null,
    guests: {
      adults: 1,
      children: 0
    }
  }

  handleClickCancel = () => {
    const { dispatch } = this.props;
    dispatch(push('/'));
  }

  handleDatesChange = ({ startDate, endDate }) => {
    const { change } = this.props;
    change('dateRange', { startDate, endDate });
    this.setState({ startDate, endDate });
  }

  handleNumberOfAdultsChange = value => {
    this.setState({ guests: Object.assign({}, this.state.guests, { adults: value }) });
  }

  handleNumberOfChildrenChange = value => {
    this.setState({ guests: Object.assign({}, this.state.guests, { children: value }) });
  }

  handleSubmit = async data => {
    const { dispatch, firebase } = this.props;
    const { startDate, endDate, guests } = this.state;
    const body = {
      notes: data.notes,
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
      numberOfGuests: guests,
      bookedBy: firebase.auth().currentUser.uid
    };
    try {
      await firebase.push('/appointments', body);
      dispatch(successNotif({
        message: 'Your booking has been successfully created and is pending approval by the property owners.',
        path: '/'
      }));
      dispatch(push('/'));
    } catch (err) {
      this.setState({ errorMessage: 'An error occured while trying to book your appointment. Please try again.' });
      console.error(err);
    }
  }

  render = () => {
    const { handleSubmit, submitting } = this.props;
    const { errorMessage } = this.state;
    return (
      <MainPageWrapper title="Make a booking">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <form noValidate onSubmit={handleSubmit(this.handleSubmit)} style={{ marginTop: '2rem' }}>
              <BookingFields
                numberOfAdultsDefaultValue={1}
                numberOfChildrenDefaultValue={0}
                onNumberOfAdultsChange={this.handleNumberOfAdultsChange}
                onNumberOfChildrenChange={this.handleNumberOfChildrenChange}
                onDatesChange={this.handleDatesChange}
              />
              <SaveCancelButtons isLoading={submitting} saveText="Book" onClickCancel={this.handleClickCancel}/>
              <Message show={Boolean(errorMessage)} title="Oh no!" type="danger">
                {errorMessage}
              </Message>
            </form>
          </div>
        </div>
      </MainPageWrapper>
    );
  }
}

BookingContainer.propTypes = {
  change: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  firebase: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

BookingContainer.defaultProps = {
  firebase: {}
};

const BookingContainerForm = reduxForm({
  form: 'booking',
  validate: _validateForm
})(BookingContainer);

export default connect(state => ({
  firebase: state.firebase
}))(firebaseConnect()(BookingContainerForm));
