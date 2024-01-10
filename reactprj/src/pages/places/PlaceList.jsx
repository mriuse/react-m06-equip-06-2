import { Row, Col, Button } from 'react-bootstrap';

const PlaceList = ({item, isAuthor}) => {
  return (
    <>
      <Row className='mb-3 mb-lg-0'>
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
        <div className="d-grid gap-2">
            <Button variant="secondary">Detalls</Button>
            {isAuthor && (
              <>
                <Button variant="secondary">Editar</Button>
                <Button variant="danger">Eliminar</Button>
              </>
            )}
          </div>
        </Col>  
      </Row>
    </>
  )
}

export default PlaceList;