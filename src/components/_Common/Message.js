import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Message extends Component {
  state = { show: true }

  constructor(props) {
    super(props);
    this.state = { show: props.show };
  }

  componentWillReceiveProps = ({ show: nextShow }) => {
    const { show } = this.props;
    if (show !== nextShow) {
      this.setState({ show: nextShow });
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  render = () => {
    const { className, title, children, type, showCloseButton } = this.props;
    const { show } = this.state;
    return (
      <div>
        {
          show &&
          <article className={classNames('message', type ? `is-${type}` : '', className)} style={{ display: 'inline-block' }}>
            <div className="message-header">
              <p className="margin-bottom-0" style={{ fontWeight: 'bold' }}>{title}</p>
              {
                showCloseButton &&
                <a className={`button is-${type} is-inverted is-outlined`} onClick={this.handleClose}>Close</a>
              }
            </div>
            <div className="message-body is-light-weight-text has-text-left">
              {children}
            </div>
          </article>
        }
      </div>
    );
  }
}

Message.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  show: PropTypes.bool,
  showCloseButton: PropTypes.bool
};

Message.defaultProps = {
  className: '',
  show: true,
  showCloseButton: true
};

export default Message;
