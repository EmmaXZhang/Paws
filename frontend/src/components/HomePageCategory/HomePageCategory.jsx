import { Card, Col } from "react-bootstrap";
import "./HomePageCategory.css";

export default function HomePageCategory() {
  return (
    <>
      <Col>
        <Card className="category-card" style={{ padding: 0 }}>
          <Card.Img variant="top" src="./images/shop-bed.jpeg" />
          <Card.Body>
            <Card.Title>SHOP BEDS</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="category-card" style={{ padding: 0 }}>
          <Card.Img variant="top" src="./images/shop-towel.webp" />
          <Card.Body>
            <Card.Title>SHOP TOWERS</Card.Title>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className="category-card" style={{ padding: 0 }}>
          <Card.Img variant="top" src="./images/walk-gear.jpeg" />
          <Card.Body>
            <Card.Title>SHOP WALK GEAR</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
