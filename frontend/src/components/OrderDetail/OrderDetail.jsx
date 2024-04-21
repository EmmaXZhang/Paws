/* eslint-disable react/prop-types */
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderDetail = ({ order }) => {
  return (
    <ListGroup variant="flush">
      {order.orderItems.map((item, innerIndex) => (
        <ListGroup.Item key={innerIndex}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={6}>
              <Link to={`/products/${item.product}`}>{item.name}</Link>
            </Col>
            <Col md={4} className="d-flex d-flex justify-content-end">
              {item.quantity} x ${item.price} = ${item.quantity * item.price}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <div className="d-flex justify-content-between">
          <p>SubTotal</p>
          <p>${order.itemsPrice}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Shipping Price</p>
          <p>${order.shippingPrice}</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Tax Price</p>
          <p>${order.taxPrice}</p>
        </div>
        <div className="d-flex justify-content-between">
          <b>Total Price</b>
          <b>${order.totalPrice}</b>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default OrderDetail;
