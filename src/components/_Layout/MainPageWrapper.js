import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class MainPageWrapper extends Component {
  render = () => {
    const { title, children } = this.props;
    return (
      <section className="section">
        <div className="container">
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
  title: PropTypes.string.isRequired
};

MainPageWrapper.defaultProps = {
};

export default MainPageWrapper;
