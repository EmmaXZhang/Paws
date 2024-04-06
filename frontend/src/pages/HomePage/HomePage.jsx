import { Row, Col, Button } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useEffect, useState } from "react";
import * as productsAPI from "../../utilities/products-api";
import "./HomePage.css";
import HomePageCategory from "../../components/HomePageCategory/HomePageCategory";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const products = await productsAPI.getProducts();
        setProducts(products);
      } catch (err) {
        console.log("loadding journal errors", err);
      }
    })();
  }, []);

  return (
    <>
      {/* hero section */}
      <Row className="background-video">
        <video autoPlay loop muted>
          <source src="/homepage-video.mp4" type="video/mp4" />
        </video>
        <div>
          <h1 className="background-words">LUXURY FASHION FOR PETS</h1>
          <Button variant="outline-light">SHOP NOW</Button>
        </div>
      </Row>

      <Row xs={1} md={3}>
        <HomePageCategory />
      </Row>

      <Row>
        <h1>Latest Products</h1>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
