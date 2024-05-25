import React from "react";
import PropTypes from "prop-types";
import "./ClearButton.css";

const ClearButton = ({ onClick }) => {
  return (
    <button className="clear-button" onClick={onClick}>
      Clear
    </button>
  );
};

ClearButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ClearButton;
