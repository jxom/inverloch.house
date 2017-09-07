import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styled from 'styled-components';
import './styles.css';

const Navbar = styled.nav`
  box-shadow: 0 0 3px 1px rgba(10, 10, 10, 0.1);
`;

export class Header extends Component {
  state = { isActive: false }

  handleClickMenu = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  render = () => {
    const { profile, onClickLogout } = this.props;
    const { isActive } = this.state;
    return (
      <Navbar className="navbar is-info">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <h5 className="is-size-5">
              <strong className="has-text-white">inverloch.house</strong>
            </h5>
          </Link>
          <div className="navbar-burger" onClick={this.handleClickMenu}>
            <span/>
            <span/>
            <span/>
          </div>
        </div>
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
          {/* <div className="navbar-start">
            <a className="navbar-item">
              Calendar
            </a>
          </div> */}
          <div className="navbar-end">
            <span className="navbar-item has-text-white">{profile.displayName || profile.phoneNumber}</span>
            <Link className="navbar-item has-text-white" to="/profile">
              <i className="fa fa-user"/>&nbsp;
              Profile
            </Link>
            <a className="navbar-item has-text-white" onClick={onClickLogout}>
              <i className="fa fa-sign-out"/>&nbsp;
              Logout
            </a>
          </div>
        </div>
      </Navbar>
    );
  }
}

Header.propTypes = {
  profile: PropTypes.object,
  onClickLogout: PropTypes.func
};

Header.defaultProps = {
  profile: {},
  onClickLogout: () => {}
};

export default Header;
