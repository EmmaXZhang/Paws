import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useGetOrderByIdQuery } from "../../slices/ordersApiSlice";
import paymentImg from "/images/payment.png";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import img from "/images/processPayment.jpeg";
import "./ProcessPaymentPage.css";

const ProcessPaymentPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <Card style={{ border: "none", backgroundColor: "RGB(249, 243, 241)" }}>
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Image
                    variant="left"
                    src={img}
                    roundedCircle
                    style={{ width: "140px", height: "140px", marginRight: "10px" }}
                  />
                </div>

                <Card.Text>
                  <ListGroup.Item style={{ backgroundColor: "RGB(249, 243, 241)" }}>
                    <p>
                      <strong>Order: </strong> {order._id}
                    </p>
                    <p>
                      <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong> {order.user.email}
                    </p>
                    <p>
                      <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                    </p>
                  </ListGroup.Item>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
          <div className="processPayment mt-5">
            <OrderDetail order={order} />
          </div>
        </Col>

        <Col md={6}>
          <Image src={paymentImg} />
        </Col>
      </Row>
    </div>
  );
};

export default ProcessPaymentPage;
