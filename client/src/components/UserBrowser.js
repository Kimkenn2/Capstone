import NavBar from "./NavBar"
import React, {useState} from "react";
import {Link} from "react-router-dom";

function UserBrowser({setCurrentUser, allUsers, currentUser}) {
    const [search, setSearch] = useState("")

    const renderUsers = searchedUsers().map(u => 
        <Link to={`/viewprofile/${u.id}`} className="viewProfileLinks">{u.username}</Link>)

        function searchedUsers() {
            if (search == ""){
                return allUsers
            } else {
                return allUsers.filter(user => user.username.toLowerCase().includes(search.toLowerCase()))
            }
        }
    return (
        <div>
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                <input type="text" className="userBrowserSearch" placeholder="Search Users" value={search} onChange={(e) => setSearch(e.target.value)}></input>
            <div className="userBrowser">
            <ul className="ListofUsers">
            {allUsers ? renderUsers  : <div>Loading...</div>}
            </ul>
        </div>   
            </div>
    )
}

export default UserBrowser