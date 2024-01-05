import React from 'react'

const PostsMenu = () => {
  return (
    <div>
        <nav className='d-flex flex-row justify-content-between .bg-dark'>
            <div>
                <button className=''>Afegir Entrada</button>
                <button>Grid</button>
                <button>List</button>
            </div>
            <div className='d-flex flex-row'>
                <div>*buscador inactiu*</div>
                <button>Go</button>
            </div>
        </nav>
    </div>
  )
}

export default PostsMenu