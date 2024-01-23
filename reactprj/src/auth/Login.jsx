import { useState, useContext } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { UserContext } from '../userContext';
import { useForm } from "react-hook-form";

const Login = ({ toggleLogin }) => {
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState({});
  const { register, handleSubmit } = useForm();

  let { authToken, setAuthToken } = useContext(UserContext);

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let sendLogin = (e) => {
    e.preventDefault();
    const checkUser = users.some(
      user => user.name === name && user.password === password
    );

    if(checkUser){
      setAuthToken(name);
      console.log("User login: " + name)
      localStorage.setItem ("authToken",JSON.stringify(name));
    }else{
      setError({ message: "Invalid login credentials!" });
    }
    
  }

  return (
    <>
      <Row className="border border-primary border-2 p-3 rounded">
        <Col lg={6} md={8} sm={10} xs={12} className="container-md">
          <Form action="login">
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nom d'usuari:</Form.Label>
              <Form.Control
              type="text"
              /*name="name" 
              onChange={(e) => {
                setName(e.target.value);
              }}*/
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
              type="password"
              /*name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}*/

              />
            </Form.Group>
            {error && error.message && (
              <div className="mb-3">
                <p className="text-danger">{error.message}</p>
              </div>
            )}
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
