import { Container, Row, Col, Button, Form } from "react-bootstrap";
import useState from "react";
import { Link } from "react-router-dom";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    console.log("submit");
  }

  return (
    <div>
      <Container>
        <Row className="justify-coentern-md-center">
          <Col xs={12} md={6}>
            <h1>Log In</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="email" className="my-3">
                <Form.Label>Emial Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter emial"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-2">
                Sign In
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer? <Link to="/register">Register</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogInForm;
