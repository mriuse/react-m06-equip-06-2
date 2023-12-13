import React from 'react'

const Register = () => {
  return (
    <div className="d-flex flex-column align-center border border-2 border-top-1 border-primary p-3 rounded-bottom container-md">
      <form action="register">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="text" className="form-control" id="email" placeholder="example@example.com"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="text" className="form-control" id="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password_confirm" className="form-label">Confirm password:</label>
          <input type="text" className="form-control" id="password_confirm"/>
        </div>
        <div className="mb-3">
            <input className="btn btn-primary" type="submit" value="Register"/>
        </div>
      </form>
    </div>

  )
}

export default Register;
