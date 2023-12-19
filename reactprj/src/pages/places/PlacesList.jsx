import { Container, Row, Col, Button} from 'react-bootstrap';


export default function App() {
  return (
    <>
      <div className="section-light">
        <Container className="d-flex flex-column">
          <Row className='mb-5'>
            <h1>Llocs</h1>
          </Row>
          <Row className='mb-3'>
            <Col>
              <h4>Imatge</h4>
            </Col>
            <Col>
              <h4>Nom de lloc</h4>
            </Col>
            <Col>
              <h4>Descripció</h4>
            </Col>
            <Col>
              <h4>Data de creació</h4>
            </Col>
            <Col>
              <h4>Accions</h4>
            </Col>
            <hr></hr>
          </Row>
          <Row>
            <Col>
            <img
                src="https://via.placeholder.com/320x320"
                style={{ width: '100%', height: 'auto' }}
              />
            </Col>
            <Col>
              <p>Nom de lloc</p>
            </Col>
            <Col>
              <p>Aquesta és una descripció</p>
            </Col>
            <Col>
              <p>12:00 12-12-2012</p>
            </Col>
            <Col>
              <Button>Veure info</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}