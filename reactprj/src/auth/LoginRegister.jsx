import {useState} from 'react';
import Login from './Login';
import Register from './Register';
import { Container, Button, Row, Col } from 'react-bootstrap';

const LoginRegister = () => {
  let [login, toggleLogin] = useState(true);
  return (
    <>
      <div className="section-light">
        <Container>
          {login ? <Login toggleLogin={() => toggleLogin(!login)} /> : <Register toggleLogin={() => toggleLogin(!login)} />}
        </Container>
      </div>
    </>
  );
}

export default LoginRegister;
