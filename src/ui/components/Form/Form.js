import React, { useState } from "react";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";

export const Form = ({ inputFields, onSubmit, title, bttonTitle }) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <fieldset>
          <legend>{title}</legend>
          <div className="form-row">
            {inputFields.map((inputProps, index) => {
              return (
                <InputText
                  key={index}
                  name={inputProps.name}
                  type={inputProps.type}
                  onChange={inputProps.onChange}
                  placeholder={inputProps.placeholder}
                  value={inputProps.value}
                />
              );
            })}
          </div>
          <Button type="submit">{bttonTitle}</Button>
        </fieldset>
      </form>
    </div>
  );
};
