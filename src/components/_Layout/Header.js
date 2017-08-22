import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Navbar = styled.nav`
  box-shadow: 0 0 3px 1px rgba(10, 10, 10, 0.1);
`;

export const Header = ({ onClickLogout }) => (
  <Navbar className="navbar">
    <div className="navbar-brand">
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
        <span className="navbar-item">+61468605450</span>
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
  onClickLogout: PropTypes.func
};

Header.defaultProps = {
  onClickLogout: () => {}
};

export default Header;
