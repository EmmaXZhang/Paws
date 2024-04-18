import { Card, Col } from "react-bootstrap";
import "./HomePageCategory.css";

export default function HomePageCategory() {
  return (
    <>
      <Col>
        <Card className="bg-dark text-white" style={{ padding: 0, border: "none" }}>
          <Card.Img src="./images/walk-gear.jpeg" alt="Card image" />
          <Card.ImgOverlay className=" d-flex flex-column justify-content-center align-items-center">
            <Card.Title>DURABLE & COMFORTABLE</Card.Title>
            <Card.Title>TRAIN SAFELY</Card.Title>
            <Card.Title>ADJUSTABLE SIZING</Card.Title>
            <Card.Title>PREMIUM MATERIALS</Card.Title>
          </Card.ImgOverlay>
        </Card>
      </Col>

      <Col className="d-flex justify-content-center align-items-center">
        <Card className="category-card" style={{ padding: 0 }}>
          <Card.Img variant="top" src="./images/shop-bed.jpeg" />
          <Card.Body className="cardBody">
            <Card.Title>SHOP BEDS</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col className="d-flex justify-content-center align-items-center">
        <Card className="category-card" style={{ padding: 0 }}>
          <Card.Img variant="top" src="./images/shop-towel.webp" />
          <Card.Body className="cardBody">
            <Card.Title>SHOP TOWERS</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
