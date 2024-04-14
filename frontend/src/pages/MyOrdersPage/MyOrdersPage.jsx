import Loader from "../../components/Loader/Loader";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { Accordion, Row, Col, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyOrdersPage = () => {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  return (
    <>
      <h2>My Orders</h2>
      {isLoading ? (
        <Loader />
      ) : orders.length > 0 ? (
        <Accordion defaultActiveKey="0">
          {orders.map((order, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>
                <div className="container-fluid d-flex justify-content-between ">
                  <span>
                    <b>Order No:</b> {order._id}
                  </span>
                  <span>{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  {order.orderItems.map((item, innerIndex) => (
                    <ListGroup.Item key={innerIndex}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={4}>
                          <span>{item.name}</span>
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = ${item.quantity * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>
                        <b>Total Price</b>
                      </Col>
                      <Col md={2}></Col>
                      <Col md={4}>
                        <b>${order.totalPrice}</b>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <p>No orders found.</p>
      )}
    </>
  );
};

export default MyOrdersPage;
