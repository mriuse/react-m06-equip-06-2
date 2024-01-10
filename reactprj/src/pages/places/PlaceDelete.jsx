import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const PlaceDelete = () => {
  return (
    <div className="section-light">
      <Container className="d-flex align-items-center">
        <Row>
        <h1 className='mb-0'>Lloc</h1>
          <Col className="d-flex flex-column">
            
            <p className='mb-5'>Placeholder text</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlaceDelete;
