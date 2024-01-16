import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { CardTitle, ListGroupItem, Row, Col, } from 'react-bootstrap';

const Comment = ({id,item,user}) => {
  return (
    <ListGroup className='col-11 ps-4 pb-3'>
      <ListGroupItem>
        <p><b>{item.user.name}</b></p>
        <p>{item.comment}</p>
      </ListGroupItem>
    </ListGroup>
  )
}

export default Comment