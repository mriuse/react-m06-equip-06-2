import { Form, Button, Row, Col } from 'react-bootstrap';

const Register = () => {
  let setLogin = () => {
    console.log("Log in");
  }
  return (
    <Row className="border border-2 border-top-1 border-primary p-3 rounded">
      <Col lg={6} md={8} sm={10} xs={12} className="container-md">
        <Form action="register">
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
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="example@example.com"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password_confirm">
            <Form.Label>Confirm password:</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" onClick={setLogin}>Register</Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}

export default Register;
