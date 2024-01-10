import { Row, Col, Button } from 'react-bootstrap';

const PlaceGrid = ({item, isAuthor}) => {
  return (
    <>
      <Col className='mb-5'>
        <Col className='mb-3'>
          <img
            src={item.image}
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
          />
        </Col>
        <Col className='mb-3'>
          <h3>{item.name}</h3>
        </Col>
        <Col>
          <p><b>Creat per: </b>{item.author.name}</p>
        </Col>
        <Col>
          <p><b>Data: </b>{item.date}</p>
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
      </Col>
    </>
  )
}

export default PlaceGrid;