/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";

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
          <Navbar.Brand href="/">Homie</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link href="/login">
                <FaUser /> Sign In
              </Nav.Link>
              {/* <Link to="/orders">Order History</Link>
              &nbsp; | &nbsp;
              <Link to="/orders/new">New Order</Link>
              &nbsp;
              <span>Welcome, {user.name}</span>
              &nbsp; | &nbsp; */}
              <Nav.Link href="/login">
                <Link to="" onClick={handleLogOut}>
                  <FaUser /> Log out
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
