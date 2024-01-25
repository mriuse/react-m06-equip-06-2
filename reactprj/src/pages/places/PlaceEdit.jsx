import { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";

const PlaceEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const places = JSON.parse(localStorage.getItem('places')) || [];
  const index = places.findIndex((item) => item.id === id);

  useEffect(() => {
    setValue("name", places[index].name);
    setValue("description", places[index].description);
    setValue("image", places[index].image);
    setValue("visibility", places[index].visibility);
  }, [index, setValue]);

  const onSubmit = (data) => {
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
        {errors && (
          <Row>
            <Col>
              <p className="text-danger">{errors.message}</p>
            </Col>
          </Row>
        )}
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
              <Form.Group className='mb-4' controlId="visibility">
                <Form.Label>Visibilitat</Form.Label>
                <Form.Control as="select" {...register('visibility', { required: 'Aquest camp és obligatori' })}>
                  <option value="public">Public</option>
                  <option value="contacts">Contactes</option>
                  <option value="private">Privada</option>
                </Form.Control>
                {errors.visibility && <p className="text-danger">{errors.visibility.message}</p>}
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
