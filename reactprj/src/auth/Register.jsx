import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from "react-hook-form";

const Register = ({ toggleLogin }) => {
  const { register, handleSubmit, watch, formState: {errors} } = useForm();

  const [form, setForm] = useState({});
  
  const password = watch("password");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const sendRegister = (data) => {
    let { name, password, email } = form;

    const checkDuplicates = users.filter(
      user => user.user_email === data.email
    ).length > 0;

    if(!checkDuplicates){
      let new_user = {
        name : data.name,
        email : data.email,
        password : data.password
      }
      users.push(new_user);
      localStorage.setItem ("users",JSON.stringify(users));

      console.log("New user added: " + new_user.name)
    }else{
      setError({ message: "This e-mail address has already been taken!" });
    }
  };

  return (
    <>
      <Row className="border border-2 border-top-1 border-primary p-3 rounded">
        <Col lg={6} md={8} sm={10} xs={12} className="container-md">
          <Form onSubmit={handleSubmit(sendRegister)}>
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                {...register("email", {
                  required: "Aquest camp és obligatori",
                  pattern: {
                    value: /^[^\s@]+@insjoaquimmir\.cat$/,
                    message: "Introdueix un email vàlid de l'INS Joaquim Mir",
                  },
                })}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
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
            <Form.Group className="mb-3" controlId="password_confirm">
              <Form.Label>Confirmar contrasenya:</Form.Label>
              <Form.Control
                type="password"
                {...register("password_confirm", {
                  required: "Aquest camp és obligatori",
                  validate: (value) => value === password || "Les contrasenyes no coincideixen",
                })}
              />
              {errors.password_confirm && (
                <p className="text-danger">{errors.password_confirm.message}</p>
              )}
            </Form.Group>
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