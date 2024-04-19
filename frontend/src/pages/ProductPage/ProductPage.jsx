import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { Row, Col, Image, ListGroup, Toast } from "react-bootstrap";
import "./ProductPage.css";
import ProductPriceCard from "../../components/ProductPriceCard/ProductPriceCard";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";

import { useParams } from "react-router-dom";

import ReviewForm from "../../components/ReviewForm/ReviewForm";

export default function ProductPage() {
  // match route endpoint
  const { id } = useParams();
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id);

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
            <Col md={7} lg={7} className="productImg">
              <Image src={product.image} alt={product.name} rounded fluid />
            </Col>

            <Col md={5} lg={5}>
              <ProductPriceCard product={product} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ListGroup variant="flush">
                <ListGroup.Item className="mt-4">Description: {product.description}</ListGroup.Item>
                <ListGroup.Item className="mt-3">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <ReviewForm id={id} refetch={refetch} />
                </ListGroup.Item>
                <ListGroup.Item className="reviewGallery">
                  <h2>Reviews</h2>
                  <div className="d-flex flex-wrap">
                    {product.reviews.length === 0 && <p>No Reviews</p>}
                    {product.reviews.map((review) => (
                      <Toast key={review._id}>
                        <Toast.Header>
                          <strong className="me-auto">{review.name}</strong>
                          <small>{review.createdAt.substring(0, 10)}</small>
                        </Toast.Header>
                        <Toast.Body>{review.comment}</Toast.Body>
                        <Toast.Body>
                          <Rating value={review.rating} />
                        </Toast.Body>
                      </Toast>
                    ))}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
