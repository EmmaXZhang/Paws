import { Link } from "react-router-dom";
import "./HeroBanner.css";

const HeroBanner = () => {
  return (
    <div className="hero-banner">
      <video autoPlay loop muted className="video-background">
        <source src="./homepage-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-content">
        <h1>LUXURY FASHION FOR PETS</h1>
        <Link to="/products" className="btn btn-outline-light banner-button">
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
