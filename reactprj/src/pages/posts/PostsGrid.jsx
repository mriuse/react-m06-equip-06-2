import React, {useState, useContext, useEffect} from 'react'
import PostsMenu from './PostsMenu'
import PostGrid from './PostGrid'
import { UserContext } from '../../userContext';


const PostsGrid = () => {
  let { authToken, setAuthToken } = useContext(UserContext)
  const [ postList, setPostList ] = useState([])

  useState(()=>{
      const postsGuardatsJSON = localStorage.getItem('posts') || "[]"
      const postsGuardats = JSON.parse(postsGuardatsJSON)
      setPostList(postsGuardats)
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
    setPostList(postsGuardats)
  }
  return (
        <div className='bg-dark-subtle'>
          <PostsMenu/>
          <div className='d-flex flex-row flex-wrap pt-1 offset-2 col-lg-10'>
            { postList.map( (item )=> { return (
              <>
                { item.visibility == 'public' || item.author.name == authToken ? (
                  <PostGrid key={item.id} item={item} user={authToken} deletePost={deletePost} />
                ) : <></> 
                }     
              </>
            )
            })}
          </div>          
        </div>
  )
}

export default PostsGrid