import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from "../../userContext";
import PlaceList from './PlaceList';
import PlacesMenu from './PlacesMenu'

const PlacesList = () => {
  let { authToken, setAuthToken } = useContext(UserContext);
  let places = localStorage.getItem('places') ? JSON.parse(localStorage.getItem('places')) : [];

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
                    <PlaceList key={item.id} item={item} isAuthor={isAuthor} />
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