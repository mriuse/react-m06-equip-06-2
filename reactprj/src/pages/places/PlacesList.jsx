import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [viewType, setViewType] = useState('list'); // State to manage view type (list/grid)

  const handleToggleView = () => {
    const newViewType = viewType === 'list' ? 'grid' : 'list';
    setViewType(newViewType);
  };

  const handleSearch = () => {
    // Handle search functionality here
    console.log('Searching...');
  };

  return (
    <>
      <div className="section-light">
        <Container className="d-flex flex-column">
          <Row>
            <h1 className='mb-5'>Afegir lloc nou</h1>
          </Row>
          <Row className='mb-5'>
            <Col>
              <InputGroup>
                <Link to="/places/add">
                  <Button variant="primary">+ Afegir lloc nou</Button>
                </Link>
                <Button variant="secondary" onClick={handleToggleView}>Canviar vista</Button>
              </InputGroup>
            </Col>
            <Col xs={6}>
              <InputGroup>
                <FormControl
                  placeholder="Cercar un lloc..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <Button variant="secondary" onClick={handleSearch}>Cercar</Button>
              </InputGroup>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col>
              <h4>Imatge</h4>
            </Col>
            <Col>
              <h4>Nom de lloc</h4>
            </Col>
            <Col>
              <h4>Descripció</h4>
            </Col>
            <Col>
              <h4>Data de creació</h4>
            </Col>
            <Col>
              <h4>Accions</h4>
            </Col>
            <hr></hr>
          </Row>
          <Row>
            <Col className="img-container">
            <img
                src="https://via.placeholder.com/300x200"
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              />
            </Col>
            <Col>
              <p>Nom de lloc</p>
            </Col>
            <Col>
              <p>Aquesta és una descripció</p>
            </Col>
            <Col>
              <p>12:00 12-12-2012</p>
            </Col>
            <Col>
              <Button>Veure info</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}