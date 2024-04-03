/* eslint-disable react/prop-types */
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function Rating({ value, text }) {
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (value >= i) {
        stars.push(
          <span key={i}>
            <FaStar />
          </span>
        );
      } else if (value >= i - 0.5) {
        stars.push(
          <span key={i}>
            <FaStarHalfAlt />
          </span>
        );
      } else {
        stars.push(
          <span key={i}>
            <FaRegStar />
          </span>
        );
      }
    }

    return stars;
  };

  return (
    <div className="rating">
      {renderStars()}
      <span className="rating-text">{text && text}</span>
    </div>
  );
}
