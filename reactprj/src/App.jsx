import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss'

import { UserContext } from "./userContext";

import About from "./pages/About";
import Places from "./pages/Places";
import Posts from "./pages/Posts";
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
                <Route path="/places" element={<Places/>} />
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
