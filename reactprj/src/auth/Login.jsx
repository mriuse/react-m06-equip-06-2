import React from 'react'

const Login = () => {
  return (
    <div className="d-flex flex-column align-center border border-primary border-2 border-bottom-0 p-3 rounded-top container-md">
      <form action="login">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="text" className="form-control" id="email" placeholder="example@example.com"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="text" className="form-control" id="password"/>
        </div>
        <div className="mb-3">
            <input className="btn btn-primary" type="submit" value="Login"/>
        </div>
      </form>
    </div>

  )
}

export default Login;