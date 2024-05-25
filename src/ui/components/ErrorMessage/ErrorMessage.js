import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return message ? <div className="error-message">{message}</div> : null;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;
