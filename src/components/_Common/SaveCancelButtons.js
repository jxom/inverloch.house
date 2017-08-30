import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const SaveCancelButtons = ({ isLoading, onClickCancel, saveText }) => (
  <div className="field is-grouped" style={{ marginTop: '1rem' }}>
    <p className="control">
      <button className={classNames('button is-info', isLoading ? 'is-loading' : '')} type="submit" disabled={isLoading}>
        {saveText}
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
  onClickCancel: PropTypes.func,
  saveText: PropTypes.string
};

SaveCancelButtons.defaultProps = {
  isLoading: false,
  onClickCancel: () => {},
  saveText: 'Save changes'
};

export default SaveCancelButtons;
