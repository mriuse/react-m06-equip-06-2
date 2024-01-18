import React from 'react'
import { useNavigate } from 'react-router-dom';


const PostGrid = ({item, user, deletePost}) => {
  const navigate = useNavigate();

  const navTo = (page) => {
      navigate(page)
  }

  return (
    <div className='d-flex flex-column m-1 border-0 rounded col-lg-3 col-10 bg-white'>
        
        <h1 className='px-3 py-2 mb-0 bg-primary-dark border rounded-top' onClick={() => navTo(`/post/${item.id}`)}><b>{item.name}</b></h1> 
        
        
        <div className='d-flex flex-row fullheight'>
            <img className="col-6 object-fit-contain border-0 rounded-bottom" src={item.upload} alt="image not found" onClick={() => navTo(`/post/${item.id}`)} />
            <div className="col-5 ps-3 d-flex flex-column justify-content-between">
                <div className='object-fit-contain'>   
                    <p >{item.description}</p>
                </div>
                <div className='row pb-3 d-flex flex-wrap'>
                <p className='text-danger'>Like</p>
                    {item.author.name === user ? (
                        <div className='col-md-8 border-top border-primary-subtle'>
                            <a className='text-primary text-decoration-none px-1 small-text' onClick={() => navTo(`/post/edit/${item.id}`)}>Editar</a>
                            <a className='text-primary text-decoration-none px-1 small-text' onClick={() =>deletePost(item.id)}>Esborrar</a>
                        </div>
                    ) : null }
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

export default PostGrid