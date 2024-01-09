import { Row, Col, Button } from 'react-bootstrap';

const PlaceList = ({item}) => {
  return (
    <>
      <Row>
        <Col className="d-none d-lg-block img-container">
        <img
            src={item.image}
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
          />
        </Col>
        <Col xs={3}>
          <p>{item.name}</p>
        </Col>
        <Col xs={3}>
          <p>{item.author.name}</p>
        </Col>
        <Col xs={3}>
          <p>{item.date}</p>
        </Col>
        <Col>
          <div className="d-grid gap-1">
            <Button variant="secondary">Detalls</Button>
            <Button variant="secondary">Editar</Button>
            <Button variant="danger">Eliminar</Button>
          </div>
        </Col>  
      </Row>
    </>
  )
}

export default PlaceList;