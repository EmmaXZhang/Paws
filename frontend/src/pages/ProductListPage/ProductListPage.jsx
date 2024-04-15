import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message";

const ProductListPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {products && products.length > 0 ? (
            <Table striped bordered hover responsive className="table-sm">
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
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Message>No products found.</Message>
          )}
        </>
      )}
    </>
  );
};

export default ProductListPage;
