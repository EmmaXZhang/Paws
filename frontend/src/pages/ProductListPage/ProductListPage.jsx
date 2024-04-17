/* eslint-disable no-unused-vars */
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Button, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import ProductList from "../../components/ProductList/ProductList";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";

import { useCreateProductMutation } from "../../slices/productsApiSlice";
import { useState } from "react";
import { useUploadProductImageMutation } from "../../slices/productsApiSlice";
import CreateProductForm from "../../components/CreateProductForm/CreateProductForm";

const ProductListPage = () => {
  const { data: products, isLoading, refetch } = useGetProductsQuery();
  const [show, setShow] = useState(false);

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImageUrl(res.secure_url);
      setCloudinaryId(res.public_id);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  async function createProductHandler(event) {
    event.preventDefault();

    try {
      // now the product has the imageUrl
      const product = {
        name,
        price,
        image: imageUrl,
        cloudinaryId,
        brand,
        category,
        petCategory,
        countInStock,
        description,
      };
      const res = await createProduct(product).unwrap();
      toast.success("Product created successfully");
      setShow(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    refetch();
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

          {/* Create Product */}
          <Button className="my-3" variant="dark" onClick={() => setShow(true)}>
            <FaPlus /> Create Product
          </Button>
          <Modal show={show} onHide={() => setShow(false)} size="lg">
            <Modal.Header closeButton className="editForm">
              <Modal.Title>Create Product</Modal.Title>
            </Modal.Header>
            <Modal.Body className="editForm">
              {isLoading ? (
                <Loader />
              ) : (
                <CreateProductForm
                  name={name}
                  price={price}
                  brand={brand}
                  category={category}
                  petCategory={petCategory}
                  countInStock={countInStock}
                  description={description}
                  setName={setName}
                  setPrice={setPrice}
                  setBrand={setBrand}
                  setCategory={setCategory}
                  setPetCategory={setPetCategory}
                  setCountInStock={setCountInStock}
                  setDescription={setDescription}
                  createProductHandler={createProductHandler}
                  uploadFileHandler={uploadFileHandler}
                  loadingUpload={loadingUpload}
                />
              )}
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal>
        </>
      )}
      {loadingCreate && <Loader />}
    </>
  );
};

export default ProductListPage;
