import { useState, useCallback } from "react";

const useFormFields = (initialState) => {
  const [fields, setFields] = useState(initialState);

  const handleFieldChange = useCallback((e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  }, []);

  const resetFormFields = () => {
    setFields(initialState);
  };

  return [fields, handleFieldChange, resetFormFields];
};

export default useFormFields;
