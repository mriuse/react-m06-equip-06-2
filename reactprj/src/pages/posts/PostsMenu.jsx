import React from 'react'
import { Container, Navbar, Nav, NavbarText, Button } from 'react-bootstrap';
import SearchBar from '../../partials/Searchbar';
import { NavLink, useLocation } from 'react-router-dom';


const PostsMenu = () => {
  const location = useLocation();
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className='d-flex flex-column flex-md-row text-light bg-dark py-3 px-2'>
        <div className='col-9 col-md-5'>
          <NavLink className='mx-2' to="/posts/add"><Button variant="outline-primary" className='col-5' size="sm">+ Afegir Entrada  </Button></NavLink>
          <div className='btn-group me-3 col-5'>
            <NavLink to="/posts" ><Button variant="outline-primary" size="sm"   active={location.pathname === '/posts'}> Grid </Button></NavLink>
            <NavLink to="/posts/list"><Button variant="outline-primary" size="sm"active={location.pathname === '/posts/list'}> List </Button></NavLink>
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