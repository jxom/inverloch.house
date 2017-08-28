import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { firebaseConnect } from 'react-redux-firebase';
import _get from 'lodash/get';

import MainPageWrapper from '../_Layout/MainPageWrapper';
import Message from '../_Common/Message';
import SaveCancelButtons from '../_Common/SaveCancelButtons';

import ProfileFields from './ProfileFields';

class ProfileContainer extends Component {
  state = { hasUpdated: false }

  handleClickCancel = () => {
    const { dispatch } = this.props;
    dispatch(push('/'));
  }

  handleSubmit = async data => {
    const { firebase } = this.props;
    this.setState({ hasUpdated: false });
    try {
      await this.props.firebase.updateProfile({
        displayName: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName
      });
      this.setState({ hasUpdated: true });
    } catch (err) {
      console.error(err);
    }
  }

  render = () => {
    const { handleSubmit, submitting } = this.props;
    const { hasUpdated } = this.state;
    return (
      <MainPageWrapper title="Profile">
        <div className="columns">
          <div className="column is-8 is-offset-2">
            <form noValidate onSubmit={handleSubmit(this.handleSubmit)} style={{ marginTop: '1rem' }}>
              <ProfileFields/>
              <SaveCancelButtons isLoading={submitting} onClickCancel={this.handleClickCancel}/>
              <Message show={hasUpdated} title="Profile updated" type="success">
                Your profile has been successfully updated!
              </Message>
            </form>
          </div>
        </div>
      </MainPageWrapper>
    );
  }
}

ProfileContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  firebase: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

ProfileContainer.defaultProps = {
  firebase: {}
};

const ProfileContainerForm = reduxForm({
  form: 'profile'
})(ProfileContainer);

export default connect(state => ({
  firebase: state.firebase,
  initialValues: {
    firstName: _get(state, 'firebase.profile.firstName'),
    lastName: _get(state, 'firebase.profile.lastName'),
    mobile: _get(state, 'firebase.auth.phoneNumber')
  }
}))(firebaseConnect()(ProfileContainerForm));
