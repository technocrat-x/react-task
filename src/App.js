import React, { useEffect, useState } from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import data from "./data.json";
import { Loader } from "./ui/components/Loader/Loader";

import "./App.css";
import Error from "./ui/components/Error/Error";
import { Form } from "./ui/components/Form/Form";
import useForm from "./ui/hooks/useForm";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */
  // const [zipCode, setZipCode] = useState("");
  // const [houseNumber, setHouseNumber] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [load, setLoad] = useState(false);
  /**
   * Results states
   */
  const [error, setError] = useState({
    addressError: "",
    personalError: ""
  });
  const [searchResults, setSearchResults] = useState([]);
  const [addresses, setAddresses] = useState([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();
  const { getFormData, onChangeHandler, resetFormData } = useForm();
  /**
   * Text fields onChange handlers
   */
  // const handleZipCodeChange = (e) => setZipCode(e.target.value);

  // const handleHouseNumberChange = (e) => setHouseNumber(e.target.value);

  // const handleFirstNameChange = (e) => setFirstName(e.target.value);

  // const handleLastNameChange = (e) => setLastName(e.target.value);

  const handleSelectedAddressChange = (e) => setSelectedAddress(e.target.value);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const updatedError = {...error } 
    updatedError.addressError = ""
    setError(updatedError);
    const zipCode = getFormData("zipCode");
    const houseNumber = getFormData("houseNumber");
    if(!zipCode || !houseNumber){
      updatedError.addressError = "Zipcode and house number is required"
      setError(updatedError);
      return;
    }
    setLoad(true);
    const results = addresses.filter((item) => {
      const isMatch =
        item.postcode.includes(zipCode) &&
        item.houseNumber.includes(houseNumber);
      return isMatch;
    });
    setSearchResults(results);
    setLoad(false);
    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=1211EP&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  useEffect(() => {
    setAddresses(data);
  }, []);

  const inputFields = [
    {
      name: "zipCode",
      type: "text",
      onChange: (e) => onChangeHandler(e),
      placeholder: "Zip Code",
      value: getFormData("zipCode"),
    },
    {
      name: "houseNumber",
      type: "text",
      onChange: (e) => onChangeHandler(e),
      placeholder: "House number",
      value: getFormData("houseNumber"),
    },
  ];
  const inputFieldPersonalData = [
    {
      name: "firstName",
      type: "text",
      onChange: (e) => onChangeHandler(e),
      placeholder: "First Name",
      value: getFormData("firstName"),
    },
    {
      name: "lastName",
      type: "text",
      onChange: (e) => onChangeHandler(e),
      placeholder: "last Name",
      value: getFormData("lastName"),
    },
  ];

  const handleClearField = () => {
    resetFormData()
    setSearchResults([]);
    setAddresses([]);
    setSelectedAddress("");
  };
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const firstName = getFormData("firstName");
    const lastName = getFormData("lastName");
    const zipCode = getFormData("zipCode");

    setLoad(true);
    const updatedError = {...error } 
    updatedError.personalError = ""
    setError(updatedError);
    if (!selectedAddress || !firstName || !lastName || !addresses.length) {
      setLoad(true);
      updatedError.personalError = "No address selected, try to select an address or find one if you haven't"
      setError(updatedError);
      setLoad(false);
      return;
    }
    const foundAddress = addresses.find(
      (address) => address.id == selectedAddress
    );
    addAddress({ ...foundAddress, firstName, lastName, zipCode });
    setLoad(false);
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

        <Form
          onSubmit={handleAddressSubmit}
          title={"🏠 Find an address"}
          inputFields={inputFields}
          bttonTitle={"Find"}
        />
        {error && <Error error={error.addressError}></Error>}

        {load && <Loader />}
        {searchResults.length > 0 &&
          searchResults.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        {selectedAddress && (
          <Form
            onSubmit={handlePersonSubmit}
            title={"✏️ Add personal info to address"}
            inputFields={inputFieldPersonalData}
            bttonTitle={"Add to addressbook"}
          />
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <Error error={error.personalError}></Error>}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button variant="secondary" onClick={() => handleClearField()}>Clear All Fields</Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
