import { Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from "../../userContext";
import { ReviewContext } from './reviews/reviewContext';
import ReviewList from './reviews/ReviewList';
import { v4 as uuidv4 } from 'uuid'
import { useSpeechSynthesis } from 'react-speech-kit';

const Place = () => {
  let { authToken, setAuthToken } = useContext(UserContext);

  const { id } = useParams();
  const { speak } = useSpeechSynthesis();

  const [place, setPlace] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  let [error, setError] = useState();

  let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
  const user = users.find(user => user.name === authToken);

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
    const fetchFavorites = async () => {
      try {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const placeFavorites = favorites.filter(favorite => favorite.id_ref === id);
        const isPlaceFavorited = placeFavorites.some(favorite => favorite.user.name === user.name);
        setIsFavorited(isPlaceFavorited);
        console.log(isPlaceFavorited)
        setFavoriteCount(placeFavorites.length);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    }
    const fetchReviews = async () => {
      try {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const placeReviews = reviews.filter(review => review.id_ref === id);
        setReviewCount(placeReviews.length);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchData();
    fetchFavorites();
    fetchReviews();
  }, [id, user.name]);

  if (!place) {
    return <p>Carregant...</p>;
  }

  let isAuthor = place.author.name === user.name;

  const toggleFavorite = () => {
    try {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

      const isAlreadyFavorited = favorites.some(
        favorite => favorite.id_ref === id && favorite.user.name === user.name
      );

      if (isAlreadyFavorited) {
        favorites = favorites.filter(
          favorite => !(favorite.id_ref === id && favorite.user.name === user.name)
        );
      } else {
        favorites.push({
          id: uuidv4(),
          id_ref: id,
          user: {
            name: user.name,
            email: user.email,
          },
        });
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      setFavoriteCount(favorites.length);
      setIsFavorited(!isAlreadyFavorited);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const deleteSelf = (id) => {
    try {
      const places = JSON.parse(localStorage.getItem('places')) || [];
      if (places.length === 0) {
        throw new Error("Error: No s'ha trobat el lloc a eliminar.");
      }
      const newPlaces = places.filter((place) => place.id !== id);
      localStorage.setItem('places', JSON.stringify(newPlaces));
      navigate(-1);
    } catch (error) {
      setError(error.message);
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.altKey && event.key === 's') {
      const authStatus = authToken ? "Estàs autenticat" : "No estàs autenticat";
      const username = authToken ? user.name : "Anonymous";
      speak({ text: `${authStatus}. El teu nom d'usuari és: ${username}.` });
    }
  });

  function getAllText(element) {
    let textContent = '';
    function traverse(element) {
      if (element.nodeType === Node.TEXT_NODE) {
        textContent += element.textContent.trim() + ', ';
      } else if (element.nodeType === Node.ELEMENT_NODE) {
        for (let child of element.childNodes) {
          traverse(child);
        }
      }
    }
    traverse(element);
    return textContent.trim();
  }

  return (
    <>
      <div className="section-light">
        <Container className="d-flex flex-column">
          <Row className='mb-3'>
            <h1 onDoubleClick={(event) => speak({ text: event.target.textContent })}>{place.name}</h1>
          </Row>
          <Row className='d-flex flex-column mx-auto mb-4'>
            <Col className='img-container-lg mb-4' onDoubleClick={() => {
              const textContent = getAllText(document.body);
              speak({ text: textContent });
            }}>
              <img
                src={place.image}
                style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              />
            </Col>
            <Col className='d-flex justify-content-between'>
              <p className='mb-0' onDoubleClick={(event) => speak({ text: event.target.textContent })}><b>Autor:</b> {place.author.name}</p>
              <p onDoubleClick={(event) => speak({ text: event.target.textContent })}><i>{place.date}</i></p>
            </Col>
            <Col className="d-flex justify-content-between">
              <Button variant="primary" onClick={toggleFavorite} onDoubleClick={(event) => speak({ text: "Botó de favorit" })}>
                {isFavorited ? '-Favorit' : '+Favorit'}
              </Button>
              <InputGroup className='d-flex justify-content-end'>
                <InputGroupText onDoubleClick={(event) => speak({ text: event.target.textContent })}>{favoriteCount} favs</InputGroupText>
                <InputGroupText onDoubleClick={(event) => speak({ text: event.target.textContent })}>{reviewCount} ressenyes</InputGroupText>
              </InputGroup>
            </Col>
            <Col>
              <hr></hr>
            </Col>
          </Row>
          <Row className='d-flex flex-column'>
            <Col>
              <h5 className='mb-2' onDoubleClick={(event) => speak({ text: event.target.textContent })}>Coordenades</h5>
              <p onDoubleClick={(event) => speak({ text: event.target.textContent })}><b>Latitud: </b>{place.latitude}<br></br><b>Longitud: </b>{place.longitude}</p>
              <h5 className='mb-2' onDoubleClick={(event) => speak({ text: event.target.textContent })}>Descripció</h5>
              <p onDoubleClick={(event) => speak({ text: event.target.textContent })}>{place.description}</p>
            </Col>
            <Col className="my-4">
              <hr></hr>
            </Col>
            <Col >
              <h5 className='mb-4' onDoubleClick={(event) => speak({ text: event.target.textContent })}>Ressenyes</h5>
              <ReviewList id={id} updateReviewCount={setReviewCount} />
            </Col>
            <Col className="my-4">
              <hr></hr>
            </Col>
            <Col className="d-flex flex-row justify-content-between">
              <Col>
                {isAuthor &&
                  (
                    <>
                      <Button variant="secondary" onClick={() => navigate("/places/" + id + "/edit")}>Editar</Button>
                      <Button className="mx-1" variant="danger" onClick={() => deleteSelf(id)}>Eliminar</Button>
                    </>
                  )
                }
              </Col>
              <Button variant="primary" onClick={() => navigate("/places/list")}>Tornar</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Place;