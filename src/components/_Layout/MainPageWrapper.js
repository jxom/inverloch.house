import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';

import Message from '../_Common/Message';

class MainPageWrapper extends Component {
  render = () => {
    const { title, children, location, notificationMessage } = this.props;
    const pathname = `${location.pathname}${location.search}`;
    return (
      <section className="section">
        <div className="container">
          <div className="has-text-centered" style={{ marginTop: '0px', marginBottom: '20px' }}>
            <Message
              show={!_isEmpty(notificationMessage) && pathname.includes(notificationMessage.path)}
              type={notificationMessage.type}
              title={notificationMessage.title}
            >
              {notificationMessage.message}
            </Message>
          </div>
          <div className="has-text-centered">
            <h1 className="title is-size-1">{title}</h1>
          </div>
          {children}
        </div>
      </section>
    );
  }
}

MainPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  notificationMessage: PropTypes.object.isRequired,
  location: PropTypes.object
};

MainPageWrapper.defaultProps = {
  location: {}
};

export default connect(state => ({
  notificationMessage: _get(state, '_ui.notificationMessage', {}),
  location: _get(state, 'routing.locationBeforeTransitions')
}))(MainPageWrapper);
