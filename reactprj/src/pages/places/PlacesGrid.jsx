import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useState } from 'react';

export default function App() {
  const [viewType, setViewType] = useState('grid'); // State to manage view type (list/grid)

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
                <Button variant="primary">+ Afegir lloc nou</Button>
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
            {/* Render each place card as a grid item */}
            {places.map((place, index) => (
              <Col key={index} sm={6} md={4} lg={3} className="mb-3">
                {/* Example structure for a place card */}
                <div>
                  <img
                    src={place.image}
                    style={{ maxWidth: '100%', height: 'auto' }}
                    alt={`Place ${index + 1}`}
                  />
                  <p>{place.title}</p>
                  {/* Other place details */}
                  <Button>Veure info</Button>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  )
}
