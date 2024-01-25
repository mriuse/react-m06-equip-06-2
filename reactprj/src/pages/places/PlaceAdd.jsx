import { useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from "../../userContext";
import { useForm } from "react-hook-form";

const PlaceAdd = () => {
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue("latitude", pos.coords.latitude);
      setValue("longitude", pos.coords.longitude);
    });
  }, [setValue]);

  const onSubmit = (data) => {
    let places = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    const user = users.find(user => user.name === authToken);

    const newPlace = {
      ...data,
      id: uuidv4(),
      date: new Date().toDateString(),
      author: {
        name: user.name,
        email: user.email
      },
    };

    places.push(newPlace);
    localStorage.setItem('places', JSON.stringify(places));

    navigate(-1);
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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className='mb-3' controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" {...register("name", { required: true })} />
                {errors.name && <p className="text-danger">Aquest camp és obligatori</p>}
              </Form.Group>
              <Form.Group className='mb-2' controlId="description">
                <Form.Label>Descripció</Form.Label>
                <Form.Control as="textarea" rows={3} {...register("description", { required: true })} />
                {errors.description && <p className="text-danger">Aquest camp és obligatori</p>}
              </Form.Group>
              <Form.Group className='mb-3' controlId="image">
                <Form.Label>URL Imatge</Form.Label>
                <Form.Control type="text" {...register("image", {
                  required: true,
                  pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/i,
                })} />
                {errors.image && <p className="text-danger">Introdueix una URL vàlida</p>}
              </Form.Group>
              <Form.Group className='mb-3' controlId="longitude">
                <Form.Label>Longitud</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.0000001"
                  step="0.0000001"
                  {...register("longitude", {
                    required: true,
                    validate: value => {
                      return value <= 180 && value >= -180 || 'Longitud invàlida';
                    }
                  })}
                />
                {errors.longitude && <p className="text-danger">{errors.longitude.message}</p>}
              </Form.Group>
              <Form.Group className='mb-3' controlId="latitude">
                <Form.Label>Latitud</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0.0000001"
                  step="0.0000001"
                  {...register("latitude", {
                    required: true,
                    validate: value => {
                      return value <= 90 && value >= -90 || 'Latitud invàlida';
                    }
                  })}
                />
                {errors.latitude && <p className="text-danger">{errors.latitude.message}</p>}
              </Form.Group>
              <Form.Group className='mb-4' controlId="visibility">
                <Form.Label>Visibilitat</Form.Label>
                <Form.Control
                  as="select"
                  {...register('visibility', {
                    required: 'Aquest camp és obligatori'
                  })}
                >
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
