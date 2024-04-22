import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import backgroundImage from "/images/all-product-page.webp";
import "./AllProductPage.css";
// import { useParams } from "react-router-dom";

const AllProductpage = () => {
  // const { searchTerm } = useParams();

  const { data: products, isLoading, error } = useGetProductsQuery();
  return (
    <>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span>All Products</span>
          </Col>
        </Row>
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">Error: {error.message}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mt-4">
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
};

export default AllProductpage;
