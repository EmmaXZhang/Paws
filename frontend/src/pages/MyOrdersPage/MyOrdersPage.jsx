import Loader from "../../components/Loader/Loader";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { Accordion, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import backgroundImage from "/images/all-product-page.webp";
import "./MyOrdersPage.css";

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
      ) : (
        <>
          <Accordion defaultActiveKey="0">
            {orders.map((order, index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header className="myorders">
                  <Row>
                    <Col sm={6} md={6}>
                      <div>Order Number</div>
                      <div>Payment Status</div>
                      <div>Order Status</div>
                      <div>Create Date</div>
                    </Col>
                    <Col sm={6} md={6}>
                      <div>{order._id}</div>
                      {order.isPaid ? (
                        <div className="paystatus">Paid</div>
                      ) : (
                        <Link to={`/orders/${order._id}`}>Process to Pay</Link>
                      )}
                      <div>{order.isDelivered ? "Delivered" : "Not Delivered"}</div>
                      <div>
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body>
                  <OrderDetail order={order} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </>
      )}
    </>
  );
};

export default MyOrdersPage;
