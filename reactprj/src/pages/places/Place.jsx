import { Container, Row, Col, Button} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Place = () => {
  const { id } = useParams();
  return (
    <>
      <div className="section-light">
        <Container className="d-flex align-items-center">
          <Row>
          <h1 className='mb-0'>Lloc</h1>
            <Col className="d-flex flex-column">
              
              <p className='mb-5'>Placeholder text</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Place;