/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddress from "../../components/ShippingAddress/ShippingAddress";
import { savePayment } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

const ShippingPage = () => {
  // shipping Address part
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, SetState] = useState(shippingAddress.state || "");
  const [zip, setZip] = useState(shippingAddress.zip || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  // payment part
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // shippingAddress
  function submitHandler(e) {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, state, zip, country }));
    toast.success("Shipping Address saved");
  }

  // payment
  function submitPaymentHandler(e) {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    setPaymentMethod(e.target.value);
    navigate("/placeorder");
  }

  return (
    <Row>
      <Col xs={12} md={6}>
        <h2>Shipping Address</h2>
        <ShippingAddress
          address={address}
          city={city}
          state={state}
          zip={zip}
          country={country}
          setAddress={setAddress}
          setCity={setCity}
          setState={SetState}
          setZip={setZip}
          setCountry={setCountry}
          submitHandler={submitHandler}
        />
      </Col>
      <Col xs={12} md={4}>
        <h2>Payment Method</h2>

        <Form
          onSubmit={submitPaymentHandler}
          className="justify-content-lg-center mt-5"
        >
          <Form.Group>
            <Col>
              <Form.Check
                className="my-2"
                type="radio"
                label="PayPal"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                className="my-2"
                type="radio"
                label=" Credit Card"
                id="CreditCard"
                name="paymentMethod"
                value="CreditCard"
                checked={paymentMethod === "CreditCard"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ShippingPage;
