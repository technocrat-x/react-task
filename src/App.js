import React, { useState } from "react";

import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import useAddressBook from "./ui/hooks/useAddressBook";

import "./App.css";
import useFormFields from "./ui/hooks/useFormFields";
import transformAddress from "./core/models/address";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/Error/ErrorMessage";
import Button from "./ui/components/Button/Button";

function App() {
  /**
   * Form fields states
   * TODO: Write a custom hook to set form fields in a more generic way:
   * - Hook must expose an onChange handler to be used by all <InputText /> and <Radio /> components
   * - Hook must expose all text form field values, like so: { zipCode: '', houseNumber: '', ...etc }
   * - Remove all individual React.useState
   * - Remove all individual onChange handlers, like handleZipCodeChange for example
   */

  /**
   * Results states
   */
  const [formFields, handleChange, setFields] = useFormFields({
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  const [error, setError] = useState(undefined);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addAddress } = useAddressBook();
  /**
   * Redux actions
   */
  // const { addAddress } = useAddressBook();

  /**
   * Text fields onChange handlers
   */

  const handleAddressSubmit = async (e) => {
   
    const { zipCode, houseNumber } = formFields;
    setLoading(true);
    setError(null);

    const apiUrl = `http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json`;
    try {
      const responce = await fetch(apiUrl);
      if (!responce.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await responce.json();
      if (data.status === "error") {
        const mockData = [
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
        
        ];


        setAddresses(mockData)
        throw new Error(data.errormessage);



      }
      const transformedAddresses = data.map((addressData) => {
        const transformedAddress = transformAddress(addressData);
        transformedAddress.houseNumber = houseNumber; // Adding houseNumber to each address
        return transformedAddress;
      });
      setAddresses(transformedAddresses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    /** TODO: Fetch addresses based on houseNumber and zipCode
     * - Example URL of API: http://api.postcodedata.nl/v1/postcode/?postcode=480111&streetnumber=60&ref=domeinnaam.nl&type=json
     * - Handle errors if they occur
     * - Handle successful response by updating the `addresses` in the state using `setAddresses`
     * - Make sure to add the houseNumber to each found address in the response using `transformAddress()` function
     * - Bonus: Add a loading state in the UI while fetching addresses
     */
  };

  const handlePersonSubmit = (e) => {
    // e.preventDefault();
    const { selectedAddress, firstName, lastName } = formFields;

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
  const handleSelectedAddressChange = (e) => {
    handleChange(e);
  };
  const clearFormFields = () => {
   
    setFields({ ...formFields, zipCode: "", houseNumber: "" });
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
          legend="🏠 Find an address"
          onSubmit={handleAddressSubmit}
          fields={[
            {
              name: "zipCode",
              placeholder: "Zip Code",
              value: formFields.zipCode,
            },
            {
              name: "houseNumber",
              placeholder: "House number",
              value: formFields.houseNumber,
            },
          ]}
          onChange={handleChange}
          submitButtonText={loading ? "Finding..." : "Find"}
        />
        {addresses.length > 0 &&
          addresses.map((address) => {
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
        <section>
          {formFields.selectedAddress && (
            <Form
              legend="✏️ Add personal info to address"
              onSubmit={handlePersonSubmit}
              fields={[
                {
                  name: "firstName",
                  placeholder: "First name",
                  value: formFields.firstName,
                },
                {
                  name: "lastName",
                  placeholder: "Last name",
                  value: formFields.lastName,
                },
              ]}
              onChange={handleChange}
              submitButtonText="Add to addressbook"
            />
          )}
        </section>
        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <ErrorMessage errorMessage={error} />}

        {/* TODO: Add a button to clear all form fields. Button must look different from the default primary button, see design. */}
        <Button variant="clear" onClick={clearFormFields}>
          Clear Form Fields
        </Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
