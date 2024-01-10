import { useContext } from "react";
import { Container, Navbar, Nav, NavbarText, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { UserContext } from "../userContext";

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <Navbar sticky="top" collapseOnSelect expand="lg" data-bs-theme="dark" className="nav-bar-custom">
          <Container>
            <Navbar.Brand className="nav-brand-custom" href="">GeoMir.js</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/about">About</NavLink>
                <NavLink className="nav-link" to="/places/list">Llocs</NavLink>
                <NavLink className="nav-link" to="/posts">Posts</NavLink>
              </Nav>
              <Nav>
                <NavbarText className="nav-text me-3">
                  {authToken}
                </NavbarText>
                <Button variant="outline-light" onClick={() => {
                  localStorage.removeItem ("authToken")
                  setAuthToken(false)
                }}>Logout</Button>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}
