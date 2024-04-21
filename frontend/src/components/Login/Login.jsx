/* eslint-disable react/prop-types */

import { Button, Form } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";

const Login = ({ email, setEmail, password, setPassword, submitHandler, isLoading }) => {
  return (
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

      <Button type="submit" variant="dark" className="mt-2">
        Sign In
      </Button>

      {isLoading && <Loader />}
    </Form>
  );
};

export default Login;
