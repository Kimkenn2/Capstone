import React from "react";
import {Link} from "react-router-dom";

function NavBar({setCurrentUser}) {

    function handleLogout() {
        fetch('/logout', {method: "DELETE"})
        .then(res => {
              if (res.ok) {
                setCurrentUser(undefined)
              }
            })
    }
    return (
        <div className="mainNavDiv">
             <div className="navLogoDiv">
                <Link to= "/" className="navBarLink">Home</Link>
            </div>
            <ul className="navBarUl">
                <Link to="/Profile" className="navBarLink">Profile</Link>
                <Link to ="/Login" className="navBarLink">Login</Link>
                <Link to= "/login" onClick={() => handleLogout()} className="navBarLink">Logout</Link>

            </ul>
        </div>
    )
}

export default NavBar