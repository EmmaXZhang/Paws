/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useUpdateProductMutation, useGetProductDetailsQuery } from "../../slices/productsApiSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

const ProductList = ({ products }) => {
  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState("");

  // fields need to be updated
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  // get product detail on localstorage
  const { data: product, isLoading, refetch } = useGetProductDetailsQuery(productId);
  // update product mutation
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  // show Modal and get productId
  function editProductHandler(productId) {
    setShow(true);
    setProductId(productId);
  }

  // prefill the formdata
  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setPetCategory(product.petCategory);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  // save changes
  async function saveChangeHandler(e) {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        petCategory,
        description,
        countInStock,
      }).unwrap();
      toast.success("Product updated");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <>
      <Table striped bordered hover responsive className="table-sm mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                {/* <Link to={`/admin/products/${product._id}/edit`}> */}
                <Button variant="light" className="btn-sm mx-2" onClick={() => editProductHandler(product._id)}>
                  <FaEdit />
                </Button>
                {/* </Link> */}
                <Button variant="danger" className="btn-sm">
                  <FaTrash style={{ color: "white" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <Loader />
          ) : (
            <Form onSubmit={saveChangeHandler}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" autoFocus />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="category"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer> {isUpdating && <Loader />}</Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;
