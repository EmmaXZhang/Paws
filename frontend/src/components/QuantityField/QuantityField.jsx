/* eslint-disable react/prop-types */
import "./QuantityField.css";

const QuantityField = ({ quantity, setQuantity, product }) => {
  function increaseQty() {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
    }
  }

  function decreseQty() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="quantity-field">
      <button className="value-button decrease-button" onClick={decreseQty} title="Azalt">
        -
      </button>
      <div className="number">{quantity}</div>
      <button className="value-button increase-button" onClick={increaseQty} title="Arrtir">
        +
      </button>
    </div>
  );
};

export default QuantityField;
