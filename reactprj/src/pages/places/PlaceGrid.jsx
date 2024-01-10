import { Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PlaceGrid = ({item, isAuthor}) => {
  const navigate = useNavigate();
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
            <Button variant="secondary" onClick={()=>navigate("/places/"+item.id)}>Detalls</Button>
            {isAuthor && (
              <>
                <Button variant="secondary" onClick={()=>navigate("/places/"+item.id+"/edit")}>Editar</Button>
                <Button variant="danger" onClick={()=>navigate("/places/"+item.id+"/delete")}>Eliminar</Button>
              </>
            )}
          </div>
        </Col>
      </Col>
    </>
  )
}

export default PlaceGrid;