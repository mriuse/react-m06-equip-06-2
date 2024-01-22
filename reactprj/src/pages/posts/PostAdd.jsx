import React, { useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../userContext';
import { Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

const PostAdd = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: uuidv4(), 
    name: '',
    description: '',
    upload: '',
    latitude: '',
    longitude: '',
    visibility: 'public',
    author: {
      name: authToken,
      email: '', 
    },
    favorites:[{
      id: '',
      user:'',
    }]
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
    let postsGuardats = [];

    if(localStorage.getItem('posts')){
      //Recull l'item posts i el transforma des d'un json a un array
      const postsGuardatsJSON = localStorage.getItem('posts')
      postsGuardats = postsGuardatsJSON ? JSON.parse(postsGuardatsJSON) : []
    }

    //Creem el nou objecte post i el guardem a localstorage
    let newPost = formData

    postsGuardats.push(newPost)

    localStorage.setItem("posts", JSON.stringify(postsGuardats))

    // Neteja el formulari
    setFormData({
      ...formData,
      id: uuidv4(), 
      name: '',
      description: '',
      upload: '',
      visibility: 'public'
    })
    navigate("/posts")
  }

  useEffect( ()=> {
    navigator.geolocation.getCurrentPosition( (pos )=> {
      setFormData({
        ...formData,
        latitude :  pos.coords.latitude,
        longitude: pos.coords.longitude
   
      })
      // console.log("Latitude is :", pos.coords.latitude);
      // console.log("Longitude is :", pos.coords.longitude);
    });
  
  
   },[])
  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-between px-4 pb-3 col-md-6 offset-md-3 fullheight bg-secondary'>
    
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

    <div className='d-flex flex-column py-3'>
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
      <input type="hidden" name="id" value={formData.author.name}/>
    </label>

    <Button type="submit" variant='outline-primary'> Crear nou post </Button>
  </form>
  )
}

export default PostAdd