import React, {useState, useContext, useEffect} from 'react'

import Comment from './Comment';
import CommentAdd from './CommentAdd';
import { CommentContext } from './commentContext';
import { UserContext } from '../../../userContext';



const CommentsList = ({id}) => {
    let CommentsJSON = localStorage.getItem('comments') || '[]';
    let storedComments = JSON.parse(CommentsJSON)
    const [ Comments, setComments ] = useState(storedComments);
    
    let {authToken, setAuthToken} = useContext(UserContext)
    let [hasCommented, setHasCommented] = useState(false);
    let [postComments, setPostComments] = useState([])
    useEffect(()=>{
        let filteredComms = Comments.filter((comment)=>comment.id_post === id) || (null)
        setPostComments(filteredComms)
        setHasCommented(filteredComms.find((comment)=>comment.user.name === authToken))
    },[])
    const handleCommentAdded = () => {
        CommentsJSON = localStorage.getItem('comments') || '[]';
        storedComments = JSON.parse(CommentsJSON)
        setComments(storedComments)
    }
    
return(
    
    <div className='d-flex flex-col flex-wrap pt-1'>
        
        {!hasCommented || !Comments ? <CommentAdd post_id = {id} onCommentAdded={handleCommentAdded}></CommentAdd>  : (null) }
            
            { postComments.map( (item )=> { return (
                <>
                    { item.id_post == id ? (
                    <Comment key={item.id} item={item} user={authToken} />
                    ) : <></> 
                    }     
                </>
                )
            })}
    </div>
  )
}

export default CommentsList