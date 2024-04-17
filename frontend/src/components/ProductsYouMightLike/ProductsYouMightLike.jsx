/* eslint-disable react/prop-types */
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Col } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./ProductsYouMightLike.css";

const ProductsYouMightLike = ({ addToCartHandler }) => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <section>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {error.message}</Message>
      ) : (
        <>
          {products.slice(0, 6).map((product) => (
            <Col key={product._id} sm={10} md={10} lg={10} xl={10} className="mb-5">
              <Card className="you-might-like-card">
                <Card.Body className="d-flex">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "5rem", height: "auto" }}
                    className="youlike-img"
                  />

                  <div className="ml-3">
                    <Card.Title>
                      <Link to={`/products/${product._id}`}>{product.name}</Link>
                    </Card.Title>
                    <Card.Text style={{ fontSize: "25px" }}>${product.price}</Card.Text>
                    <Button variant="outline-dark" onClick={() => addToCartHandler(product, 1)}>
                      ADD TO CART &gt;
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </>
      )}
    </section>
  );
};

export default ProductsYouMightLike;
