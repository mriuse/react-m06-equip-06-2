import React, {useState, useContext, useEffect} from 'react'

import Comment from './Comment';
import CommentAdd from './CommentAdd';
import { CommentContext } from './commentContext';
import { UserContext } from '../../../userContext';
import Alert from 'react-bootstrap/Alert';



const CommentsList = ({id, onCommentAdded}) => {
    let CommentsJSON = localStorage.getItem('comments') || '[]';
    let storedComments = JSON.parse(CommentsJSON)
    const [ Comments, setComments ] = useState(storedComments);
    
    let {authToken, setAuthToken} = useContext(UserContext)
    let [hasCommented, setHasCommented] = useState(false);
    let [postComments, setPostComments] = useState([])
    let [commentCount, setCommentCount] =useState();
    useEffect(()=>{
        let filteredComms = Comments.filter((comment)=>comment.id_post === id) || (null)
        setPostComments(filteredComms)
        setCommentCount(filteredComms.length)
        setHasCommented(filteredComms.find((comment)=>comment.user.name === authToken))
    },[])
    const handleCommentAdded = () => {
        onCommentAdded()
    }
    
return(
    
    <div className='d-flex flex-col flex-wrap pt-1'>
        {commentCount = 0 ?  
            <Alert variant='danger'> No hi ha comentaris en aquest post </Alert> :  
            <Alert variant='success'> {commentCount} comentaris en aquest post </Alert> 
        }
        
        {!hasCommented || !Comments ? <CommentAdd post_id = {id} onCommentAdded={handleCommentAdded}></CommentAdd>  : (null) }
            
            { postComments.map( (item )=> { return (
                <>
                    { item.id_post == id ? (
                    <Comment key={item.id} item={item} user={authToken} onCommentDeleted={handleCommentAdded} />
                    ) : <></> 
                    }     
                </>
                )
            })}
    </div>
  )
}

export default CommentsList