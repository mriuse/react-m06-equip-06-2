import React, {useState, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';

const Comment = ({id,item,user, onCommentDeleted}) => {
  let now = new Date()
  let temps
  let unitats
  var [stringedTime, setStringedTime] = useState()
  useEffect(()=>{
    let dataCreació = new Date(item.created_at)
    let diff = now - dataCreació 
    let seconds = Math.floor((diff)/1000)
    switch (true){
      case seconds < 60:
        temps = seconds
        unitats = "segons"
        break
      case seconds < 3600:
        temps = Math.floor(seconds/60)
        unitats = "minuts"
        break
      case seconds < 86400: 
        temps = Math.floor(seconds/3600)
        unitats="hores"
        break
      default:
        temps = Math.floor(seconds/86400)
        unitats="dies"
        break
    }
    setStringedTime(`${temps} ${unitats}`)
  },[])
  
  
  const deleteComment = () => {
    let comentarisGuardats = [];
    // Trec l'array de commentaris de localstorage
    const comentarisGuardatsJSON = localStorage.getItem('comments')
    comentarisGuardats = comentarisGuardatsJSON ? JSON.parse(comentarisGuardatsJSON) : []
    // Busco la key del comment
    let commentKey = comentarisGuardats.findIndex((comment) => comment.id === item.id)
    // Esborro
    comentarisGuardats.splice(commentKey, 1)
    // Torno a guardar l'array a localstorage
    localStorage.setItem('comments', JSON.stringify(comentarisGuardats))
    // Com que ara tinc una pagina buida, torno al post
    onCommentDeleted()
  }

  return (
    <ListGroup className='col-12 pb-3 d-flex flex-row align-items-start'>
      <Image className='rounded col-3 object-fit-contain bg-primary' roundedCircle  src='https://friconix.com/png/fi-xnluxx-anonymous-user-circle.png'/>
      <ListGroup.Item className='ms-3'>
        <p><b>{item.user.name}</b> ha comentat fa {stringedTime} </p>
        <p>{item.comment}</p>
        <br />
        {item.user.name === user ? <Button variant='danger' onClick={()=>deleteComment()}>Esborrar</Button>  : (null)}
      </ListGroup.Item>
    </ListGroup>
  )
}

export default Comment