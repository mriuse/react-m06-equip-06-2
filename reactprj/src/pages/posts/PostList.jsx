import React, {useContext} from 'react'


const PostList = ({item, user} ) => {
  const postId = item.id
  return (
    <tr>
      <th className='px-1 py-3'>{item.name}</th>
      <th className='px-1'>{item.description}</th>
      <th className='px-1'>{item.latitude}</th>
      <th className='px-1'>{item.longitude}</th>
      <th className='px-1'>{item.visibility}</th>
      <th className='px-1'>{item.author.name}</th>
      <th className='px-1 text-danger'>Like</th>
      {item.author.name === user ? (
        <th className='px-1 text-warning text-decoration-none'>
          <a href="">Editar</a> / <a href="">Esborrar</a>
        </th>
      ) : <th> Només disponible per l'autor - {item.author.name} </th> }
    </tr>
  )
}

export default PostList