import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Button = props => (
  <div className="modal-footer reset-button reset-button-position">
    <button
      className="btn btn-primary pull-right"
      type="reset"
      onClick={props.resetForm}
    >Reset
    </button>
  </div>
);

Button.propTypes = {
  resetForm: PropTypes.func.isRequired,
};
export default Button;
