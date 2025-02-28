import { Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stringify } from 'uuid';

const PlaceList = ({item, isAuthor, deleteSelf, error}) => {
  const navigate = useNavigate();
  console.log(item)
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
            <Button variant="secondary" onClick={()=>navigate("/places/"+item.id)}>Detalls</Button>
            {isAuthor && (
              <>
                <Button variant="secondary" onClick={()=>navigate("/places/"+item.id+"/edit")}>Editar</Button>
                <Button variant="danger" onClick={()=>deleteSelf(item.id)}>Eliminar</Button>
                {error && (
                  <Row>
                    <Col>
                      <p className="text-danger">{error}</p>
                    </Col>
                  </Row>
                )}
              </>
            )}
          </div>
        </Col>  
      </Row>
    </>
  )
}

export default PlaceList;