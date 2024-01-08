import React, { useState, useContext} from 'react'
import { UserContext } from '../../userContext';
import { Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

const PostAdd = () => {
  let { authToken } = useContext(UserContext);

  const [formData, setFormData] = useState({
    id: uuidv4(), 
    name: '',
    description: '',
    upload: '',
    latitude: '',
    longitude: '',
    visibility: 'public',
    author: {
      name: '',
      email: '', 
    }
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    // Neteja el formulari
    setFormData({
      ...formData,
      name: '',
      description: '',
      upload: '',
      visibility: 'public'
    })
  }
  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column px-4 pt-4 col-md-6 offset-md-3'>
    
    <label> 
      <input type="hidden" name="id" value={formData.id}/>
    </label>

    <label className='d-flex flex-column'>
      Nom:
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
    </label>

    <label className='d-flex flex-column'>
      Descripció:
      <textarea name="description" value={formData.description} onChange={handleInputChange} />
    </label>

    <label className='d-flex flex-column'>
      Imatge:
      <input type="text" name="upload" value={formData.upload} onChange={handleInputChange} />
    </label>
    
    <div className='row'>
      <label className='d-flex flex-column col-md-6'>
        Latitud:
        <input type="text" name="latitude" value={formData.latitude} onChange={handleInputChange} />
      </label>
      <label className='d-flex flex-column col-md-6'>
        Longitud:
        <input type="text" name="longitude" value={formData.longitude} onChange={handleInputChange} />
      </label>
    </div>

    <div className='d-flex flex-column'>
      Visibilitat:
      <label>
        <input
          type="radio"
          name="visibility"
          value="public"
          checked={formData.visibility === 'public'}
          onChange={handleInputChange}
        />
        Public
      </label>
      <label>
        <input
          type="radio"
          name="visibility"
          value="contacts"
          checked={formData.visibility === 'contacts'}
          onChange={handleInputChange}
        />
        Contactes
      </label>
      <label>
        <input
          type="radio"
          name="visibility"
          value="private"
          checked={formData.visibility === 'private'}
          onChange={handleInputChange}
        />
        Privat
      </label>
    </div>

    <label htmlFor="author"> 
      <input type="hidden" name="id" value={formData.author}/>
    </label>

    <Button type="submit" variant='outline-primary'> Crear nou post </Button>
  </form>
  )
}

export default PostAdd