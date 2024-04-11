/* eslint-disable react/prop-types */
import { LinkContainer } from "react-router-bootstrap";
import * as userService from "../../utilities/users-service";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "/images/PAWS.png";

import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  // store.js -> reducer -> cart -> cartSlice
  const { cartItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const classNames = isHomePage
    ? "navbar navbar-expand-lg navbar-light home-nav"
    : "navbar navbar-expand-lg";

  function handleLogOut() {
    //remove token
    userService.LogOut();
    //set user to null
    setUser(null);
  }

  return (
    <header>
      <Navbar expand="lg" className={classNames} collapseOnSelect>
        <Container className="justify-content-between">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                alt="logo"
                style={{ height: "120px", width: "180px" }}
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <LinkContainer to="/dogs">
                <Nav.Link>Dog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cats">
                <Nav.Link>Cat</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce(
                        (acc, currentItem) => acc + currentItem.quantity,
                        0
                      )}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="" onClick={handleLogOut}>
                <Nav.Link>
                  <FaUser /> Log out
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
