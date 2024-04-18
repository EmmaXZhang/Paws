import { Link } from "react-router-dom";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import "./ProductPage.css";
import ProductPriceCard from "../../components/ProductPriceCard/ProductPriceCard";
import { useGetProductDetailsQuery } from "../../slices/productsApiSlice";

import { useParams } from "react-router-dom";

export default function ProductPage() {
  // match route endpoint
  const { id } = useParams();

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

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
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
