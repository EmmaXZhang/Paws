import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useEffect, useState } from "react";
import * as productsAPI from "../../utilities/products-api";

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
      <div></div>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}
