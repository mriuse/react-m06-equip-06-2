import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const PlacesMenu = () => {
  let places = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];
  const navigate = useNavigate();

  return (
    <>
      <Row className='mb-5'>
        <Col xs={12} md className="d-flex justify-content-start align-items-center">
          <Link to="/places/add">
            <Button variant="primary" className='m-1' style={{ minWidth: '150px' }}>+ Afegir lloc nou</Button>
          </Link>
          <InputGroup className='m-1'>
            <Button variant="outline-primary" onClick={() => navigate("/places/list")}>Llista</Button>
            <Button variant="outline-primary" onClick={() => navigate("/places/grid")}>Graella</Button>
          </InputGroup>
        </Col>
        <Col xs={12} md className="text-right">
          <InputGroup className='m-1'>
            <FormControl
              placeholder="Cercar un lloc..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <Button variant="secondary">Cercar</Button>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
}

export default PlacesMenu;
