import React, {useState, useContext, useEffect} from 'react'

import { v4 as uuidv4 } from 'uuid'
import { UserContext } from '../../../userContext';
import { Button } from 'react-bootstrap'

const CommentAdd = ({post_id, onCommentAdded}) => {
  const {authToken, setAuthToken} = useContext(UserContext)
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
    onCommentAdded()
  }

  return (
    <div className='col-12'>
      <form onSubmit={handleSubmit} className='d-flex flex-row justify-content-between flex-md-column flex-wrap '>
          {/* Comentari */}
          <label className='d-flex flex-column col-7 col-md-12 pb-3'>
            <input type="text" name="comment" onChange={handleInputChange} value={formData.comment} />
          </label>
          
          <Button type="submit" variant='outline-primary'> Afegir comentari </Button>
      </form>
    </div>
    
  )
}

export default CommentAdd