import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";

export default function ProductPage() {
  // match route endpoint
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

  function addToCartHandler() {
    // product -> data:product
    // merge proudct and quantity into one object, which is the payload in the action
    dispatch(addToCart({ ...product, quantity }));
    // navigate("/cart");
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {error.message}</Message>
      ) : (
        <>
          <Row>
            <Col md={7}>
              <Image src={product.image} alt={product.name} rounded fluid />
            </Col>

            <Col md={5}>
              <Card>
                <ListGroup variant="flush">
                  <p>PAWS</p>
                  <h3>{product.name}</h3>

                  <strong>${product.price}</strong>
                  <ListGroup horizontal>
                    <ListGroup.Item>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>FREE 60 DAY RETURNS</ListGroup.Item>
                  </ListGroup>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {/* gives array of inStock-1, starting from 0 */}
                            {[...Array(product.countInStock).keys()].map(
                              (num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                        <Col>
                          <Button
                            className="btn-block"
                            type="button"
                            variant="outline-dark"
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                          >
                            Add To Cart
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
