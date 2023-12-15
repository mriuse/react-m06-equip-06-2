import {useState} from 'react';
import Login from './Login';
import Register from './Register';
import { Container, Button, Row, Col } from 'react-bootstrap';

const LoginRegister = () => {
  let [login, toggleLogin] = useState(true);
  return (
    <Container>
    {login ? <Login /> : <Register />}
      <Row className="mt-3">
        <Col>
          <Button
            className='btn btn-primary'
            onClick={() => {
              toggleLogin(!login);
            }}
          >
            {login ? "Not registered? Register here" : "Already have an account? Log in"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRegister;
