import { Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function App() {
  return (
    <>
      <div className="section-light">
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-0'>Llocs</h1>
              <p className='mb-5'>Placeholder text</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}