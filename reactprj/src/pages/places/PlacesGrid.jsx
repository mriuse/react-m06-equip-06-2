import { Container, Row, Col } from 'react-bootstrap';
import { useContext } from 'react';
import { UserContext } from "../../userContext";
import PlaceGrid from './PlaceGrid';
import PlacesMenu from './PlacesMenu'

const PlacesGrid = () =>  {
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
          <Row xs={1} sm={2} md={3} xl={4}>
            { places.map( (item)=> { 
              let isAuthor = item.author.email === user.email;
              return (
                <div key={item.id}>
                  { 
                    item.visibility == "public" || isAuthor ? (
                      <PlaceGrid key={item.id} item={item} isAuthor={isAuthor}/>
                    ) : <></> 
                  }
                </div>
              )
            })}
          </Row>
        </Container>
      </div>
    </>
  )
}

export default PlacesGrid;