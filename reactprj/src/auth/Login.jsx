import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = ({ toggleLogin }) => {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  let sendLogin = (e) => {
    e.preventDefault();
    console.log("Log in:" + name + "/" + password);
  }

  return (
    <>
      <Row className="border border-primary border-2 p-3 rounded">
        <Col lg={6} md={8} sm={10} xs={12} className="container-md">
          <Form action="login">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom d'usuari:</Form.Label>
              <Form.Control
              name="name" 
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control 
              name="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            </Form.Group>
            <div className="mb-3">
              <Button 
                variant="primary"
                onClick={(e) => {
                  sendLogin(e);
                }}
              >Login</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            className='btn btn-primary'
            onClick={() => {
              toggleLogin(false);
            }}
          >
            Not registered? Register here
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Login;
