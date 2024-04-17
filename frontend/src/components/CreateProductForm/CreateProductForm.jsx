/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useCreateProductMutation } from "../../slices/productsApiSlice";
import { FaPlus } from "react-icons/fa";
import { useUploadProductImageMutation } from "../../slices/productsApiSlice";

const CreateProductForm = ({ refetch }) => {
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
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

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
      <Button className="my-3" variant="dark" onClick={() => setShow(true)}>
        <FaPlus /> Create Product
      </Button>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton className="editForm">
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="editForm">
          {loadingCreate ? (
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
              <Form.Group className="mb-3" controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={uploadFileHandler} accept="image/*" autoFocus />
              </Form.Group>
              {loadingUpload && <Loader />}
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
        <Modal.Footer> {loadingCreate && <Loader />}</Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateProductForm;
