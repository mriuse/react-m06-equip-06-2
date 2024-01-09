import React from 'react'


const PostGrid = ({item}) => {
  const postId = item.id
  return (
    <div className='d-flex flex-row border rounded col-lg-4'>
        <img className="col-7 border rounded img-fluid" src={item.upload} alt="image not found" /> 
        <div className="col-4 ps-3 d-flex flex-column justify-content-between">
            <div>
                <h1>{item.name}</h1>    
                <p>{item.description}</p>
                <p className='text-danger'>Like</p>
            </div>
            
            <div className='row pb-3 d-flex flex-wrap'>
                <a className='text-primary text-decoration-none px-1 small-text col-md-4'>Veure</a>
                <a className='text-primary text-decoration-none px-1 small-text col-md-4'>Editar</a>
                <a className='text-primary text-decoration-none px-1 small-text col-md-4'>Esborrar</a>
            </div>
        </div>
    </div>
  )
}

export default PostGrid