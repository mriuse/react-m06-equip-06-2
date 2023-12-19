import { Container, Row, Col, Button} from 'react-bootstrap';
import { RiTwitterLine, RiFacebookCircleLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";


export default function App() {
  const { id } = useParams();
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