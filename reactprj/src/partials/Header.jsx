import { useContext } from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';
import { UserContext } from "../userContext";

export default function Header() {
  let { authToken, setAuthToken } = useContext(UserContext);

  return (
    <>
      <Navbar sticky="top" collapseOnSelect expand="lg" data-bs-theme="dark" className="nav-bar-custom">
          <Container>
            <Navbar.Brand className="nav-brand-custom" href="">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href="/something">Something</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
}
