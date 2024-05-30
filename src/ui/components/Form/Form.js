import React from "react";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";

const Form = ({ legend, fields, onSubmit, onChange, submitButtonText }) => {
 

  const handleChange = (e) => {
    onChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {}));
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>{legend}</legend>
        {fields.map((field) => (
          <div className="form-row" key={field.name}>
            <InputText
              name={field.name}
              placeholder={field.placeholder}
              value={field.value}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button variant={"primary"} type="submit">{submitButtonText}</Button>
      </fieldset>
    </form>
  );
};

export default Form;
