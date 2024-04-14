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
        <>
          <Accordion defaultActiveKey="0">
            {orders.map((order, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  <Row>
                    <b>Order Number</b>
                    <b>Payment</b>
                    <b>Order Status</b>
                    <b>Create Date</b>
                  </Row>
                  <Row>
                    <span>{order._id}</span>
                    <Link to={`/orders/${order._id}`}>Procee to Pay</Link>
                    <span>{order.isDelivered ? "Delivered" : "Not Delivered"}</span>
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      ) : (
        <p>No orders found.</p>
      )}
    </>
  );
};

export default MyOrdersPage;
