import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Link } from 'react-router';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-dates/lib/css/_datepicker.css';

import Message from '../_Common/Message';
import MainPageWrapper from '../_Layout/MainPageWrapper';

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  render = () => {
    const { profile } = this.props;
    return (
      <MainPageWrapper title="Calendar">
        <div className="has-text-centered" style={{ marginTop: '1rem' }}>
          {
            profile.displayName ?
              <div style={{ marginBottom: '2rem' }}>
                <Link to="/create-booking" className="button is-info">Make a booking</Link>
              </div> :
              <div style={{ marginBottom: '2rem' }}>
                <Message type="info" title="Note">
                  In order to make a booking, you need to enter your name on your profile.<br/>
                  <Link to="/profile">Click here to set your name.</Link>
                </Message>
              </div>
          }
          <BigCalendar
            events={[]}
            startAccessor="startDate"
            endAccessor="endDate"
            style={{ height: '700px' }}
          />
        </div>
      </MainPageWrapper>
    );
  }
}

Calendar.propTypes = {
  profile: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

Calendar.defaultProps = {
  profile: {}
};

export default connect(state => ({
  profile: state.firebase.profile
}))(firebaseConnect()(Calendar));
