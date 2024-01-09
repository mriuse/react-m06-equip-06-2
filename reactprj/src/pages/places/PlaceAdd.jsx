import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { UserContext } from "../../userContext";

const PlaceAdd = () => {

  const navigate = useNavigate();

  let { authToken, setAuthToken } = useContext(UserContext);

  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find(user => user.name === authToken);

  let placeDate =  new Date();
  let placeDateStr = placeDate.toDateString();

  const [data, setData] = useState({
    id: uuidv4(),
    name: '',
    description: '',
    image: '',
    longitude: '',
    latitude: '',
    date: '',
    author: {
      name: '',
      email: ''
    },
    visibility: 'public'
  });

  useEffect( ()=> {
    navigator.geolocation.getCurrentPosition( (pos )=> {
      setData({
        ...data,
        latitude :  pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
   },[]);

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
      date: placeDateStr,
      author: {
        name: user.name,
        email: user.email
      },
    };

    places.push(newPlace);
    localStorage.setItem('places', JSON.stringify(places));

    setData({
      id: '',
      name: '',
      description: '',
      image: '',
      longitude: '',
      latitude: '',
      date: '',
      author: {
        name: '',
        email: ''
      },
      visibility: 'public'
    });

    navigate("/places");
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
              <Form.Group className='mb-3' controlId="image">
                <Form.Label>URL Imatge</Form.Label>
                <Form.Control type="text" name="image" value={data.image} onChange={handleInputChange} />
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
                  <option value="public">Public</option>
                  <option value="contacts">Contactes</option>
                  <option value="private">Privada</option>
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
