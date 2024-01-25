import {useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { CommentContext } from './comments/commentContext';
import { UserContext } from '../../userContext';
import CommentsList from './comments/CommentsList';

export default function Post() {
  let {authToken, setAuthToken} = useContext(UserContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false)
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
    },
    favorites: [{
      id: '',
      user: ''
    }]
  })
  const [isLoading, setIsLoading] = useState(true)
  const storedAuthToken = JSON.parse(localStorage.getItem("authToken")) || '';

  //Inicialització de l'array de comentaris
  let CommentsJSON = localStorage.getItem('comments') || '[]';
  let storedComments = JSON.parse(CommentsJSON)
  const [ Comments, setComments ] = useState(storedComments);

  //Inicialització del post
  useEffect(()=>{
    const postsGuardatsJSON = localStorage.getItem('posts')
    const postsGuardats = JSON.parse(postsGuardatsJSON)
    let postTrobat = postsGuardats.find((post) => post.id === id)
    setPost(postTrobat)
    setIsLoading(false)
    
    {post.favorites.filter((fav)=>fav.user === authToken)? setIsFav(true) : (null)}

  },[isLoading])
  

  const deletePostComments = (id) => {
    let comentarisGuardats = [];
    // Trec l'array de comments de localstorage
    const comentarisGuardatsJSON = localStorage.getItem('comments')
    comentarisGuardats = comentarisGuardatsJSON ? JSON.parse(comentarisGuardatsJSON) : []
    // Filtro els comments que no són del post esborrat
    comentarisGuardats = comentarisGuardats.filter(comment => comment.id_post !== id)
    // Torno a guardar l'array a localstorage
    localStorage.setItem('comments', JSON.stringify(comentarisGuardats))
  }

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

    //Ara esborro els comentaris que hi havia al post
    deletePostComments(id)
    // Com que ara tinc una pagina buida, torno a posts
    navigate('/posts')
  }
  const onCommentAdded=()=>{
    setIsLoading(true)
  }

  const handleFavs=()=>{
    if(isFav){
      let otherFavs = post.favorites.filter((fav)=>fav.user!==authToken)
      console.log(otherFavs)
      setPost({
        ...post,
        favorites: otherFavs
      })
      setIsFav(false)
    }
    else{
      let newFav = {id:post.id, user:authToken}
      let someFavs = [...post.favorites, newFav]
      setPost({
        ...post,
        favorites: someFavs
      })

      setIsFav(true)
    }
  }

  return (
    <>
    <CommentContext.Provider value={{Comments, setComments }}>
          <Card className="d-md-flex flex-column mt-2 col-md-8 offset-md-2 col-10 offset-1">
          <Card.Title className="ps-4 pt-3 bg-primary-dark border rounded-top"> <h2><b>{post.name}</b></h2> </Card.Title>
          {isLoading ? (
          <div> ...carregant </div>
          ): <div className='d-md-flex flex-md-row'>
              <Card.Body className='px-2 col-md-5 '>
              <Card.Img variant="top" src={post.upload}></Card.Img>
                  <ListGroup variant="flush">
                    <ListGroup.Item className='d-flex flex-row flex-wrap justify-content-between bg-dark-subtle border rounded-bottom'>
                      <div className='d-flex flex-row'>
                        <div className='me-4'>{post.latitude} </div>
                        <div>{post.longitude} </div>
                      </div>
                      <p>{post.author.name}</p>
                      
                      <div className='d-flex flex-row' onClick={()=>handleFavs()}>
                        {isFav ?
                        <>
                        <img className='col-2' src="https://www.freeiconspng.com/thumbs/heart-icon/valentine-heart-icon-6.png"
                             alt="Liked" /> <h3 className='col-1 px-2'> {post.favorites.length - 1}</h3>
                        </>
                        :
                        <>
                        <img className='col-2' src="https://cdn-icons-png.freepik.com/256/1077/1077035.png" 
                            alt="Not Liked" /> <h3 className='col-1 px-2'> {post.favorites.length - 1}</h3>
                        </>
                        }
                      </div>
                      
                    </ListGroup.Item>
                  </ListGroup>
                    <ListGroup.Item className='ps-3 pt-1'>
                      
                      {post.author.name === storedAuthToken ? (
                        <div className='row pb-3 d-flex flex-wrap'>
                            <a className='text-primary text-decoration-none px-1 small-text col-md-2' onClick={() => navigate(`/post/edit/${post.id}`)}>Editar</a>
                            <a className='text-primary text-decoration-none px-1 small-text col-md-2'onClick={() => deletePost(post.id)} >Esborrar</a>
                        </div>  
                      ) : null }
                    </ListGroup.Item>

              </Card.Body>
              <div>
                
              </div>
              <div className='px-2 col-md-5'>
                <ListGroup className='pt-3'>
                    <ListGroup.Item >
                      <Card.Text> {post.description} </Card.Text>
                    </ListGroup.Item>
                    <ListGroup.Item className='bg-dark-subtle'>
                      <CommentsList id={id} onCommentAdded={()=>onCommentAdded()} ></CommentsList>
                    </ListGroup.Item>                
                </ListGroup>
              </div>
            </div>
            } 
          </Card>
      </CommentContext.Provider>
    </>
  )
}