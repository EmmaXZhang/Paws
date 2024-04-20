/* eslint-disable react/prop-types */
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import "./ProductPriceCard.css";
import QuantityField from "../QuantityField/QuantityField";

const ProductPriceCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const priceCardRef = useRef(null);

  useEffect(() => {
    const priceCard = priceCardRef.current;

    function changeCardBackgroundColor() {
      if (window.scrollY > 100) {
        priceCard.style.backgroundColor = "rgb(249, 243, 241)";
      } else {
        priceCard.style.backgroundColor = "";
      }
    }

    window.addEventListener("scroll", changeCardBackgroundColor);

    return () => {
      window.removeEventListener("scroll", changeCardBackgroundColor);
    };
  }, []);

  function addToCartHandler() {
    // product -> data:product
    // merge proudct and quantity into one object, which is the payload in the action
    dispatch(addToCart({ ...product, quantity }));
  }

  return (
    <Card className="productPriceCard" ref={priceCardRef}>
      <ListGroup variant="flush">
        <p>PAWS</p>
        <h3>{product.name}</h3>

        <h3>${product.price}</h3>
        <ListGroup horizontal>
          <ListGroup.Item>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</ListGroup.Item>
          <ListGroup.Item>FREE 60 DAY RETURNS</ListGroup.Item>
        </ListGroup>

        {product.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col sm={4} md={6} lg={4} className="text-start">
                <QuantityField quantity={quantity} setQuantity={setQuantity} product={product} />
              </Col>
              <Col sm={8} md={6} lg={8}>
                <Button
                  className="btn-block mb-4"
                  type="button"
                  variant="outline-dark"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
      </ListGroup>
      <ListGroup.Item className="pickup">
        <p className="mt-4">PICKUP AVAILABLE AT STORE </p>
        <p style={{ fontSize: "13px" }}>Ready in about 2-4 days</p>
      </ListGroup.Item>
    </Card>
  );
};

export default ProductPriceCard;
