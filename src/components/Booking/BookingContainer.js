import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import _get from 'lodash/get';

import MainPageWrapper from '../_Layout/MainPageWrapper';
import Message from '../_Common/Message';
import SaveCancelButtons from '../_Common/SaveCancelButtons';
import BookingFields from './BookingFields';

class BookingContainer extends Component {
  handleSubmit = () => {

  }

  render = () => {
    const { handleSubmit, submitting } = this.props;
    return (
      <MainPageWrapper title="Make a booking">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <form noValidate onSubmit={handleSubmit(this.handleSubmit)} style={{ marginTop: '2rem' }}>
              <BookingFields/>
              <SaveCancelButtons saveText="Book"/>
            </form>
          </div>
        </div>
      </MainPageWrapper>
    );
  }
}

BookingContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  firebase: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

BookingContainer.defaultProps = {
  firebase: {}
};

const BookingContainerForm = reduxForm({
  form: 'booking'
})(BookingContainer);

export default connect(state => ({
  firebase: state.firebase
}))(firebaseConnect()(BookingContainerForm));
