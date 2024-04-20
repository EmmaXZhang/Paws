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
import ProductSort from "../../components/ProductSort/ProductSort";

export default function DogPage() {
  const { data: products, isLoading, error } = useGetProductsByCategoryQuery("dogs");

  const [sort, setSort] = useState(null);
  const [categorySelect, setCategorySelect] = useState(null);

  let categoryList = new Set();

  //create category list
  if (products) {
    products.forEach((product) => categoryList.add(product.category));
    categoryList = Array.from(categoryList);
  }

  //displayed products
  let filteredProducts = products;

  // filter applied
  if (categorySelect) {
    filteredProducts = filteredProducts.filter((product) => product.category === categorySelect);
  }

  // sort applied
  if (sort) {
    const [sortBy, sortOrder] = sort.split(":");
    filteredProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === "Price") {
        return sortOrder === "High to Low" ? b.price - a.price : a.price - b.price;
      } else if (sortBy === "Product") {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder == "New to Old" ? dateB - dateA : dateA - dateB;
      }
    });
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
          {/* filter products */}
          <Row>
            <p className="mt-5">FILTER BY:</p>
          </Row>
          <Row>
            <Col sm={6}>
              <div className="mb-2 productCategory d-flex justify-content-start">
                <ProductFilter
                  categorySelect={categorySelect}
                  categoryList={categoryList}
                  setCategorySelect={setCategorySelect}
                />
              </div>
            </Col>
            {/* sort product */}
            <Col className="productSort d-flex justify-content-end" sm={6}>
              <ProductSort sort={sort} setSort={setSort} />
            </Col>
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
