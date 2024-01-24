import { useState, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { UserContext } from '../userContext';
import { useForm } from "react-hook-form";

const Login = ({ toggleLogin }) => {
  const { register, handleSubmit } = useForm();

  const { setAuthToken } = useContext(UserContext);
  const [error, setError] = useState({});
  
  const sendLogin = (data) => {
    console.log(data);
  };

  return (
    <>
      <Row className="border border-primary border-2 p-3 rounded">
        <Col lg={6} md={8} sm={10} xs={12} className="container-md">
          <Form onSubmit={handleSubmit(sendLogin)}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom d'usuari:</Form.Label>
              <Form.Control 
              type="text" 
              {...register("name")}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contrasenya:</Form.Label>
              <Form.Control type="password"
              {...register("password")}
              />
            </Form.Group>
            {error && error.message && (
              <div className="mb-3">
                <p className="text-danger">{error.message}</p>
              </div>
            )}
            <div className="mb-3">
              <Button variant="primary" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Button className='btn btn-primary'
          onClick={() => {
            toggleLogin(false)
          }}>
            No tens compte? Registra't
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Login;
