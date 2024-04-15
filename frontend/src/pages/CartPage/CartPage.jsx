/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import "./CartPage.css";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useSelector to get state data to notify UI
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const cartItemsNumber = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function addToCartHandler(product, quantity) {
    dispatch(addToCart({ ...product, quantity }));
  }

  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }

  function checkOutHandler() {
    navigate("/login?redirect=/checkout");
  }

  return (
    <Row className="CartPart">
      <Col md={4}>You Might Also Like</Col>
      <Col md={8} className="cartitems">
        <Row className="cartitems my-4 mx-4">
          <h1 className="mb-4">
            CART <span>{cartItemsNumber} ITEMS</span>{" "}
          </h1>
          <div style={{ width: "100%", height: "10px", backgroundColor: "RGB(58, 58, 62)" }} className="rounded"></div>

          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush" className="mt-5">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col md={3}>
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.quantity}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      >
                        {[...Array(item.countInStock).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)}>
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Row>

        <Row>
          <Card className="subtotalCard">
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between">
                <h2>SUBTOTAL</h2>
                <span>${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="custom-button"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  CHECK OUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Row>
      </Col>
    </Row>
  );
};

export default CartPage;
