import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = () => {
  return (
    <Row className="border border-primary border-2 p-3 rounded">
      <Col lg={6} md={8} sm={10} xs={12} className="container-md">
        <Form action="login">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="example@example.com"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">Login</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
