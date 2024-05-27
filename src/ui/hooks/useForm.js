import React, { useState } from "react";

export default function useForm() {
  const [formData, setFormData] = useState({});

  const getFormData = (key) => {
    return formData[key];
  };
  
  return {
    getFormData: getFormData,
    onChangeHandler: (e) => {
      const key = e.target.name;
      const value = e.target.value;
      const updatedFormData = { ...formData };
      updatedFormData[key] = value;
      setFormData(updatedFormData);
    },
    resetFormData: () => {
      setFormData({})
    }
  };
}
