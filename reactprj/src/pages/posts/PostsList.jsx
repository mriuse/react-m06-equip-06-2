import React, {useState, useContext, useEffect} from 'react'
import PostsMenu from './PostsMenu'
import PostList from './PostList'
import { UserContext } from '../../userContext';


const PostsList = () => {
  let { authToken, setAuthToken } = useContext(UserContext)
  const [ posts, setPosts ] = useState([])

  useState(()=>{
      const postsGuardatsJSON = localStorage.getItem('posts')
      const postsGuardats = JSON.parse(postsGuardatsJSON)
      setPosts(postsGuardats)
  })
  return (
        <div>
          <PostsMenu/>
          <div className='col-md-9 offset-md-1 px-2 pt-4 overflow-x-auto'>
            <table>
              <thead>
                <tr className='fw-bold '>
                  <th className='col-2 px-1 border-primary border-bottom'>Nom</th>
                  <th className='col-3 px-1 border-primary-subtle border-bottom'>Descripció</th>
                  <th className='col-1 px-1 border-primary border-bottom'>Latitud</th>
                  <th className='col-1 px-1 border-primary-subtle border-bottom'>Longitud</th>
                  <th className='col-1 px-1 border-primary border-bottom'>Visibilitat</th>
                  <th className='col-1 px-1 border-primary-subtle border-bottom'>Autoria</th>
                  <th className='col-1 px-1 border-primary border-bottom'>Favorits</th>
                  <th className='col-1 px-1 border-primary border-bottom'>Opcions</th>
                </tr>
              </thead>
              <tbody>
                { posts.map( (item )=> { return (
                  <>
                    { item.visibility == 'public' || item.author.name == authToken ? (<PostList  key={item.id} item={item} user={authToken}/>) : <></> 
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