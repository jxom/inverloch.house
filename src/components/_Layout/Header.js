import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Navbar = styled.nav`
  box-shadow: 0 0 3px 1px rgba(10, 10, 10, 0.1);
`;

export const Header = ({ auth, onClickLogout }) => (
  <Navbar className="navbar">
    <div className="navbar-brand">
      {console.log(auth)}
      <a className="navbar-item">
        <h5 className="is-size-5">
          <strong className="has-text-info">inverloch.house</strong>
        </h5>
      </a>
      <div className="navbar-burger">
        <span/>
        <span/>
        <span/>
      </div>
    </div>
    <div className="navbar-menu">
      {/* <div className="navbar-start">
        <a className="navbar-item">
          Calendar
        </a>
      </div> */}
      <div className="navbar-end">
        <span className="navbar-item">{auth.phoneNumber}</span>
        <a className="navbar-item">
          <i className="fa fa-user"/>&nbsp;
          Profile
        </a>
        <a className="navbar-item" onClick={onClickLogout}>
          <i className="fa fa-sign-out"/>&nbsp;
          Logout
        </a>
      </div>
    </div>
  </Navbar>
);

Header.propTypes = {
  auth: PropTypes.object,
  onClickLogout: PropTypes.func
};

Header.defaultProps = {
  auth: {},
  onClickLogout: () => {}
};

export default Header;
