import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const PostAdd = () => {
  const { authToken } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find(user => user.name === authToken);

  const onSubmit = (data) => {
    let postsGuardats = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [];

    // Creem el nou objecte post
    let newPost = {
      id: uuidv4(),
      name: data.name,
      description: data.description,
      upload: data.upload,
      latitude: data.latitude,
      longitude: data.longitude,
      visibility: data.visibility,
      author: {
        name: user.name,
        email: user.email,
      },
      favorites: [{
        id: '',
        user: ''
      }]
    };

    postsGuardats.push(newPost);
    localStorage.setItem('posts', JSON.stringify(postsGuardats));

    // Neteja el formulari
    setValue('name', '');
    setValue('description', '');
    setValue('upload', '');
    setValue('latitude', '');
    setValue('longitude', '');
    setValue('visibility', 'public');

    navigate('/posts');
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setValue('latitude', pos.coords.latitude);
      setValue('longitude', pos.coords.longitude);
    });
  }, [setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column justify-content-between px-4 pb-3 col-md-6 offset-md-3 fullheight bg-secondary'>
      <Form.Group controlId="id">
        <Form.Control type="hidden" {...register('id')} />
      </Form.Group>

      <Form.Group controlId="name" className='d-flex flex-column'>
        <Form.Label>Nom:</Form.Label>
        <Form.Control type="text" {...register('name', { required: 'Aquest camp és obligatori' })} />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </Form.Group>

      <Form.Group controlId="description" className='d-flex flex-column'>
        <Form.Label>Descripció:</Form.Label>
        <Form.Control as="textarea" {...register('description', { required: 'Aquest camp és obligatori' })} />
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </Form.Group>

      <Form.Group controlId="upload" className='d-flex flex-column'>
        <Form.Label>Imatge:</Form.Label>
        <Form.Control type="text" {...register("upload", {
          required: true,
          pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/i,
        })} />
        {errors.upload && <p className="text-danger">{errors.upload.message}</p>}
      </Form.Group>

      <div className='row'>
        <Form.Group controlId="latitude" className='d-flex flex-column col-md-6'>
          <Form.Label>Latitud:</Form.Label>
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

        <Form.Group controlId="longitude" className='d-flex flex-column col-md-6'>
          <Form.Label>Longitud:</Form.Label>
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
      </div>

      <div className='d-flex flex-column py-3'>
        <Form.Label>Visibilitat:</Form.Label>

        <Form.Check
          type="radio"
          label="Public"
          {...register('visibility', { required: 'Aquest camp és obligatori' })}
          value="public"
        />

        <Form.Check
          type="radio"
          label="Contactes"
          {...register('visibility', { required: 'Aquest camp és obligatori' })}
          value="contacts"
        />

        <Form.Check
          type="radio"
          label="Privat"
          {...register('visibility', { required: 'Aquest camp és obligatori' })}
          value="private"
        />

        {errors.visibility && <p className="text-danger">{errors.visibility.message}</p>}
      </div>

      <Form.Group controlId="author">
        <Form.Control type="hidden" {...register('id')} />
      </Form.Group>

      <Button type="submit" variant='outline-primary'> Crear nou post </Button>
    </Form>
  );
};

export default PostAdd;
