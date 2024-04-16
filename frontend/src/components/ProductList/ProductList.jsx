/* eslint-disable react/prop-types */
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
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
              <Link to={`/#`}>
                <Button variant="light" className="btn-sm mx-2">
                  <FaEdit />
                </Button>
              </Link>
              <Button variant="danger" className="btn-sm">
                <FaTrash style={{ color: "white" }} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
