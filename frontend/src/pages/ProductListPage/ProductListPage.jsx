/* eslint-disable no-unused-vars */
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Button, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";
import ProductList from "../../components/ProductList/ProductList";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useCreateProductMutation } from "../../slices/productsApiSlice";
import { useState } from "react";

const ProductListPage = () => {
  const { data: products, isLoading, refetch } = useGetProductsQuery();
  const [show, setShow] = useState(false);

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  async function createProductHandler() {
    try {
      const res = await createProduct({
        name,
        price,
        image,
        brand,
        category,
        petCategory,
        countInStock,
        description,
      }).unwrap();
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
                <Form onSubmit={createProductHandler}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="price"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" value={image} onChange={(e) => setImage(e.target.files[0])} autoFocus />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="category"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="petCategory">
                    <Form.Label>Pet Category</Form.Label>
                    <Form.Select value={petCategory} onChange={(e) => setPetCategory(e.target.value)}>
                      <option value="">Select Pet Category</option>
                      <option value="dogs">Dogs</option>
                      <option value="cats">Cats</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Count InStock</Form.Label>
                    <Form.Control
                      type="countInStock"
                      placeholder="Enter stock number"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="countInStock">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-center mt-4">
                    <Button type="submit">Create Product</Button>
                  </div>
                </Form>
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
