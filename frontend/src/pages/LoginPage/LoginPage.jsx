import { Container, Row, Col } from "react-bootstrap";
import backgroundImage from "/images/signIn.jpg";
import "./LoginPage.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../../components/Login/Login";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //destructure loginMutation, isLoading is auto created
  const [login, { isLoading }] = useLoginMutation();
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
    try {
      // unwrap() extracts the actual value from backend
      // unwrapping it from the Promise object.
      const res = await login({ email, password }).unwrap();
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
            <span>Sign In</span>
          </Col>
        </Row>
      </div>

      <Container>
        <Row className="justify-coentern-lg-center">
          <Col xs={12} md={12}>
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              submitHandler={submitHandler}
              isLoading={isLoading}
            />

            <Row className="py-3">
              <Col>
                New Customer?{" "}
                <Link
                  to={redirect ? "/register?redirect=${redirect}" : `/register`}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LogInForm;
