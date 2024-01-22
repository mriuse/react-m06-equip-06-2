import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

const Review = (item) => {
  console.log(item);
  return (
      <ListGroup className='col-12 pb-3 d-flex flex-row align-items-start'>
        <Image className='rounded col-3 object-fit-contain bg-primary' roundedCircle  src='https://friconix.com/png/fi-xnluxx-anonymous-user-circle.png'/>
        <ListGroup.Item className='ms-3'>
          
          <p><b>{}</b></p>
          <p>{item.review}</p>
        </ListGroup.Item>
      </ListGroup>
  )
}

export default Review;