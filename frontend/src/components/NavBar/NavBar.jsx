/* eslint-disable react/prop-types */
import { LinkContainer } from "react-router-bootstrap";
// import * as userService from "../../utilities/users-service";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "/images/PAWS.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";

import "./NavBar.css";

export default function NavBar() {
  // store.js -> reducer -> cart -> cartSlice
  const { cartItems } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.auth);

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const classNames = isHomePage ? "navbar navbar-expand-lg navbar-light home-nav" : "navbar navbar-expand-lg";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //destrucure useLogoutMutation
  const [logoutBackend] = useLogoutMutation();

  async function logoutHandler() {
    try {
      //clear backend data
      await logoutBackend().unwrap();
      //clear localstorage data
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
      <Navbar expand="lg" className={classNames} collapseOnSelect>
        <Container className="justify-content-between">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" style={{ height: "120px", width: "180px" }} />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <LinkContainer to="/dogs">
                <Nav.Link>DOGS</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cats">
                <Nav.Link>CATS</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((acc, currentItem) => acc + currentItem.quantity, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userData ? (
                userData.isAdmin ? (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to="/admin/productlist">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orderlist">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    {/* <LinkContainer to="/orders/myorders">
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer> */}

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title={userData.name} id="username">
                    <LinkContainer to="/orders/myorders">
                      <NavDropdown.Item>My Orders</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
