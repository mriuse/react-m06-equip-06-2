import { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../userContext";

export default function App() {

  const createPlace = (e) => {
    
    e.preventDefault();

    let id = uuidv4()
    let { name, description, longitude, latitude, visibility } = form;

    let new_place = {
        id : id,
        author : authToken,
        name : name,
        description : description,
        longitude : longitude,
        latitude : latitude,
        visibility : visibility
      }
      places.push(new_place);
      localStorage.setItem ("places",JSON.stringify(places));

      console.log("New place added: " + name)
    }


  return (
    <>
      <div className="section-light">
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-4'>Afegir lloc nou</h1>
              <Form action="addplace">
                <Form.Group className='mb-3' controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className='mb-2' controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3}/>
                </Form.Group>
                <Form.Group className='mb-2' controlId="longitude">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control type="number" placeholder="0.000001" />
                </Form.Group>
                <Form.Group className='mb-2' controlId="latitude">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control type="number" placeholder="0.000001" />
                </Form.Group>
                <Form.Group className='mb-4' controlId="visibility">
                  <Form.Label>Visibility</Form.Label>
                  <Form.Control as="select">
                    <option>Public</option>
                    <option>Contacts</option>
                    <option>Private</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={(e) => {
                  createPlace(e);
                }}>
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
