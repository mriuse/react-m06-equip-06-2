import React, {useState} from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.scss'


function App() {

  let [login, toggleLogin] = useState(true);
  return (
    <>
      <div className="body-custom">
        <div className="section-light">
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
        </div>
      </div>
    </>
  )
}

export default App
