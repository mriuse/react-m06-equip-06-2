import React, {useState} from 'react';
import Login from './auth/Login';
import Register from './auth/Register';
import './App.scss'


function App() {

  let [login, toggleLogin] = useState(true);
  return (
    <div>
      {login ? <Login /> : <Register />}
      <button
        onClick={() => {
          toggleLogin(!login);
        }}
      >
         {login ? "Not registered? Register here" : "Already have an account? Log in"}
      </button>
    </div>
  )
}

export default App
