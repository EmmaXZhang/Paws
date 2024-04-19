import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { Row, Col, Image, ListGroup, Toast, Card } from "react-bootstrap";
import "./ProductPage.css";
import ProductPriceCard from "../../components/ProductPriceCard/ProductPriceCard";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import { useEffect } from "react";

export default function ProductPage() {
  // match route endpoint
  const { id } = useParams();
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(id);

  //change priceCard background color when scroll down page
  useEffect(() => {
    const priceCard = document.getElementById("priceCard");

    function changeCardBackgroundColor() {
      if (window.scrollY > 100) {
        priceCard.style.backgroundColor = "rgb(249, 243, 241)";
      } else {
        priceCard.style.backgroundColor = "";
      }
    }
    window.addEventListener("scroll", changeCardBackgroundColor);
    // Cleanup function to remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", changeCardBackgroundColor);
    };
  }, []);

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
            <Col md={7} lg={7}>
              <Row>
                <Image src={product.image} alt={product.name} rounded fluid className="productImg" />
              </Row>
              <Row>
                <ListGroup variant="flush">
                  <ListGroup.Item className="mt-4">Description: {product.description}</ListGroup.Item>
                  <ListGroup.Item className="mt-3">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  </ListGroup.Item>

                  {/* Review Form */}
                  <ListGroup.Item>
                    <ReviewForm id={id} refetch={refetch} />
                  </ListGroup.Item>

                  {/* all reviews */}
                  <ListGroup.Item className="reviewGallery">
                    <h2 className="mt-4">Reviews</h2>
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
              </Row>
            </Col>
            <Col md={5} lg={5}>
              <div className="productPriceCardContainer">
                <ProductPriceCard product={product} id="priceCard" />
              </div>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
