import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { push } from 'react-router-redux';

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
    return (
      <div>
        Welcome!&nbsp;<a onClick={this.handleLogout}>Logout</a>
      </div>
    );
  }
}

export default connect(state => ({
  auth: state.firebase.auth
}))(firebaseConnect()(MainWrapper));
