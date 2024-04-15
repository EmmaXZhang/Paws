/* eslint-disable no-unused-vars */
import { Row, Col, ButtonGroup, Dropdown, DropdownButton, SplitButton } from "react-bootstrap";
import Product from "../../components/Product/Product";
import { useGetProductsByCategoryQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import backgroundImage from "/images/dog-page.jpeg";
import "./DogPage.css";
import { useState } from "react";
import ProductFilter from "../../components/ProductFilter/ProductFilter";

export default function DogPage() {
  const { data: products, isLoading, error } = useGetProductsByCategoryQuery("dogs");

  const [categorySelect, setCategorySelect] = useState(null);

  let categoryList = new Set();
  //create category list
  if (products) {
    products.forEach((product) => categoryList.add(product.category));
    categoryList = Array.from(categoryList);
  }
  categoryList.unshift("All Products");

  let filteredProducts = products;

  if (categorySelect !== "All Products") {
    filteredProducts = filteredProducts.filter((product) => product.category === categorySelect);
  }

  function categorySelectHandler(selectedCategory) {
    setCategorySelect(selectedCategory);
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
            <span>DOGS</span>
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
