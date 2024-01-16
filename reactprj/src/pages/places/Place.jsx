import { Container, Row, Col, Button, InputGroup} from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../userContext";

const Place = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const places = JSON.parse(localStorage.getItem('places')) || [];
          const placeData = places.find(item => item.id === id);

          if (placeData) {
            setPlace(placeData);
          }
        }
      } catch (error) {
        console.error('Error fetching place data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!place) {
    return <p>Carregant...</p>;
  }
  
  let isAuthor = place.author.email === authToken;

  return (
    <>
      <div className="section-light">
        <Container className="d-flex flex-column">
          <Row className='mb-3'>
            <h1>{place.name}</h1>
          </Row>
          <Row className='d-flex flex-column mx-auto mb-4'>
            <Col className='img-container-lg mb-4'>
              <img
                src={place.image}
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              />
            </Col>
            <Col className='d-flex justify-content-between'>
              <p className='mb-0'><b>Autor:</b> {place.author.name}</p>
              <p><i>{place.date}</i></p>
            </Col>
            <Col className="d-flex justify-content-between">
                <InputGroup>
                  <InputGroupText>0</InputGroupText>
                  <Button variant="secondary">Like</Button>
                </InputGroup>
                <InputGroup className='d-flex justify-content-end'>
                  <InputGroupText>0</InputGroupText>
                  <Button variant="secondary">Fer ressenya</Button>
                </InputGroup>
            </Col>
          </Row>
          <Row className='d-flex flex-column'>
            <Col className='mb-4'>
              <h5>Coordenades</h5>
              <p><b>Latitud: </b>{place.latitude}<b> - Longitud: </b>{place.longitude}</p>
              <h5>Descripció</h5>
              <p>{place.description}</p>
            </Col>
            <Col className="d-flex flex-row justify-content-between">
              <Col>
                { isAuthor && 
                  (
                    <>
                      <Button variant="secondary" onClick={()=>navigate("/places/"+item.id+"/edit")}>Editar</Button>
                      <Button className="mx-1" variant="danger" onClick={()=>navigate("/places/"+item.id+"/delete")}>Eliminar</Button>
                    </>
                  )
                }
              </Col>
              <Button variant="primary" onClick={()=>navigate("/places/list")}>Tornar</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Place;