/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import * as userService from "../../utilities/users-service";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../../../assets/Homie.png";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    //remove token
    userService.LogOut();
    //set user to null
    setUser(null);
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="homie" style={{ height: "150px" }} />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* got to cart route */}
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>

              {/* go to login route */}
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>

              {/* <Link to="/orders">Order History</Link>
              &nbsp; | &nbsp;
              <Link to="/orders/new">New Order</Link>
              &nbsp;
              <span>Welcome, {user.name}</span>
              &nbsp; | &nbsp; */}

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
