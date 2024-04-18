/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Table, Button, Row } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import "./ProductList.css";
import { useUploadProductImageMutation } from "../../slices/productsApiSlice";
import { useDeleteProductImageMutation } from "../../slices/productsApiSlice";

const ProductList = ({ products }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryId, setCloudinaryId] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [petCategory, setPetCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const [show, setShow] = useState(false);
  const [productId, setProductId] = useState("");

  // get product detail on localstorage
  const { data: product, isLoading, refetch } = useGetProductDetailsQuery(productId);
  const { refetch: refetchProducts } = useGetProductsQuery();

  // update product mutation
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [deleteImage] = useDeleteProductImageMutation();

  // show Modal and get productId
  function editProductHandler(productId) {
    setShow(true);
    setProductId(productId);
  }

  function closeEditForm() {
    setShow(false);
    refetchProducts();
  }

  // prefill the formdata
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price || "");
      setImageUrl(product.image || "");
      setBrand(product.brand || "");
      setCategory(product.category || "");
      setPetCategory(product.petCategory || "");
      setCountInStock(product.countInStock || "");
      setDescription(product.description || "");
    }
  }, [product]);

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

  // save changes
  async function saveChangeHandler(e) {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image: imageUrl,
        brand,
        category,
        petCategory,
        description,
        countInStock,
      }).unwrap();
      toast.success("Product updated");
      setShow(false);
      refetchProducts();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  }

  async function deleteProductHandler(productId, productCloudinaryId) {
    if (window.confirm("Are you sure ?")) {
      try {
        console.log("productCloudinaryId", productCloudinaryId);
        await deleteProduct(productId);
        await deleteImage(productCloudinaryId);
        refetchProducts();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  }

  return (
    <>
      <Table striped bordered hover responsive className="table-sm mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGE</th>
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
              <td>
                <img src={product.image} style={{ height: "60px" }} />
              </td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <Button variant="light" className="btn-sm mx-2" onClick={() => editProductHandler(product._id)}>
                  <FaEdit />
                </Button>

                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteProductHandler(product._id, product.cloudinary_id)}
                >
                  <FaTrash style={{ color: "white" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        {isDeleting && <Loader />}
      </Table>

      {/* product edit form */}
      <Modal show={show} onHide={closeEditForm} size="lg">
        <Modal.Header closeButton className="editForm">
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="editForm">
          {isLoading ? (
            <Loader />
          ) : (
            <Form onSubmit={saveChangeHandler}>
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

              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={uploadFileHandler} accept="image/*" autoFocus />
                {imageUrl && <img src={imageUrl} alt="Product" style={{ marginTop: "10px", maxHeight: "150px" }} />}
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
                <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  <option value="Dog Bed">Dog Bed</option>
                  <option value="Dog Eat">Dog Eat</option>
                  <option value="Dog Wear">Dog Wear</option>
                  <option value="Dog Play">Dog Play</option>

                  <option value="Cat Tower">Cat Tower</option>
                  <option value="Cat Eat">Cat Eat</option>
                  <option value="Cat Play">Cat Play</option>
                  <option value="Cat Scratch">Cat Scratch</option>
                </Form.Select>
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
              <p className="d-flex justify-content-center mt-4">
                <Button type="submit">Save Changes</Button>
              </p>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer> {isUpdating && <Loader />}</Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;
