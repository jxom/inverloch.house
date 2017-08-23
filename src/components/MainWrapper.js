import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from '@jmoxey/react-redux-firebase';
import { push } from 'react-router-redux';

import Header from './_Layout/Header';
import CalendarContainer from './Calendar/CalendarContainer';

class MainWrapper extends Component {
  componentDidMount = () => {
    const { dispatch, firebase } = this.props;
    firebase.auth().onAuthStateChanged(async user => {
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

  handleClickNavItem = path => {
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  render = () => {
    const { profile, children } = this.props;
    return (
      <div>
        <Header
          profile={profile}
          onClickLogout={this.handleLogout}
          onClickNavItem={this.handleClickNavItem}
        />
        {children || <CalendarContainer/>}
      </div>
    );
  }
}

MainWrapper.propTypes = {
  profile: PropTypes.object,
  children: PropTypes.node
};

MainWrapper.defaultProps = {
  profile: {},
  children: null
};

export default connect(state => ({
  profile: state.firebase.profile
}))(firebaseConnect()(MainWrapper));
