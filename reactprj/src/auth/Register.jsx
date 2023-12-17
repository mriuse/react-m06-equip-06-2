import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Register = ({ toggleLogin }) => {
  let [form, setForm] = useState({});

  const handleChange = (e) => {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendRegister = (e) => {
    e.preventDefault();

    let { name, password, password_confirm, email } = form;
    console.log(
      "Register: " + name + "/" + email + "/" + password + "/" + password_confirm
    );
  };

  return (
    <>
      <Row className="border border-2 border-top-1 border-primary p-3 rounded">
        <Col lg={6} md={8} sm={10} xs={12} className="container-md">
          <Form action="register">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom d'usuari:</Form.Label>
              <Form.Control
                name="name" 
                type="text"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                name="email" 
                type="email"
                placeholder="example@example.com"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                name="password" 
                type="password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password_confirm">
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control
                name="password_confirm" 
                type="password"
                onChange={handleChange}
              />
            </Form.Group>
            <div className="mb-3">
              <Button 
                variant="primary"
                onClick={(e) => {
                  sendRegister(e);
                }}
              >Register</Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button
            className='btn btn-primary'
            onClick={() => {
              toggleLogin(true);
            }}
          >
            Already have an account? Log in
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Register;
