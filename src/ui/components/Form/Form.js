import Button from "../Button/Button";
import InputText from "../InputText/InputText";

const Form = ({ formFields, legend, buttonText, buttonType, onSubmitChange, buttonVariant, onHandleChange }) => {

    return (
        <form>
            <fieldset>
                <legend>{legend}</legend>
                {
                    formFields.length && Object.values(formFields).map((item, index) => {
                        return (
                            <div className="form-row" key={`${item.name}-${index}`} >
                                <InputText type={item.type} name={item.name} placeholder={item.placeholder} onChange={(event) => onHandleChange(event)} />
                            </div>
                        )
                    })
                }
                <Button type={buttonType} onClick={onSubmitChange} variant={buttonVariant}>{buttonText}</Button>
            </fieldset>
        </form>
    )
}
export default Form;