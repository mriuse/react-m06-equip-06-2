import React, {useState, useContext, useEffect} from 'react'

import Review from './Review';
import ReviewAdd from './ReviewAdd';

import { UserContext } from '../../../userContext';



const ReviewList = ({id}) => {
    
    let reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];
    let {authToken, setAuthToken} = useContext(UserContext)

    let [hasReviewed, setHasReviewed] = useState(false);
    let [postReviews, setPostReviews] = useState([])

    useEffect(()=>{
        let filteredReviews = reviews.filter((review)=>review.id_ref === id) || (null)
        setPostReviews(filteredReviews)
        setHasReviewed(filteredReviews.find((review)=>review.user.name === authToken))
    },[])

    const handleReviewAdded = () => {
        reviews = localStorage.getItem('reviews') ? JSON.parse(localStorage.getItem('reviews')) : [];
    }
    
return (
    <div className='d-flex flex-col flex-wrap pt-1'>
      {!hasReviewed || !reviews ? (
        <ReviewAdd post_id={id} onReviewAdded={handleReviewAdded}></ReviewAdd>
      ) : null}

        {postReviews.map((item) => item.id_ref === id ? (
            <Review key={item.id} item={item}/>) : null
      )}
    </div>
  );
};

export default ReviewList;