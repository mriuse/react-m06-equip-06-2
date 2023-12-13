import React from 'react'

const Login = () => {
  return (
    <div className="border border-primary border-2 p-3 mt-5 rounded-top container-md col-lg-6 col-md-8 col-sm-10 col-12">
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