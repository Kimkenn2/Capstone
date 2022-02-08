import NavBar from "./NavBar"
import {Link} from "react-router-dom";

function UserBrowser({setCurrentUser, allUsers, currentUser}) {

    const renderUsers = allUsers.map(u => 
        <Link to={`/viewprofile/${u.id}`} className="viewProfileLinks">{u.username}</Link>)
    return (
        <div>
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <ul className="ListofUsers">
            {allUsers ? renderUsers  : <div>Loading...</div>}
            </ul>
        </div>
    )
}

export default UserBrowser