import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';

const PostList = ({item, user, deletePost} ) => {
  const navigate = useNavigate();

  const navTo = (page) => {
      navigate(page)
  }
  return (
    <tr>
      <th className='px-1 py-3 bg-secondary' onClick={() => navTo(`/post/${item.id}`)}>{item.name}</th>
      <th className='px-1 bg-secondary-subtle'>{item.description}</th>
      <th className='px-1 bg-secondary'>{item.latitude}</th>
      <th className='px-1 bg-secondary-subtle'>{item.longitude}</th>
      <th className='px-1 bg-secondary'>{item.visibility}</th>
      <th className='px-1 bg-secondary-subtle'>{item.author.name}</th>
      <th className='px-1 text-danger bg-secondary'>Like</th>
      {item.author.name === user ? (
        <th className='px-1 text-warning text-decoration-none bg-secondary-subtle'>
          <a onClick={() => navTo(`/post/edit/${item.id}`)}>Editar</a> / <a onClick={()=>deletePost(item.id)}>Esborrar</a>
        </th>
      ) : <th> Només disponible per l'autor - {item.author.name} </th> }
    </tr>
  )
}

export default PostList