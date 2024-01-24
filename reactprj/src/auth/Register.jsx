import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Register = ({ toggleLogin }) => {
  const { register, handleSubmit } = useForm();

  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const sendLogin = (data) => {
    console.log(data);
  };

  return (
    <>
      <Row className="border border-2 border-top-1 border-primary p-3 rounded">
        <Col lg={6} md={8} sm={10} xs={12} className="container-md">
          <Form onSubmit={handleSubmit(sendLogin)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom d'usuari:</Form.Label>
              <Form.Control
                type="text"
                {...register("name")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type="email"
                {...register("email")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password_confirm">
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control
                name="" 
                type="password"
                {...register("password_confirm")}
              />
            </Form.Group>
            {error && error.message && (
              <div className="mb-3">
                <p className="text-danger">{error.message}</p>
              </div>
            )}
            <Button variant="primary" type="submit">
              Enregistrar-se
            </Button>
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
            Ja tens compte? Entra a l'aplicació
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Register;
