import React from 'react'

export const Logout = () => {
    localStorage.removeItem ("authToken",JSON.stringify(authToken));
  return (
    <div>Logout</div>
  )
}
