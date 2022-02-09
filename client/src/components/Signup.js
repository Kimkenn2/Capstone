import NavBar from "./NavBar"
import React, {useState, useEffect} from "react"
function Signup ({setCurrentUser, currentUser}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users`)
        .then(resp => resp.json())
        .then(data => setAllUsers(data))
    },[])
    function handleSignup(e) {
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        if(allUsers.find(u => u.username == username)) {
            if(allUsers.find(u => u.username == username).username == username){
                window.alert("Username Already Taken")
            }
        }
        else {
            fetch("http://localhost:3000/users", {
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(setCurrentUser)
            }
        })
        }
        
    }
    return (
        <div>
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <div className="Login">
                <form className="LoginForm">
                    <input placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                    <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button onClick={(e) => handleSignup(e)}>Sign Up</button>
                </form>
                    <button onClick={() => console.log(allUsers)}></button>
                    <button onClick={() => console.log(allUsers[0].username)}></button>
            </div>
        </div>
    )
}

export default Signup