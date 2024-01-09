import React, {useState, useContext, useEffect} from 'react'
import PostsMenu from './PostsMenu'
import PostGrid from './PostGrid'
import { UserContext } from '../../userContext';


const PostsGrid = () => {
  let { authToken, setAuthToken } = useContext(UserContext)
  const [ postList, setPostList ] = useState([])

  useState(()=>{
      const postsGuardatsJSON = localStorage.getItem('posts')
      const postsGuardats = JSON.parse(postsGuardatsJSON)
      setPostList(postsGuardats)
  })
  return (
        <div>
          <PostsMenu/>
          <div className='d-flex flex-row flex-wrap pt-1'>
            { postList.map( (item )=> { return (
              <>
                { item.visibility == 'public' || item.author.name == authToken ? (
                  <PostGrid key={item.id} item={item} user={authToken} />
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