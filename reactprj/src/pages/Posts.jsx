import { Container, Row, Col, Button} from 'react-bootstrap';
import { RiTwitterLine, RiFacebookCircleLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";


export default function App() {
  return (
    <>
      <div className="section-dark">
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-0'>Posts</h1>
              <p className='mb-5'>Placeholder text</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}