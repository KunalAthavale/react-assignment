import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ErrorMessage = props => (
  <div className="error-container">
    {props.errorMessage}<span> &#8635;</span>
  </div>
);

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
