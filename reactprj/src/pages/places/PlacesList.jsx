import { Container, Row, Col } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { UserContext } from "../../userContext";
import PlaceList from './PlaceList';
import PlacesMenu from './PlacesMenu'

const PlacesList = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let [places, setPlaces] = useState(localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : []);

  let [error, setError] = useState();

  const deleteSelf = (id) => {
    try{
      if (places.length === 0){
        throw new Error("Error: No s'ha trobat el lloc a eliminar.");
      }
      const newPlaces = places.filter((place) => place.id !== id);
      console.log(JSON.stringify(newPlaces));
      localStorage.setItem('places', JSON.stringify(newPlaces));
      setPlaces(newPlaces);
    } catch (error) {
      setError(error.message);
    }
  }

  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find(user => user.name === authToken);

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
          {places.map((item) => {
            let isAuthor = item.author.email === user.email;
            return (
              <div key={item.id}>
                {
                  item.visibility === "public" || isAuthor ? (
                    <PlaceList key={item.id} item={item} isAuthor={isAuthor} deleteSelf={deleteSelf} />
                  ) : <></>
                }
              </div>
            );
          })}
        </Container>
      </div>
    </>
  )
}

export default PlacesList;