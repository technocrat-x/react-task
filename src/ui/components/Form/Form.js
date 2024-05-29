import React from "react";

function Form({ onSubmit, children, legend }) {
  return (
    <form onSubmit={onSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
      </fieldset>
    </form>
  );
}

export default Form;
