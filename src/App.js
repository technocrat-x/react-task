import React from "react";
import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormInputHandler from "./ui/hooks/useFormInputHandler";
import Form from "./ui/components/Form/Form";
import "./App.css";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */
  const initialFormFields = { firstName: "", lastName: "", selectedAddress: "", houseNumber: "", zipCode: "" }
  const [fields, handleChange, setFields] = useFormInputHandler(initialFormFields)

  const personalDetailsFields = [
    { type: 'text', name: 'firstName', value: fields.firstName, placeholder: "First Name" },
    { type: 'text', name: 'lastName', value: fields.lastName, placeholder: "Last Name" },
  ];

  const addressFields = [
    { type: 'text', name: 'zipCode', value: fields.zipCode, placeholder: "Zip Code" },
    { type: 'text', name: 'houseNumber', value: fields.houseNumber, placeholder: "House Number" },
  ];


  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleReset = () => {
    setFields(initialFormFields);
    setAddresses([])
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json")
      response = await response.json()

      if (response.status === "error" && response.errormessage.includes("limit reached")) {
        const mockAddresses = [
          {
            id: 1,
            street: "Oak Street",
            city: "Maplewood",
            municipality: "Essex County",
            province: "New Jersey",
            houseNumber: "123",
            postcode: "07040",
          },
          {
            id: 2,
            street: "Pine Avenue",
            city: "Springfield",
            municipality: "Sangamon County",
            province: "Illinois",
            houseNumber: "456",
            postcode: "62701",
          },
          {
            id: 3,
            street: "Cedar Lane",
            city: "Boulder",
            municipality: "Boulder County",
            province: "Colorado",
            houseNumber: "789",
            postcode: "80301",
          }
        ];
        setAddresses(mockAddresses)
      }
      else {
        const transformedAddresses = response.details.map((address) => transformAddress(address, fields.houseNumber));
        setAddresses(transformedAddresses);
      }
    }
    catch (error) {
      setError(error.errormessage)
    }

    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    if (!fields.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === parseInt(fields.selectedAddress)
    );
    addAddress({ ...foundAddress, firstName: fields.firstName, lastName: fields.lastName });
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by zipcode add personal info and done! 👏
          </small>
        </h1>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <Form formFields={addressFields}
          legend={"🏠 Find an address"}
          buttonText={"Find"}
          onSubmitChange={handleAddressSubmit}
          onHandleChange={handleChange}
          buttonType="submit"
          buttonVariant="primary"
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {fields.selectedAddress && (
          <Form
            formFields={personalDetailsFields}
            legend={"✏️ Add personal info to address"}
            buttonText={"Add to addressbook"}
            onSubmitChange={handlePersonSubmit}
            onHandleChange={handleChange}
            buttonType="submit"
            buttonVariant="primary"
          />
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage error={error} />}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button type="reset" variant="secondary" onClick={handleReset}>Reset Fields</Button>
      </Section>
      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
