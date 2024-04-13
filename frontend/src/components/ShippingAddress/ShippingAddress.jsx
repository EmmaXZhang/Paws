/* eslint-disable react/prop-types */
import { Form, Button, Col } from "react-bootstrap";

const ShippingAddress = ({
  address,
  city,
  state,
  zip,
  country,
  setAddress,
  setCity,
  setState,
  setZip,
  setCountry,
  submitHandler,
}) => {
  return (
    <Form className="justify-content-lg-center mt-5" onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder="1234 Main St"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" as={Col} controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" as={Col} controlId="state">
        <Form.Label>State</Form.Label>
        <Form.Control
          placeholder="Enter State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" as={Col} controlId="zip">
        <Form.Label>Zip</Form.Label>
        <Form.Control
          placeholder="Enter Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" as={Col} controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </Form.Group>

      <Button className="mb-3" variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default ShippingAddress;
