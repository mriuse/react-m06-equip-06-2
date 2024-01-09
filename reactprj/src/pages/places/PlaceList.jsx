import { Row, Col, Button } from 'react-bootstrap';

const PlaceList = ({item}) => {
  return (
    <>
      <Row>
        <Col className="d-none d-lg-block img-container">
        <img
            src="https://via.placeholder.com/200x200"
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
          <p></p>
        </Col>
        <Col xs={1}>
          <Button variant="secondary" className="mb-2">Detalls</Button>
          <Button variant="secondary" className="mb-2">Editar</Button>
          <Button variant="danger">Eliminar</Button>
        </Col>
      </Row>
    </>
  )
}

export default PlaceList;