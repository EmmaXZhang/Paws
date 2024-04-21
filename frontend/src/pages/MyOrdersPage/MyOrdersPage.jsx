import Loader from "../../components/Loader/Loader";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { Accordion, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import backgroundImage from "/images/all-product-page.webp";
import "./MyOrdersPage.css";
import { Button } from "react-bootstrap";
import { useDeleteOrderMutation } from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";

const MyOrdersPage = () => {
  const { data: orders, isLoading, refetch } = useGetMyOrdersQuery();

  const [deleteOrder, { isLoading: deletingOrder }] = useDeleteOrderMutation();

  async function cancelOrderHandler(orderId) {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteOrder(orderId);
        toast.success("Order delete successfully");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }

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
                      <div className="mb-2">Order Number</div>
                      <div className="mb-2">Payment Status</div>
                      <div className="mb-2">Order Status</div>
                      <div className="mb-2">Create Date</div>
                    </Col>
                    <Col sm={6} md={6}>
                      <div className="mb-2">{order._id}</div>
                      {order.isPaid ? (
                        <div className="paystatus mb-2">Paid</div>
                      ) : (
                        <div className="mb-2">
                          <Link to={`/orders/${order._id}`}>Process to Pay</Link>
                        </div>
                      )}

                      {order.isDelivered ? (
                        <div className="deliverstatus mb-2">Delivered</div>
                      ) : (
                        <div className="mb-2">Not Delivered</div>
                      )}

                      <div className="mb-2">
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
                  <div className="d-flex justify-content-between">
                    <b></b>
                    <Button
                      className="mt-4"
                      variant="outline-danger"
                      size="sm"
                      onClick={() => cancelOrderHandler(order._id)}
                      disabled={order.isPaid}
                    >
                      Cancel Order
                    </Button>
                    {deletingOrder && <Loader />}
                  </div>
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
