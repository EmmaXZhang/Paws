import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import { useGetOrderByIdQuery, usePayOrderMutation, useDeliverOrderMutation } from "../../slices/ordersApiSlice";
import paymentImg from "/images/payment.png";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import img from "/images/processPayment.jpeg";
import "./ProcessPaymentPage.css";
import { Link } from "react-router-dom";
import backgroundImage from "/images/all-product-page.webp";
import { useSelector } from "react-redux";
import Message from "../../components/Message";
import { toast } from "react-toastify";

const ProcessPaymentPage = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, refetch } = useGetOrderByIdQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDelivery }] = useDeliverOrderMutation();

  const { userData } = useSelector((state) => state.auth);

  async function paymentHandler() {
    try {
      await payOrder(orderId);
      refetch();
      toast.success("Order is paid");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  async function deliveryHandler() {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order is delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>{order.isPaid || userData.isAdmin ? <span>Order Details</span> : <span>Payment</span>}</Col>
        </Row>
      </div>

      <Row>
        <Col md={8} lg={7} className="ProceedPayment">
          <h2>Profile</h2>
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
              </div>
            </Card.Body>
          </Card>
          <h2 className="mt-5">Order Details</h2>
          <div className="processPayment">
            <OrderDetail order={order} />
          </div>
        </Col>
        <Col md={4} lg={5} className="ProceedPayment">
          <>
            <h2>Deliver Status</h2>
            {order.isDelivered ? (
              <Message variant="success">Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message variant="danger">Not Delivered</Message>
            )}

            <h2>Payment Status</h2>
            {order.isPaid ? (
              <Message variant="success">Paid on {order.paidAt}</Message>
            ) : (
              <Message variant="danger">Not paid</Message>
            )}
          </>
          {userData.isAdmin ? (
            <>
              <Button className="payment-btn btn btn-light my-3 bold" onClick={deliveryHandler}>
                Deliver Order
              </Button>
              <Link className="payment-btn btn btn-light my-3 bold" to="/admin/orderlist">
                Go Back
              </Link>
              {loadingDelivery && <Loader />}
            </>
          ) : (
            <>
              <Image src={paymentImg} className="proceedpayment-img" />

              <Button className="payment-btn btn btn-light my-3 bold" onClick={paymentHandler}>
                {" "}
                Pay{" "}
              </Button>
              {loadingPay && <Loader />}

              {userData.isAdmin ? (
                <Link className="payment-btn btn btn-light my-3 bold" to="/admin/orderlist">
                  Go Back
                </Link>
              ) : (
                <Link className="payment-btn btn btn-light my-3 bold" to="/orders/myorders">
                  Go Back
                </Link>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProcessPaymentPage;
