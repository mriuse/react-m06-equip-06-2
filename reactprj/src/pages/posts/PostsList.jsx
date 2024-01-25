import React, {useState, useContext, useEffect} from 'react'
import PostsMenu from './PostsMenu'
import PostList from './PostList'
import { UserContext } from '../../userContext';


const PostsList = () => {
  let { authToken, setAuthToken } = useContext(UserContext)
  const [ posts, setPosts ] = useState([])

  useState(()=>{
      const postsGuardatsJSON = localStorage.getItem('posts') || [];
      const postsGuardats = JSON.parse(postsGuardatsJSON)
      setPosts(postsGuardats)
  })

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
    //Esborro els comentaris del post
    deletePostComments(id)
    // Actualitzo l'array de posts de la pagina
    setPosts(postsGuardats)
  }


  return (
        <div>
          <PostsMenu/>
          <div className='col-md-9 offset-md-1 px-2 pt-4 overflow-x-auto fullheight'>
            <table>
              <thead>
                <tr>
                  <th className='col-2 px-1 fw-bold border-primary border-bottom'>Nom</th>
                  <th className='col-3 px-1 fw-bold border-primary-subtle border-bottom'>Descripció</th>
                  <th className='col-1 px-1 fw-bold border-primary border-bottom'>Latitud</th>
                  <th className='col-1 px-1 fw-bold border-primary-subtle border-bottom'>Longitud</th>
                  <th className='col-1 px-1 fw-bold border-primary border-bottom'>Visibilitat</th>
                  <th className='col-1 px-1 fw-bold border-primary-subtle border-bottom'>Autoria</th>
                  <th className='col-1 px-1 fw-bold border-primary border-bottom'>Favorits</th>
                  <th className='col-1 px-1 fw-bold border-primary border-bottom'>Opcions</th>
                </tr>
              </thead>
              <tbody>
                { posts.map( (item)=> { return (
                  <>
                    { item.visibility == 'public' || item.author.name == authToken ? (<PostList  key={item.id} item={item} user={authToken} deletePost={deletePost}/>) : <></> 
                    }
                        
                  </>
                )
                })}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default PostsList