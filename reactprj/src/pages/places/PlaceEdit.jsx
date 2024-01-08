import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!');
  };

  return (
    <>
      <div className="section-light">
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-4'>Editar lloc</h1>
              <Form>
                <Form.Group className='mb-3' controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className='mb-2' controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter description" />
                </Form.Group>
                <Form.Group className='mb-2' controlId="longitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="number" placeholder="Enter longitude" />
                </Form.Group>
                <Form.Group className='mb-2' controlId="latitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control type="number" placeholder="Enter latitude" />
                </Form.Group>
                <Form.Group className='mb-4' controlId="visibility">
                  <Form.Label>Visibility</Form.Label>
                  <Form.Control as="select">
                    <option>Public</option>
                    <option>Private</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
