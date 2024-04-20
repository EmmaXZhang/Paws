/* eslint-disable react/prop-types */
import { Dropdown } from "react-bootstrap";
import "./ProductSort.css";

const ProductSort = ({ sort, setSort }) => {
  function sortChangeHandler(sortChange) {
    setSort((prevSort) => (prevSort === sortChange ? null : sortChange));
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">{sort ? sort : "Sort By"}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => sortChangeHandler("Price:High to Low")}>Price:High to Low</Dropdown.Item>
        <Dropdown.Item onClick={() => sortChangeHandler("Price:Low to High")}>Price:Low to High</Dropdown.Item>
        <Dropdown.Item onClick={() => sortChangeHandler("Product:New to Old")}>Product:New to Old</Dropdown.Item>
        <Dropdown.Item onClick={() => sortChangeHandler("Product:Old to New")}>Product:Old to New</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductSort;
