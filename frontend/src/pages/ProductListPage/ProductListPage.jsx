/* eslint-disable no-unused-vars */
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Row, Col } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import ProductList from "../../components/ProductList/ProductList";
import { toast } from "react-toastify";
import CreateProductForm from "../../components/CreateProductForm/CreateProductForm";

const ProductListPage = () => {
  const { data: products, isLoading, refetch } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div
            className="background-image d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "RGB(58, 58, 62)", height: "150px" }}
          >
            <div className="overlay" style={{ zIndex: 0 }}></div>
            {/* Product List */}
            <Row style={{ zIndex: 1 }}>
              <Col>
                <span style={{ fontSize: "36px" }}>Product List</span>
              </Col>
            </Row>
          </div>
          {products && products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <Message>No products found.</Message>
          )}

          {/* Create Product */}
          <CreateProductForm refetch={refetch} />
        </>
      )}
    </>
  );
};

export default ProductListPage;
