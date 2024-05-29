import React from "react";
import Address from "./ui/components/Address/Address";
import AddressBook from "./ui/components/AddressBook/AddressBook";
import Button from "./ui/components/Button/Button";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import transformAddress from "./core/models/address";
import useAddressBook from "./ui/hooks/useAddressBook";
import useFormFields from "./ui/hooks/useFormFields";
import Form from "./ui/components/Form/Form";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import "./App.css";

function App() {
  const initialState = {
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  };

  const [fields, handleFieldChange, setFields] = useFormFields(initialState);
  const { zipCode, houseNumber, firstName, lastName, selectedAddress } = fields;

  const [error, setError] = React.useState(undefined);
  const [addresses, setAddresses] = React.useState([]);
  const { addAddress } = useAddressBook();

  const [loading, setLoading] = React.useState(false); // Add loading state


  console.log("address",addresses)

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setError(undefined);  
    setLoading(true);     

    try {
      const response = await fetch(`http://api.postcodedata.nl/v1/postcode/?postcode=${zipCode}&streetnumber=${houseNumber}&ref=domeinnaam.nl&type=json`);

      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }

      const data = await response.json();

      if (data.status === "error" && data.errormessage.includes("limit reached")) {
        // Mock data for testing
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

        
        setAddresses(mockData);

      } else {
        // Transform and set addresses from API response
        const transformedAddresses = data.details.map((address) => transformAddress(address, houseNumber));
        setAddresses(transformedAddresses);
      }
    } catch (error) {
      setError("Failed to fetch addresses. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };


  // 

  const handlePersonSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id == selectedAddress
    );

    addAddress({ ...foundAddress, firstName, lastName });
  };


  const handleClearForm = () => {
    setFields(initialState);
    setAddresses([]);
  };


  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by zipcode, add personal info and done! 👏
          </small>
        </h1>
        <Form onSubmit={handleAddressSubmit} legend="🏠 Find an address">
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
          <Button type="submit" variant="primary" >Find</Button>
        </Form>
        {addresses.length > 0 &&
          addresses.map((address) => (
            <Radio
              name="selectedAddress"
              id={address.id}
              key={address.id}
              onChange={handleFieldChange}
            >
              <Address address={address} />
            </Radio>
          ))}
        {selectedAddress && (
          <Form onSubmit={handlePersonSubmit} legend="✏️ Add personal info to address">
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
            <Button type="submit" variant="primary" >Add to address book</Button>

            
          </Form>

          
        )}
         {/* Clear All Fields Button */}
         <Button type="button" variant="secondary" onClick={handleClearForm}>
            Clear All Fields
          </Button>
          <br/>
        
         {/* Handle Error */}
        {error && <ErrorMessage message={error} />}
      </Section>
      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
