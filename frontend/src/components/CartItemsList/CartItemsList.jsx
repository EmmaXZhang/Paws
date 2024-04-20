/* eslint-disable react/prop-types */
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartItemsList = ({ cartItems, addToCartHandler, removeFromCartHandler }) => {
  return (
    <ListGroup variant="flush" className="mt-5">
      {cartItems.map((product) => (
        <ListGroup.Item key={product._id}>
          <Row>
            <Col md={2}>
              <Image src={product.image} alt={product.name} fluid rounded />
            </Col>

            <Col md={3}>
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </Col>

            <Col md={3}>${product.price}</Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={product.quantity}
                onChange={(e) => addToCartHandler(product, Number(e.target.value))}
              >
                {[...Array(product.countInStock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button type="button" variant="light" onClick={() => removeFromCartHandler(product._id)}>
                <FaTrash />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default CartItemsList;
