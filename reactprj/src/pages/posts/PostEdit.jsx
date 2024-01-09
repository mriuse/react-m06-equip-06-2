import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import {useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

const PostEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    id:'', 
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
  useEffect(()=>{
    let postsGuardatsJSON = localStorage.getItem('posts')
    let postsGuardats = postsGuardatsJSON ? JSON.parse(postsGuardatsJSON) : []
    let postTrobat = postsGuardats.find((post) => post.id === id)
    setFormData(postTrobat)
    setIsLoading(false)
  },[])
  
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
    // Trec l'array de posts de localstorage
    const postsGuardatsJSON = localStorage.getItem('posts')
    postsGuardats = postsGuardatsJSON ? JSON.parse(postsGuardatsJSON) : []
    // Busco la key del post que estic editant
    let postKey = postsGuardats.findIndex((post) => post.id === id)
    // Modifico el post
    postsGuardats[postKey] = formData
    // Torno a guardar l'array a localstorage
    localStorage.setItem('posts', JSON.stringify(postsGuardats))
    // Marxo a posts
    navigate(-1)
  }  
  
  return (
    <form onSubmit={handleSubmit} className='d-flex flex-column px-4 pt-3 col-md-6 offset-md-3'>
    
    {isLoading ? (
      <div> ...carregant </div>
      ):
      <div>
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
        {/* <input type="hidden" name="id" value={formData.author.name}/> */}
      </label>

      <Button type="submit" variant='outline-primary'> Aplicar canvis </Button>
    </div>
    }
  </form>
  )
}


export default PostEdit
