import { Container, Row, Col, Button} from 'react-bootstrap';
import { RiTwitterLine, RiFacebookCircleLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";
import { fromLonLat } from "ol/proj";
import "ol/ol.css";
import { RMap, ROSM } from "rlayers";

export default function App() {
  
const center = fromLonLat([1.72870, 41.23112]);

  return (
    <>
      <div className="section-dark">
        <Container className="d-flex justify-content-center align-items-center">
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-0'>Contacta'ns</h1>
              <p className='mb-5'>Envia'ns el teu missatge</p>
              <Button variant="outline-primary" size="lg">Formulari de contacte</Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="section-light">
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Col className="d-flex flex-column align-items-center">
              <h1 className='mb-0'>Vols visitar-nos?</h1>
              <p className='mb-5'>Ubica'ns al mapa</p>
              <RMap width={"80%"} height={"70vh"} initial={{ center: center, zoom: 18 }}>
                <ROSM />
              </RMap>
            </Col>
        </Container>
      </div>

      <div className="section-links">
        <Container className="d-flex justify-content-center align-items-center h-100">
          <Row className="d-flex flex-column align-items-center text-center">
            <Col className="w-100">
              <h3>Segueix-nos a les nostres xarxes!</h3>
            </Col>
            <Col className="w-100 justify-content-between">
              <Button variant="link" size="lg">
                <RiTwitterLine className='link-custom'/>
              </Button>
              <Button variant="link" size="lg">
                <RiFacebookCircleLine className='link-custom'/>
              </Button>
              <Button variant="link" size="lg">
                <RiGithubLine className='link-custom'/>
              </Button>
              <Button variant="link" size="lg">
                <RiLinkedinLine className='link-custom'/>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}