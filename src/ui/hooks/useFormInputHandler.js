import { useState } from "react";

const useFormInputHandler = (initialFormFields) => {
    const [fields, setFields] = useState(initialFormFields)
    const handleChange = (event) => {
        const { name, value } = event.target
        setFields(prev => ({ ...prev, [name]: value }))
    }
    return (
        [fields, handleChange, setFields]
    )

}
export default useFormInputHandler;