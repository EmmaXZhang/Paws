import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../slices/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShippingAddress from "../../components/ShippingAddress/ShippingAddress";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [state, SetState] = useState(shippingAddress.state || "");
  const [zip, setZip] = useState(shippingAddress.zip || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, state, zip, country }));
    toast.success("Shipping Address saved");
  }

  return (
    <Col xs={12} md={6}>
      <h1>Shipping Address</h1>
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
  );
};

export default ShippingPage;
