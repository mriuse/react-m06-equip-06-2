import React from 'react'
import { useNavigate } from 'react-router-dom';


const PostGrid = ({item, user, deletePost}) => {
  const navigate = useNavigate();

  const navTo = (page) => {
      navigate(page)
  }
  return (
    <div className='d-flex flex-row border rounded col-lg-4'>
        <img className="col-7 border rounded img-fluid" src={item.upload} alt="image not found" /> 
        <div className="col-4 ps-3 d-flex flex-column justify-content-between">
            <div>
                <h1 >{item.name}</h1>    
                <p>{item.description}</p>
                <p className='text-danger'>Like</p>
            </div>
            <div className='row pb-3 d-flex flex-wrap'>
                <div>
                    <a className='text-primary text-decoration-none px-1 small-text col-md-4' onClick={() => navTo(`/post/${item.id}`)} >Veure</a>
                </div>
                {item.author.name === user ? (
                    <div className='col-md-8'>
                        <a className='text-primary text-decoration-none px-1 small-text' onClick={() => navTo(`/post/edit/${item.id}`)}>Editar</a>
                        <a className='text-primary text-decoration-none px-1 small-text' onClick={() =>deletePost(item.id)}>Esborrar</a>
                    </div>
                ) : null }
            </div>
            
        </div>
    </div>
  )
}

export default PostGrid