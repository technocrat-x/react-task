// ui/components/Form/Form.js
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const Form = ({ legend, onSubmit, children, buttonText, buttonVariant = "primary" }) => {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
        <Button type="submit" variant={buttonVariant}>{buttonText}</Button>
      </fieldset>
    </form>
  );
};

Form.propTypes = {
  legend: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonVariant: PropTypes.string,
};

export default Form;
