import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PlaceList from './PlaceList';

const PlacesList = () => {
  let places = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];

  const [viewType, setViewType] = useState('list');

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
            <Col>
              <h1 className='mb-5'>Llocs</h1>
            </Col>
          </Row>
          <Row className='mb-5'>
            <Col>
                <Link to="/places/add">
                  <Button variant="primary" className='m-1'>+ Afegir lloc nou</Button>
                </Link>
                <Button variant="secondary" className='m-1' onClick={handleToggleView}>Canviar vista</Button>
            </Col>
            <Col xs={6}>
              <InputGroup className='m-1'>
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
            <Col className="d-none d-lg-block">
              <h5>Imatge</h5>
            </Col>
            <Col xs={3}>
              <h5>Nom de lloc</h5>
            </Col>
            <Col xs={3}>
              <h5>Autor</h5>
            </Col>
            <Col xs={3}>
              <h5>Data creació</h5>
            </Col>
            <Col xs={1}>
              <h5>Accions</h5>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
          { places.map( (item)=> { return (
            <>
              { item.visibility == "public" || item.author.email == usuari ? (<PlaceList key={item.id} item={item}/>) : <></> 
              }
            </>
            )
          })}
        </Container>
      </div>
    </>
  )
}

export default PlacesList;