import React, {useState, useContext, useEffect} from 'react'
import { Col } from 'react-bootstrap';
import Review from './Review';
import ReviewAdd from './ReviewAdd';

import { UserContext } from '../../../userContext';



const ReviewList = ({id}) => {
    
    let reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];
    let {authToken, setAuthToken} = useContext(UserContext)

    let [hasReviewed, setHasReviewed] = useState(false);
    let [postReviews, setPostReviews] = useState([]);

    useEffect(()=>{
      let filteredReviews = reviews.filter((review)=>review.id_ref === id) || (null);
        setPostReviews(filteredReviews);
        setHasReviewed(filteredReviews.find((review)=>review.user.name === authToken));
    },[])

    const handleReviewAdded = () => {
      reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];
    }

    
    console.log(id)
return (
    <Col className='d-flex flex-column w-100'>
      {!hasReviewed || !reviews ? (
        <ReviewAdd place_id={id} handleReviewAdded={handleReviewAdded}></ReviewAdd>
      ) : null}
      {postReviews.map((item) => item.id_ref === id ? (
        <Review key={item.id} item={item}/>) : null
      )}
    </Col>
  );
};

export default ReviewList;