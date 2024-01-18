import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { CardTitle, Row, Col, } from 'react-bootstrap';

const Comment = ({id,item,user}) => {
  return (
    <ListGroup className='col-12 pb-3 d-flex flex-row align-items-start'>
      <Image className='rounded col-3 object-fit-contain bg-primary' roundedCircle  src='https://friconix.com/png/fi-xnluxx-anonymous-user-circle.png'/>
      <ListGroup.Item className='ms-3'>
        <p><b>{item.user.name}</b></p>
        <p>{item.comment}</p>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default Comment