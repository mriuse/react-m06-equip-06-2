import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss'

import { UserContext } from "./userContext";

import About from "./pages/About";

import PlacesList from "./pages/places/PlacesList";
import PlacesGrid from "./pages/places/PlacesGrid"; 
import Place from "./pages/places/Place";
import PlaceAdd from "./pages/places/PlaceAdd";
import PlaceEdit from "./pages/places/PlaceEdit";
import PlaceDelete from "./pages/places/PlaceDelete";

import Posts from "./pages/posts/Posts";

import NotFound from "./pages/NotFound";

import LoginRegister from './auth/LoginRegister';

import Header from './partials/Header';
import Footer from './partials/Footer';

function App() {
  let storedAuthToken = JSON.parse(localStorage.getItem("authToken")) || '';
  let [authToken, setAuthToken] = useState(storedAuthToken);
  return (
    <>
      <div className="body-custom">
        <UserContext.Provider value={{ authToken, setAuthToken }}>
          {authToken ? (
            <>
              <Header/>
              <Routes>
                <Route path="*" element={<NotFound/>} />
                <Route path="/" element={<About/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/posts" element={<Posts/>} />
                <Route path="/places/list" element={<PlacesList/>} />
                <Route path="/places/grid" element={<PlacesGrid/>} />
                  <Route path="/places/add" element={ <PlaceAdd/> } />
                  <Route path="/places/:id" element={ <Place/> } />
                    <Route path="/places/:id/edit" element={ <PlaceEdit/> } />
                    <Route path="/places/:id/delete" element={ <PlaceDelete/> } />
              </Routes>
              <Footer/>
            </>
          ) : (
            <LoginRegister/>
          )}
        </UserContext.Provider>
      </div>
    </>
  )
}

export default App
