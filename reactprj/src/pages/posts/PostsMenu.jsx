import React from 'react'
import { Navbar, Button } from 'react-bootstrap';
import SearchBar from '../../partials/Searchbar';
import { useLocation, useNavigate } from 'react-router-dom';


const PostsMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className='d-flex flex-column flex-md-row text-light bg-dark py-3 px-2'>
        <div className='col-9 col-md-5'>
          <Button variant="outline-primary" className='col-5 mx-3 pb-2' size="sm" onClick={() => navigate('/posts/add')}>+ Afegir Entrada  </Button>
          <div className='btn-group col-5'>
           <Button variant="outline-primary" size="sm"  active={location.pathname === '/posts'} onClick={() => navigate('/posts')}> Grid </Button>
           <Button variant="outline-primary" size="sm"  active={location.pathname === '/posts/list'} onClick={() => navigate('/posts/list')}> List </Button>
          </div>
        </div>
        
        <div className='col-9 col-md-5 pt-3 pt-md-0'>
          <SearchBar/>
        </div>
        
      </Navbar>
    </div>
  )
}

export default PostsMenu