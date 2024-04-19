/* eslint-disable react/prop-types */
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import "./ProductPriceCard.css";

const ProductPriceCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  function addToCartHandler() {
    // product -> data:product
    // merge proudct and quantity into one object, which is the payload in the action
    dispatch(addToCart({ ...product, quantity }));
  }

  function increaseQty() {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  }

  function decreseQty() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <Card className="productPriceCard" id="priceCard">
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
                <div className="quantity-field">
                  <button className="value-button decrease-button" onClick={decreseQty} title="Azalt">
                    -
                  </button>
                  <div className="number">{quantity}</div>
                  <button className="value-button increase-button" onClick={increaseQty} title="Arrtir">
                    +
                  </button>
                </div>
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
