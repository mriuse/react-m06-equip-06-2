import { Container, Row, Col, Button} from 'react-bootstrap';
import {useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function App() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: '', 
    name: '',
    description: '',
    upload: '',
    latitude: '',
    longitude: '',
    visibility: 'public',
    author: {
      name: '',
      email: '', 
    }
  })
  const [isLoading, setIsLoading] = useState(true)
  const storedAuthToken = JSON.parse(localStorage.getItem("authToken")) || '';

  useEffect(()=>{
    const postsGuardatsJSON = localStorage.getItem('posts')
    const postsGuardats = JSON.parse(postsGuardatsJSON)
    let postTrobat = postsGuardats.find((post) => post.id === id)
    setPost(postTrobat)
    setIsLoading(false)
  })

  const deletePost = (id) => {
    let postsGuardats = [];
    // Trec l'array de posts de localstorage
    const postsGuardatsJSON = localStorage.getItem('posts')
    postsGuardats = postsGuardatsJSON ? JSON.parse(postsGuardatsJSON) : []
    // Busco la key del post que estic editant
    let postKey = postsGuardats.findIndex((post) => post.id === id)
    // Esborro el post
    postsGuardats.splice(postKey, 1)
    // Torno a guardar l'array a localstorage
    localStorage.setItem('posts', JSON.stringify(postsGuardats))
    // Com que ara tinc una pagina buida, torno a posts
    navigate('/posts')
}

  return (
    <>
      <Card className='px-3 col-md-6 offset-md-3'>
      {isLoading ? (
      <div> ...carregant </div>
      ): <div>
        <Card.Img variant="top" src={post.upload}></Card.Img>
        <Card.Body>
          <Card.Title> {post.name} </Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item className='d-flex flex-row justify-content-between'>
                <div className='d-flex flex-row'>
                  <div className='me-4'>{post.latitude} </div>
                  <div>{post.longitude} </div>
                </div>
                <p>{post.author.name}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <Card.Text><p> {post.description} </p></Card.Text>
              </ListGroup.Item>
              <ListGroup.Item>
                
                {post.author.name === storedAuthToken ? (
                  <div className='row pb-3 d-flex flex-wrap'>
                      <a className='text-primary text-decoration-none px-1 small-text col-md-4' onClick={() => navigate(`/post/edit/${post.id}`)}>Editar</a>
                      <a className='text-primary text-decoration-none px-1 small-text col-md-4'onClick={() => deletePost(post.id)} >Esborrar</a>
                  </div>  
                ) : null }
              </ListGroup.Item>
            </ListGroup>
        </Card.Body>
        </div>
        }
      </Card>
    </>
  )
}