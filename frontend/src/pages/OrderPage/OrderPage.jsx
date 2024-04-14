import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";

const OrderPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useGetProductDetailsQuery(id);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name: </strong> {order.user.name}
            </p>
            <p>
              <strong>Email: </strong>
              {order.user.email}
            </p>
            <p>
              <strong>Address:</strong>
              {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{" "}
              {order.shippingAddress.country}
            </p>
          </ListGroup.Item>
          <ListGroup variant="flush">
            {order.orderItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <Row>
                  <Col md={1}>
                    <Image src={item.product.image} alt={item.product.name} fluid rounded />
                  </Col>
                  <Col>
                    <Link to={`/product/${item.product}`}>{item.product.name}</Link>
                  </Col>
                  <Col md={4}>
                    {item.quantity} x ${item.price} = ${item.quantity * item.price}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}

            <ListGroup.Item>
              <Col md={6}>Total Price</Col>
              <Col md={6}>{order.totalPrice}</Col>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderPage;