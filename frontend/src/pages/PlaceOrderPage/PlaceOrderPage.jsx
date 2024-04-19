import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCart } from "../../slices/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "./PlaceOrderPage.css";

const PlaceOrderPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/checkout");
      toast.error("Please fill up address");
    } else if (!cart.payment) {
      navigate("/checkout");
      toast.error("Please select payment method");
    }
  }, [cart.payment, cart.shippingAddress.address, navigate]);

  async function placeOrderHandler() {
    try {
      await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.payment,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      //clear cart
      dispatch(clearCart());

      navigate("/orders/myorders");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "RGB(58, 58, 62)", height: "150px" }}
      >
        {" "}
        <div className="overlay" style={{ zIndex: 0 }}></div>
        {/* Product List */}
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span style={{ fontSize: "36px" }}>Place Order</span>
          </Col>
        </Row>
      </div>
      <Row>
        <Col md={8} className="mt-3 order-detail">
          <ListGroup variant="flush">
            <ListGroup.Item className="mt-5">
              <h2>Shipping Address</h2>
              <p>
                {cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.state},
                {cart.shippingAddress.zip},{cart.shippingAddress.country}{" "}
              </p>
            </ListGroup.Item>
            <ListGroup.Item className="mt-3">
              <h2>Payment method</h2>

              <p>{cart.payment}</p>
            </ListGroup.Item>

            <ListGroup.Item className="mt-3">
              <h2>Order Items</h2>
              <div>
                {cart.cartItems.length === 0 ? (
                  <Message>Empty Cart</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={3}>
                            <Image src={item.image} alt={item.name} fluid rounded />
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
                  </ListGroup>
                )}
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} className="mt-3">
          <Card className="mt-5 order-summary">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-center">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
