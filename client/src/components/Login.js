import NavBar from "./NavBar"
import React, {useState} from "react"

function Login ({setCurrentUser, currentUser}) {
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")

function handleLogin(e) {
    e.preventDefault()

    const userCreds= {
        username: username,
        password: password
    }
    fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreds),
      })
      .then(resp => resp.json())
      .then((user) => {
          if(user.username == undefined) {
              setCurrentUser(undefined)
              window.alert("Invalid Credentials")
          } else {
          console.log(user);
          setCurrentUser(user);
          setUsername("")
          setPassword("")
          window.location.replace("http://localhost:4000/Profile")}
      })
}
    return (
        <div className="signupPage">
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <div className="Login">
                <form className="LoginForm">
                    <div className="loginFormText">Login</div>
                    <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                    <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button onClick={(e) => handleLogin(e)}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login