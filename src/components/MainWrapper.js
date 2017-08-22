import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { push } from 'react-router-redux';

import Header from './_Layout/Header';
import CalendarContainer from './Calendar/CalendarContainer';

class MainWrapper extends Component {
  componentDidMount = () => {
    const { dispatch, firebase } = this.props;
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(push('/login'));
      }
    });
  }

  handleLogout = async () => {
    const { dispatch, firebase } = this.props;
    try {
      await firebase.logout();
      dispatch(push('/'));
    } catch (err) {
      console.error(err);
    }
  }

  render = () => {
    const { auth, children } = this.props;
    return (
      <div>
        <Header
          auth={auth}
          onClickLogout={this.handleLogout}
        />
        {children || <CalendarContainer/>}
      </div>
    );
  }
}

MainWrapper.propTypes = {
  auth: PropTypes.object,
  children: PropTypes.node
};

MainWrapper.defaultProps = {
  auth: {},
  children: null
};

export default connect(state => ({
  auth: state.firebase.auth
}))(firebaseConnect()(MainWrapper));
