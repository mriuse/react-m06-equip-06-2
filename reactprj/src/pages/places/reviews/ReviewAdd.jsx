import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid'
import { UserContext } from '../../../userContext';
import { Button } from 'react-bootstrap'

const ReviewAdd = ({place_id, onCommentAdded}) => {
  const navigate = useNavigate()

  const {authToken, setAuthToken} = useContext(UserContext)
  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find(user => user.name === authToken);

  const currentDate = new Date()

  const [formData, setFormData] = useState({
    id: uuidv4(), 
    id_ref: place_id,
    review: '',
    created_at: currentDate,
    user: {
      name: user.name,
      email: user.email,  
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

    let reviewList = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : []

    let newReview = formData
    reviewList.push(newReview)
    localStorage.setItem("reviews", JSON.stringify(reviewList))

    setFormData({
      ...formData,
      id: uuidv4(), 
      id_ref: place_id,
      review: '',
      created_at: currentDate,
      user: {
        name: authToken,
        email: '', 
      }
    })

    handleReviewAdded()
  }

  return (
    <div className='col-12'>
      <form onSubmit={handleSubmit} className='d-flex flex-row justify-content-between flex-md-column flex-wrap '>
        <label className='d-flex flex-column col-7 col-md-12 pb-3'>
          <input type="text" name="review" onChange={handleInputChange} value={formData.review} />
        </label>
        
        <Button type="submit" variant='outline-primary'>Afegir ressenya</Button>
      </form>
    </div>
    
  )
}

export default ReviewAdd;