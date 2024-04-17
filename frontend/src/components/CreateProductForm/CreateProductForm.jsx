/* eslint-disable react/prop-types */
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Loader from "../Loader/Loader";

const CreateProductForm = ({
  name,
  price,
  brand,
  category,
  petCategory,
  countInStock,
  description,
  setName,
  setPrice,
  setBrand,
  setCategory,
  setPetCategory,
  setCountInStock,
  setDescription,
  createProductHandler,
  uploadFileHandler,
  loadingUpload,
}) => {
  return (
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
        <Form.Control placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} autoFocus />
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
  );
};

export default CreateProductForm;
