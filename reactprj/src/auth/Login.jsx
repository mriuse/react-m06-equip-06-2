import React from 'react'

export const Login = () => {
  return (
    <div>
        <form action="/login" method="post">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required/>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required/>
    </div>
    <div>
      <input type="submit" value="Login"/>
    </div>
  </form>
    </div>
  )
}
