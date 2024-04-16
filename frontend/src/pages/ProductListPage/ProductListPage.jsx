import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Button, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import ProductList from "../../components/ProductList/ProductList";
import { toast } from "react-toastify";

import { useCreateProductMutation } from "../../slices/productsApiSlice";

const ProductListPage = () => {
  const { data: products, isLoading, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  async function createProductHandler() {
    try {
      await createProduct();
      refetch();
    } catch (error) {
      toast.error(error.error);
    }
  }

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
          <Button className="my-3" variant="dark" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </>
      )}
      {loadingCreate && <Loader />}
    </>
  );
};

export default ProductListPage;
