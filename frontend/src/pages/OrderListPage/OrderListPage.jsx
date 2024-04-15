import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const OrderListPage = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();

  return (
    <>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "RGB(58, 58, 62)", height: "150px" }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span style={{ fontSize: "36px" }}>Order List</span>
          </Col>
        </Row>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm mt-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? "Paid" : <FaTimes style={{ color: "red" }} />}</td>
                <td>{order.isDelivered ? "Delivered" : <FaTimes style={{ color: "red" }} />}</td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListPage;
