import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid'
import { UserContext } from '../../../userContext';
import { CommentContext } from './commentContext';
import { Button } from 'react-bootstrap'

const CommentAdd = ({post_id, onCommentAdded}) => {
  const navigate = useNavigate()
  const {authToken, setAuthToken} = useContext(UserContext)
  const {comments, setComments} = useContext(CommentContext)
  const currentDate = new Date()
  const [formData, setFormData] = useState({
    id: uuidv4(), 
    id_post: post_id,
    comment: '',
    created_at: currentDate,
    user: {
      name: authToken,
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

    let commentsGuardats = [];

    if(localStorage.getItem('comments')){
      //Recull l'item posts i el transforma des d'un json a un array
      const commentsGuardatsJSON = localStorage.getItem('comments')
      commentsGuardats = commentsGuardatsJSON ? JSON.parse(commentsGuardatsJSON) : []
    }

    //Creem el nou objecte comment i el guardem a localstorage
    let newComment = formData

    commentsGuardats.push(newComment)

    localStorage.setItem("comments", JSON.stringify(commentsGuardats))

    // Neteja el formulari
    setFormData({
      ...formData,
      id: uuidv4(), 
      id_post: post_id,
      comment: '',
      created_at: currentDate,
      user: {
        name: authToken,
        email: '', 
      }
    })
    //Refresca el component pare
    navigate(`/post/${post_id}`)
  }

  return (
    <form onSubmit={handleSubmit} className='d-flex flex-row px-4 pt-3 col-md-6 offset-md-3'>
    {/* Comentari */}
    <label className='d-flex flex-column px-3'>
      <input type="text" name="comment" onChange={handleInputChange} value={formData.comment} />
    </label>
    
    <Button type="submit" variant='outline-primary'> Afegir comentari </Button>
  </form>
  )
}

export default CommentAdd