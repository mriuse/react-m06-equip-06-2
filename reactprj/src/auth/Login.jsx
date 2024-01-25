import { useState, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { UserContext } from '../userContext';
import { useForm } from "react-hook-form";

const Login = ({ toggleLogin }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const { setAuthToken } = useContext(UserContext);

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const sendLogin = (data) => {
    const checkUser = users.some(
      user => user.name === data.name && user.password === data.password
    );

    if(checkUser){
      setAuthToken(data.name);
      console.log("User login: " + data.name);
      localStorage.setItem ("authToken",JSON.stringify(data.name));
    }else{
      setError({ message: "Invalid login credentials!" });
    }
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
                {...register("name", {
                  required: "Aquest camp és obligatori",
                  minLength: {
                    value: 3,
                    message: "El nom ha de tenir almenys 3 caràcters",
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ']+\s[a-zA-ZÀ-ÿ']+$/,
                    message: "Introdueix un nom i cognom vàlids",
                  },
                })}
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contrasenya:</Form.Label>
              <Form.Control 
                type="password"
                {...register("password", {
                  required: "Aquest camp és obligatori",
                  minLength: {
                    value: 8,
                    message: "La contrasenya ha de tenir almenys 8 caràcters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message:
                      "La contrasenya ha de contenir almenys una majúscula, una minúscula, un número i un caràcter especial",
                  },
                })}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </Form.Group>
            {errors && errors.message && (
              <div className="mb-3">
                <p className="text-danger">{errors.message}</p>
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
          <Button 
            className='btn btn-primary'
            onClick={() => {
              toggleLogin(false);
            }}
          >
            No tens compte? Registra't
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Login;
