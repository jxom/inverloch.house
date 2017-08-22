import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import styled from 'styled-components';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Message from '../_Common/Message';

const Container = styled.div`
  margin-top: 1rem !important;
`;

BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  render = () => {
    const { auth } = this.props;
    return (
      <Container className="container">
        <div className="has-text-centered">
          {
            !auth.displayName &&
            <Message className="margin-bottom-1rem" type="info" title="Note">
              In order to make a booking, you need to enter your name on your profile.<br/>
              <a>Click here to set your name.</a>
            </Message>
          }
          <h1 className="title is-size-1">Calendar</h1>
          <BigCalendar
            events={[]}
            startAccessor="startDate"
            endAccessor="endDate"
            style={{ height: '700px' }}
          />
        </div>
      </Container>
    );
  }
}

Calendar.propTypes = {
  auth: PropTypes.object
};

Calendar.defaultProps = {
  auth: {}
};

export default connect(state => ({
  auth: state.firebase.auth
}))(firebaseConnect()(Calendar));
