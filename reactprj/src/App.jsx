import React, {useState} from 'react';
import LoginRegister from './auth/LoginRegister';
import './App.scss'


function App() {
  return (
    <>
      <div className="body-custom">
        <div className="section-light">
          <LoginRegister/>
        </div>
      </div>
    </>
  )
}

export default App
