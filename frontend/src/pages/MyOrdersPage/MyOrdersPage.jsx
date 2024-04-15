import Loader from "../../components/Loader/Loader";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { Accordion, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import backgroundImage from "/images/dog-page.jpeg";

const MyOrdersPage = () => {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  return (
    <>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span>MY ORDERS</span>
          </Col>
        </Row>
      </div>

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
                    <b>Payment Status</b>
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
                  <OrderDetail order={order} />
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
