import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = () => {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");

  let setLogin = (e) => {
    e.preventDefault();
    console.log("Log in:" + name + "/" + password);
  }

  return (
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
            <Button variant="primary"
            onClick={setLogin}
            >Login</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
