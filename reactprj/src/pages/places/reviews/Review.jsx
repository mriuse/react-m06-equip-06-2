import React from 'react'
import {ListGroup, Image, Col} from 'react-bootstrap';

const Review = (item) => {
  console.log(item.item.user);
  return (
      <ListGroup className='pb-3 d-flex flex-row'>
        <Image className='col-1 rounded bg-primary' roundedCircle  src='https://friconix.com/png/fi-xnluxx-anonymous-user-circle.png'/>
        <ListGroup.Item className='ms-3 d-flex flex-column text-wrap'>
          <p><b>{item.item.user.name}</b></p>
          <p>{item.item.review}</p>
        </ListGroup.Item>
      </ListGroup>
  )
}

export default Review;