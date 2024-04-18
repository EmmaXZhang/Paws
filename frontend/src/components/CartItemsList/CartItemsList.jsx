/* eslint-disable react/prop-types */
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartItemsList = ({ cartItems, addToCartHandler, removeFromCartHandler }) => {
  return (
    <ListGroup variant="flush" className="mt-5">
      {cartItems.map((item) => (
        <ListGroup.Item key={item._id}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>

            <Col md={3}>
              <Link to={`/products/${item._id}`}>{item.name}</Link>
            </Col>

            <Col md={3}>${item.price}</Col>
            <Col md={2}>
              <Form.Control
                as="select"
                value={item.quantity}
                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
              >
                {[...Array(item.countInStock).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={2}>
              <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}>
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
