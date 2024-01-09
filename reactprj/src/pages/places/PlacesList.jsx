import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlaceList from './PlaceList';
import PlacesMenu from './PlacesMenu'

const PlacesList = () => {
  let places = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];

  return (
    <>
      <div className="section-light">
        <Container className="d-flex flex-column">
          <Row>
            <Col>
              <h1 className='mb-5'>Llocs</h1>
            </Col>
          </Row>
          <PlacesMenu/>
          <Row className='mb-3'>
            <Col className="d-none d-lg-block">
              <h5>Imatge</h5>
            </Col>
            <Col xs={3}>
              <h5>Nom de lloc</h5>
            </Col>
            <Col xs={3}>
              <h5>Autor</h5>
            </Col>
            <Col xs={3}>
              <h5>Data creació</h5>
            </Col>
            <Col className="d-none d-sm-block">
              <h5>Accions</h5>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>
          { places.map( (item)=> { return (
            <>
              { item.visibility == "public" || item.author.email == usuari ? (<PlaceList key={item.id} item={item}/>) : <></> 
              }
            </>
            )
          })}
        </Container>
      </div>
    </>
  )
}

export default PlacesList;