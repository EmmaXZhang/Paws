/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import "./CartPage.css";
import ProductsYouMightLike from "../../components/ProductsYouMightLike/ProductsYouMightLike";
import CartItemsList from "../../components/CartItemsList/CartItemsList";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useSelector to get state data from store
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
      <Col md={5} lg={4} className="cart-card">
        <h2>You Might Also Like</h2>
        <ProductsYouMightLike addToCartHandler={addToCartHandler} />
      </Col>
      <Col md={7} lg={8} className="cartitems">
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
            <CartItemsList
              cartItems={cartItems}
              addToCartHandler={addToCartHandler}
              removeFromCartHandler={removeFromCartHandler}
            />
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
