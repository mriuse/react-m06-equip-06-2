import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const PlaceAdd = () => {
  const [data, setData] = useState({
    id: uuidv4(),
    name: '',
    description: '',
    longitude: '',
    latitude: '',
    visibility: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    

    let places = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];

    const newPlace = {
      ...data,
      id: uuidv4(),
    };

    places.push(newPlace);
    localStorage.setItem('places', JSON.stringify(places));

    // Clear the form after submission
    setData({
      id: uuidv4(),
      name: '',
      description: '',
      longitude: '',
      latitude: '',
      visibility: ''
    });
  };

  return (
    <div className="section-light">
      <Container className="d-flex flex-column">
        <Row>
          <Col>
            <h1 className='mb-4'>Afegir lloc nou</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" name="name" value={data.name} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='mb-2' controlId="description">
                <Form.Label>Descripció</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={data.description} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='mb-2' controlId="longitude">
                <Form.Label>Longitud</Form.Label>
                <Form.Control type="number" placeholder="0.000001" step="0.000001" name="longitude" value={data.longitude} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='mb-2' controlId="latitude">
                <Form.Label>Latitud</Form.Label>
                <Form.Control type="number" placeholder="0.000001" step="0.000001" name="latitude" value={data.latitude} onChange={handleInputChange} />
              </Form.Group>
              <Form.Group className='mb-4' controlId="visibility">
                <Form.Label>Visibilitat</Form.Label>
                <Form.Control as="select" name="visibility" value={data.visibility} onChange={handleInputChange}>
                  <option>Public</option>
                  <option>Contactes</option>
                  <option>Privada</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceAdd;
