import React from 'react'

export default function () {
  let user = JSON.parse(localStorage.getItem("user"));
  function CheckUserType() {
    if (user.usertype === "Student") {
      return true;
    } else {
      return false;
    }
  }
  return (
    <div>
      {CheckUserType() ? (
        <h1>finally</h1>):(
          <div>
          <h1>finally</h1>
        <button>delete</button>
        </div>)
      }
    </div>
  )
}
