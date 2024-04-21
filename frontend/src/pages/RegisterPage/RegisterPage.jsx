import { Container, Row, Col, Button, Form } from "react-bootstrap";
import backgroundImage from "/images/signIn.jpg";
import "./RegisterPage.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/Loader/Loader";
// import Login from "../../components/Login/Login";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //destructure registerMutation, isLoading is auto created
  const [register, { isLoading }] = useRegisterMutation();
  // retrieve userData from local storage state
  const { userData } = useSelector((state) => state.auth);

  //get the current location object, search -> query params
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  // pass "search" from useLocation() to URLSearhParams to see is there 'redirect' on url,if there is->go the redirect url,othewise go to home path
  // check CART url setting
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userData) {
      navigate(redirect);
    }
  }, [userData, redirect, navigate]);

  async function submitHandler(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      // unwrap() extracts the actual value from backend
      // unwrapping it from the Promise object.
      const res = await register({
        name,
        email,
        password,
        confirmPassword,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.data.error || error.error);
    }
  }

  return (
    <div>
      <div
        className="background-image d-flex justify-content-center align-items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay" style={{ zIndex: 0 }}></div>
        <Row style={{ zIndex: 1 }}>
          <Col>
            <span>Sign Up</span>
          </Col>
        </Row>
      </div>

      <Container>
        <Row className="justify-content-lg-center mt-5">
          <Col xs={12} md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
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

              <Form.Group controlId="confirmPassword" className="my-3">
                <Form.Label>confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="dark" className="mt-2">
                Register
              </Button>

              {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
              <Col>
                Already have an account ? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
