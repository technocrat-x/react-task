import { useState } from "react";

const useFormFields = (initialState) => {
  
  const [fields, setFields] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return [fields, handleChange,setFields];
};

export default useFormFields;
