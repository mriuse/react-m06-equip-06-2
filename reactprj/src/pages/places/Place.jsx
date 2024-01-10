import { Container, Row, Col, Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const places = JSON.parse(localStorage.getItem('places')) || [];
    const place = places.find(item => item.id === id);

    if (place) {
      setPlace(place);
    }
  }, [id]);

  if (!place) {
    return <p>Carregant...</p>;
  }

  return (
    <>
      <div className="section-light">
        <Container className="d-flex align-items-center">
          <Row>
          <h1 className='mb-0'>{place.name}</h1>
            <Col className="d-flex flex-column">
              <p>ID: {place.id}</p>
              <p>Description: {place.description}</p>
              <p>Author: {place.author.name}</p>
              <p>Date: {place.date}</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Place;