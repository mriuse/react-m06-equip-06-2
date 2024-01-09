import { Container, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PlaceGrid from './PlaceGrid';
import PlacesMenu from './PlacesMenu'

const PlacesGrid = () =>  {
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
          <Row xs={1} sm={2} md={3} xl={4}>
            { places.map( (item)=> { return (
            <>
              { item.visibility == "public" || item.author.email == usuari ? (<PlaceGrid key={item.id} item={item}/>) : <></> 
              }
            </>
            )
            })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default PlacesGrid;