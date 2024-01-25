import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors }, control } = useForm();
  const [postTrobat, setPostTrobat] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let postsGuardatsJSON = localStorage.getItem('posts');
      let postsGuardats = postsGuardatsJSON ? JSON.parse(postsGuardatsJSON) : [];
      let postTrobat = postsGuardats.find((post) => post.id === id);

      // Set default values for form fields
      setValue('id', postTrobat.id);
      setValue('name', postTrobat.name);
      setValue('description', postTrobat.description);
      setValue('upload', postTrobat.upload);
      setValue('latitude', postTrobat.latitude);
      setValue('longitude', postTrobat.longitude);
      setValue('visibility', postTrobat.visibility);

      setPostTrobat(postTrobat);
    };

    fetchData();
  }, [id, setValue]);

  const onSubmit = (data) => {
    let postsGuardats = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [];
    let postKey = postsGuardats.findIndex((post) => post.id === id);

    // Check if postTrobat is available
    if (postTrobat) {
      postsGuardats[postKey] = {
        ...data,
        author: {
          name: postTrobat.author.name,
          email: postTrobat.author.email,
        },
        favorites: postTrobat.favorites,
      };

      localStorage.setItem('posts', JSON.stringify(postsGuardats));
      navigate(-1);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column px-4 pt-3 col-md-6 offset-md-3'>
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

      <Button type="submit" variant='outline-primary'> Aplicar canvis </Button>
    </Form>
  );
};

export default PostEdit;
