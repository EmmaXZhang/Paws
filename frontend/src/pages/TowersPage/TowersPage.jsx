import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import backgroundImage from "/images/dog-page.jpeg";
import { Link } from "react-router-dom";

const TowersPage = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  let filteredProducts = products;
  filteredProducts = filteredProducts.filter((product) => product.category === "Cat Tower");

  return (
    <>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span>Dog Beds</span>
          </Col>
        </Row>
      </div>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {error.message}</Message>
      ) : (
        <div>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default TowersPage;
