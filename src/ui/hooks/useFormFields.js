import { useState } from "react";

function useFormFields(initialState) {
  const [fields, setFields] = useState(initialState);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return [fields, handleFieldChange, setFields];
}

export default useFormFields;
