import React, {useState} from 'react';
import LoginRegister from './auth/LoginRegister';
import './App.scss'

import { UserContext } from "./userContext";

import About from "./pages/About";
import Header from './partials/Header';
import Footer from './partials/Footer';

function App() {
  let [authToken, setAuthToken] = useState("a");
  return (
    <>
      <div className="body-custom">
        <div className="section-light">
          <UserContext.Provider value={{ authToken, setAuthToken }}>
            {authToken ? (
              <>
                <Header/>
                <About/>
                <Footer/>
              </>
            ) : (
              <LoginRegister/>
            )}
          </UserContext.Provider>
        </div>
      </div>
    </>
  )
}

export default App
