import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const SaveCancelButtons = ({ isLoading, onClickCancel }) => (
  <div className="field is-grouped" style={{ marginTop: '1rem' }}>
    <p className="control">
      <button className={classNames('button is-info', isLoading ? 'is-loading' : '')} type="submit" disabled={isLoading}>
        Save changes
      </button>
    </p>
    <p className="control">
      <a className="button" onClick={onClickCancel} disabled={isLoading}>
        Cancel
      </a>
    </p>
  </div>
);

SaveCancelButtons.propTypes = {
  isLoading: PropTypes.bool,
  onClickCancel: PropTypes.func
};

SaveCancelButtons.defaultProps = {
  isLoading: false,
  onClickCancel: () => {}
};

export default SaveCancelButtons;
