import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useGetOrderByIdQuery } from "../../slices/ordersApiSlice";
import paymentImg from "/images/payment.png";
import OrderDetail from "../../components/OrderDetail/OrderDetail";

const ProcessPaymentPage = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useGetOrderByIdQuery(id);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <Row>
        <Col md={6}>
          <ListGroup.Item>
            <p>
              <strong>Order: </strong> {order._id}
            </p>
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
          <OrderDetail order={order} />
        </Col>
        <Col md={6}>
          <Image src={paymentImg} />
        </Col>
      </Row>
    </>
  );
};

export default ProcessPaymentPage;
