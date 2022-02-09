import React from "react";
import {Link} from "react-router-dom";

function NavBar({setCurrentUser, currentUser}) {

    function handleLogout() {
        fetch('/logout', {method: "DELETE"})
        .then(res => {
              if (res.ok) {
                setCurrentUser(undefined)
              }
            })
    }
    return (
        <div>
            {currentUser ? <div className="mainNavDiv">
             <div className="navLogoDiv">
                <Link to= "/" className="navBarLink">Home</Link>
            </div>
            <ul className="navBarUl">
                <Link to="/Profile" className="navBarLink">{currentUser.username}</Link>
                <Link to= "/login" onClick={() => handleLogout()} className="navBarLink">Logout</Link>
                <Link to="/UserBrowser" className="navBarLink">Browse Users</Link>
                <Link to="/ChecklistBrowser" className="navBarLink">Browse Lists</Link>
                {/* <button>test</button> */}
            </ul>
        </div> : <div className="mainNavDiv">
             <div className="navLogoDiv">
                <Link to= "/" className="navBarLink">Home</Link>
            </div>
            <ul className="navBarUl">
                <Link to ="/Login" className="navBarLink">Login</Link>
                <Link to="/Signup" className="navBarLink">Sign up</Link>
                <Link to="/UserBrowser" className="navBarLink">Browse Users</Link>
                <Link to="/ChecklistBrowser" className="navBarLink">Browse Lists</Link>
            </ul>
        </div> }
        </div>
    )
}

export default NavBar