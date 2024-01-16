import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../userContext";

const PlaceEdit = () => {

  const navigate = useNavigate();

  let { authToken, setAuthToken } = useContext(UserContext);
  const { id } = useParams();

  const places = JSON.parse(localStorage.getItem('places')) || [];
  
  const index = places.findIndex((item) => item.id === id);

  const [data, setData] = useState({
    name: places[index].name,
    description: places[index].description,
    image: places[index].image,
    visibility: places[index].visibility
  });

  let [error, setError] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (data.name === "" || data.description === "" || data.image === "") {
        throw new Error("Error: No s'accepten camps buits al formulari.");
      }

      places[index].name = data.name;
      places[index].description = data.description;
      places[index].image = data.image;
      places[index].visibility = data.visibility;
      localStorage.setItem('places', JSON.stringify(places));

      navigate(-1);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="section-light">
      <Container className="d-flex flex-column">
        <Row>
          <Col>
            <h1 className='mb-4'>Editar lloc</h1>
          </Col>
        </Row>
        {error && (
          <Row>
            <Col>
              <p className="text-danger">{error}</p>
            </Col>
          </Row>
        )}
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

export default PlaceEdit;
