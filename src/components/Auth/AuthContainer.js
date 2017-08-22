import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { reduxForm } from 'redux-form';
import { push } from 'react-router-redux';
import styled from 'styled-components';
import phone from 'phone';

import Message from '../_Common/Message';

import MobileNumberLoginForm from './MobileNumberLoginForm';
import MFAForm from './MFAForm';
import './index.css';

const AppSectionTitle = styled.h1`
  @media (max-width: 768px) {
    font-size: 2rem !important;
  }
`;
const Separator = styled.hr`
  background-color: white;
  margin-left:30%;
  margin-right:30%;
`;

const _formatMobile = mobile => {
  return phone(mobile, 'AU')[0];
};

class AuthContainer extends Component {
  state = {
    recaptchaVerifier: null,
    confirmationResult: null,
    allowSignInWithPhoneNumber: false,
    resolvingRecaptcha: true,
    showMFAForm: false,
    mobile: null
  };

  componentDidMount = async () => {
    const { firebase } = this.props;
    try {
      const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
        size: 'invisible',
        callback: () => {
          this.setState({ resolvingRecaptcha: false, allowSignInWithPhoneNumber: true });
        }
      });
      this.setState({ recaptchaVerifier });
    } catch (err) {
      this.setState({ resolvingRecaptcha: false, errorMessage: 'Could not initialise reCAPTCHA. Try refresh the page and try again.' });
    }
  }

  handleClickSignInWithPhoneNumber = async ({ mobile }) => {
    const { firebase } = this.props;
    const { recaptchaVerifier } = this.state;
    const newMobile = _formatMobile(mobile);
    try {
      const confirmationResult = await firebase.auth().signInWithPhoneNumber(newMobile, recaptchaVerifier);
      this.setState({ confirmationResult, showMFAForm: true, mobile });
    } catch (err) {
      this.setState({ errorMessage: `Bloody hell, we couldn't log you in! Error - ${err.message}` });
      try {
        const widgetId = await this.state.recaptchaVerifier.render();
        grecaptcha.reset(widgetId); // eslint-disable-line no-undef
      } catch (err) {
        this.setState({ errorMessage: `Something's gone hella wrong with reCAPTCHA :(. Error - ${err.message}` });
      }
    }
  }

  handleSubmitMFAForm = async ({ code }) => {
    const { dispatch } = this.props;
    const { confirmationResult } = this.state;
    try {
      await confirmationResult.confirm(code);
      dispatch(push('/'));
    } catch (err) {
      this.setState({ errorMessage: 'Sorry, we could not log you in. Are you sure you entered the correct code?' });
    }
  }

  render = () => {
    const { mobile, errorMessage, showMFAForm } = this.state;
    return (
      <section className="Auth__section hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <AppSectionTitle className="title is-1 has-text-white">inverloch.house</AppSectionTitle>
            <Separator/>
            <span id="recaptcha"/>
            {
              errorMessage &&
              <Message className="margin-bottom-20" title="Oh no!" type="danger">
                {errorMessage}
              </Message>
            }
            <div className="columns">
              <div className="column is-6 is-offset-3">
                {
                  showMFAForm ?
                    <MFAForm
                      mobile={mobile}
                      onSubmit={this.handleSubmitMFAForm}
                      onClickGoBack={this.handleGoToMobileNumberForm}
                      onClickResendCode={this.handleResendCode}
                    /> :
                    <MobileNumberLoginForm onSubmit={this.handleClickSignInWithPhoneNumber}/>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const AuthContainerForm = reduxForm({
  form: 'auth'
})(AuthContainer);

export default connect()(firebaseConnect()(AuthContainerForm));
