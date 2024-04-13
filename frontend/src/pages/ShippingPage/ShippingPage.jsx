import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../slices/cartSlice";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, SetState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  function submitHandler(e) {
    e.prevent.default();
    dispatch(saveShippingAddress(shippingAddress));
  }

  return (
    <Col xs={12} md={6}>
      <h1>Shipping Address</h1>
      <Form className="justify-content-lg-center mt-5">
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
            onChange={(e) => SetState(e.target.value)}
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

        <Button
          className="mb-3"
          variant="primary"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Form>
    </Col>
  );
};

export default ShippingPage;
