import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <>
      <div className='section-footer'>
        <Container className="d-flex justify-content-center align-items-center">
          <Row className="d-flex flex-column align-items-center">
            <Col className="w-100">
              <p className="my-auto">Marc Rius Egozcue, Martí Soler Tello | 2023-2024</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
