import React from "react";
import {Link} from "react-router-dom";

function NavBar() {

    return (
        <div className="mainNavDiv">
             <div className="navLogoDiv">
                <Link to= "/" className="navBarLink">Home</Link>
            </div>
            <ul className="navBarUl">
                <Link to ="/Login" className="navBarLink">Login</Link>
                <Link to="/Profile" className="navBarLink">Profile</Link>

            </ul>
        </div>
    )
}

export default NavBar