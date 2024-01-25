import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'
import { UserContext } from '../../../userContext';
import { Col, Button } from 'react-bootstrap'

const ReviewAdd = ({place_id, handleReviewAdded}) => {
  const navigate = useNavigate()
  const {authToken, setAuthToken} = useContext(UserContext)
  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find(user => user.name === authToken);

  const currentDate = new Date();

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

    let reviewList = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];

    let newReview = formData;
    reviewList.push(newReview); 
    
    localStorage.setItem("reviews", JSON.stringify(reviewList));

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
    <Col className='mb-4'>
      <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-between'>
        <label className='d-flex flex-column pb-3'>
          <textarea name="review" onChange={handleInputChange} value={formData.review} />
        </label>
        <Button type="submit" variant='primary'>Afegir ressenya</Button>
      </form>
    </Col>
    
  )
}

export default ReviewAdd;