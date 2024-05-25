import React from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
// import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormField";
import axios from "axios";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";

import "./App.css";
import ClearButton from "./ui/components/ClearButton/ClearButton";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   * /* ^COMPLETED^ */
   

  const [formFields, handleFieldChange, resetFormFields] = useFormFields({
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  const { zipCode, houseNumber, firstName, lastName, selectedAddress } = formFields;


  /**
   * Results states
   */
  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
    /* ^COMPLETED^ */

    try {
      // Make HTTP request to fetch addresses
      console.log(zipCode);
      console.log(houseNumber);
      const response = await axios.get(
        `http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json`
      );
      console.log(response.data)
      // Check if response is successful
      if (response.status === 200) {
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Transform addresses if necessary
          const transformedAddresses = response.data.map(transformAddress);

          // Update addresses in state
          setAddresses(transformedAddresses);

          // Clear error
          setError(null);
        } else {
          // Handle case where response data is not an array
          console.log(response.data)
          setError("Invalid response data format. Please try again.");
        }
      } else {
        // Handle other status codes if needed
        setError("Failed to fetch addresses. Please try again.");
      }
    } catch (error) {
      // Handle errors
      console.log(error)
      setError("An error occurred while fetching addresses. Please try again.");
    }

  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };

  const handleClear = () => {
    resetFormFields();
    setAddresses([]);
    setError(null);
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
        {/* ^COMPLETED^ */}
        <Form
          legend="🏠 Find an address"
          onSubmit={handleAddressSubmit}
          buttonText="Find"
        >
          <div className="form-row">
            <InputText
              name="zipCode"
              onChange={handleFieldChange}
              placeholder="Zip Code"
              value={zipCode}
            />
          </div>
          <div className="form-row">
            <InputText
              name="houseNumber"
              onChange={handleFieldChange}
              value={houseNumber}
              placeholder="House number"
            />
          </div>
        </Form>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleFieldChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {/* ^COMPLETED^ */}
        {selectedAddress && (
          <Form
            legend="✏️ Add personal info to address"
            onSubmit={handlePersonSubmit}
            buttonText="Add to addressbook"
          >
            <div className="form-row">
              <InputText
                name="firstName"
                placeholder="First name"
                onChange={handleFieldChange}
                value={firstName}
              />
            </div>
            <div className="form-row">
              <InputText
                name="lastName"
                placeholder="Last name"
                onChange={handleFieldChange}
                value={lastName}
              />
            </div>
          </Form>
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {/* ^COMPLETED^ */}
        <ErrorMessage message={error} />

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        {/* ^COMPLETED^ */}
        <ClearButton onClick={handleClear} />
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
