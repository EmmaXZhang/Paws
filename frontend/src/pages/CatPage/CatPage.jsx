import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useGetProductsByCategoryQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import backgroundImage from "/images/cat-page.jpeg";
import "./CatPage.css";
import ProductFilter from "../../components/ProductFilter/ProductFilter";
import { useState } from "react";

export default function DogPage() {
  const { data: products, isLoading, error } = useGetProductsByCategoryQuery("cats");

  const [categorySelect, setCategorySelect] = useState(null);

  let categoryList = new Set();
  //create category list
  if (products) {
    products.forEach((product) => categoryList.add(product.category));
    categoryList = Array.from(categoryList);
  }

  let filteredProducts = products;

  if (categorySelect) {
    filteredProducts = filteredProducts.filter((product) => product.category === categorySelect);
  }

  function categorySelectHandler(selectedCategory) {
    setCategorySelect(selectedCategory === categorySelect ? null : selectedCategory);
  }

  return (
    <>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span>CATS</span>
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
            <p className="mt-5">FILTER BY:</p>
          </Row>
          <Row>
            <div className="mb-2 productCategory">
              <ProductFilter
                categorySelect={categorySelect}
                categoryList={categoryList}
                categorySelectHandler={categorySelectHandler}
              />
            </div>
          </Row>
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
}
