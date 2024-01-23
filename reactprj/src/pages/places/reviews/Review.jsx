import React from 'react';
import { ListGroup, Image, Col, Row } from 'react-bootstrap';

const Review = (item) => {
  console.log(item.item.user);

  return (
    <ListGroup className='pb-3'>
      <Row className='align-items-start'>
        <Col xs={1} className='align-self-start'>
          <Image
            className='rounded bg-primary'
            roundedCircle
            src='https://friconix.com/png/fi-xnluxx-anonymous-user-circle.png'
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={11}>
          <ListGroup.Item className='flex-grow-1'>
            <div className='d-flex flex-column h-100'>
              <p className='mb-0'><b>{item.item.user.name}</b></p>
              <p className='flex-grow-1 text-wrap'>{item.item.review}</p>
            </div>
          </ListGroup.Item>
        </Col>
      </Row>
    </ListGroup>
  );
};

export default Review;
