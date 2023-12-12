import React from 'react';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import { RiTwitterLine, RiFacebookCircleLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";
import './App.scss'

function App() {
  return (
    <>
      <div className="body-custom">
        <Navbar sticky="top" collapseOnSelect expand="lg" data-bs-theme="dark" className="nav-bar-custom">
          <Container>
            <Navbar.Brand className="nav-brand-custom" href="">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
              <Nav>
                <Nav.Link href="">Button 1</Nav.Link>
                <Nav.Link href="">Button 2</Nav.Link>
                <Nav.Link href="">Button 3</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="section-dark">
          <Container className="d-flex justify-content-center align-items-center">
            <Row>
              <Col className="d-flex flex-column align-items-center">
                <h1 className='mb-0'>Contacta'ns</h1>
                <p className='mb-5'>Envia'ns el teu missatge</p>
                <Button variant="outline-primary" size="lg">Formulari de contacte</Button>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section-light">
          <Container className="d-flex justify-content-center align-items-center h-100">
            <Row>
              <Col className="d-flex flex-column align-items-center">
                <h1 className='mb-0'>Vols visitar-nos?</h1>
                <p className='mb-5'>Ubica'ns al mapa</p>
                {/* Replace the placeholder image with your desired photo */}
                <img
                  src="https://via.placeholder.com/800x400" // Replace with your image URL
                  alt="Map"
                  style={{ width: '100%', height: 'auto' }}
                />
              </Col>
            </Row>
          </Container>
        </div>

        <div className="section-footer">
          <Container className="d-flex justify-content-center align-items-center h-100">
            <Row className="d-flex flex-column align-items-center text-center">
              <Col classname="w-100">
                <h3>Segueix-nos a les nostres xarxes!</h3>
              </Col>
              <Col className="w-100 justify-content-between">
                <Button variant="link" size="lg">
                  <RiTwitterLine className='link-custom'/>
                </Button>
                <Button variant="link" size="lg">
                  <RiFacebookCircleLine className='link-custom'/>
                </Button>
                <Button variant="link" size="lg">
                  <RiGithubLine className='link-custom'/>
                </Button>
                <Button variant="link" size="lg">
                  <RiLinkedinLine className='link-custom'/>
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

export default App
