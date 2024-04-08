/* eslint-disable no-undef */
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import "./HomePage.css";
import HomePageCategory from "../../components/HomePageCategory/HomePageCategory";
import HeroBanner from "./HeroBanner";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <HeroBanner />

      <section>
        <Row xs={1} md={3}>
          <HomePageCategory />
        </Row>
      </section>

      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <>
            <h1>Latest Products</h1>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </section>
    </>
  );
}
