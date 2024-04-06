/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import * as userService from "../../utilities/users-service";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../assets/Homie.png";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    //remove token
    userService.LogOut();
    //set user to null
    setUser(null);
  }

  return (
    <header>
      <Navbar
        variant="dark"
        expand="md"
        className="customNavbar"
        collapseOnSelect
      >
        <Container className="justify-content-between">
          {/* logo */}
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" style={{ height: "150px" }} />
            </Navbar.Brand>
          </LinkContainer>

          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <FaShoppingCart /> Cart
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="" onClick={handleLogOut}>
              <Nav.Link>
                <FaUser /> Log out
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <LinkContainer to="/dogs">
                <Nav.Link>Dog</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cats">
                <Nav.Link>Cat</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
