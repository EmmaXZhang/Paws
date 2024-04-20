/* eslint-disable react/prop-types */
import { Dropdown } from "react-bootstrap";

const ProductFilter = ({ categorySelect, categoryList, setCategorySelect }) => {
  function categorySelectHandler(selectedCategory) {
    setCategorySelect(selectedCategory === categorySelect ? null : selectedCategory);
  }
  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">{categorySelect ? categorySelect : "Category"}</Dropdown.Toggle>
      <Dropdown.Menu>
        {categoryList.map((category, index) => (
          <Dropdown.Item key={index} onClick={() => categorySelectHandler(category)}>
            {category}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProductFilter;
