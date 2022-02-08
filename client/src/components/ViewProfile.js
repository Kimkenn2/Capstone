import {useParams} from "react-router-dom"
import React, {useState} from "react";
import ChecklistPreview from "./ChecklistPreview";
import NavBar from "./NavBar"

function ViewProfile({allUsers, setCurrentUser, currentUser}) {
    const [loadedPage, setLoadedPage] = useState()
    const [loaded, setLoaded] = useState(false)
    const [checklists, setChecklists] = useState([])
    const [renderChecklists, setRenderChecklists] = useState()
    let {id} = useParams();
    const user = allUsers.find(u => u.id == id)

    // function renderContent() {
    //     <div>
    //         {user.username}
    //         KANGANGNAOGN
    //         <button onClick={() => console.log(id)}></button>
    //         {console.log("Test")}
    //         </div>
    // }
    function loadPage() {
        if(user == undefined) {
            // console.log("not loaded yet")
            // fetch(`http://localhost:3000/users/${id}/checklists`)
            // .then(resp => resp.json())
            // .then(data => {setChecklists(data)
            //                setRenderChecklists(data.map(c => 
            //                 <ChecklistPreview checklist={c}/>))
            //                 console.log(false)})
        } else if(loaded == false) {
            // console.log(true)
            // {renderContent()}
            setLoaded(true)
            fetch(`http://localhost:3000/users/${id}/publiclists`)
            .then(resp => resp.json())
            .then(data => {setChecklists(data)
                           setRenderChecklists(data.map(c => 
                            <ChecklistPreview checklist={c} currentUser={currentUser}/>))})
        }

    }
    return (
        <div>
            {loadPage()}
            {loaded ? <div>
                <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                <div className="ViewProfile">
            <h1>{user.username}'s Profile</h1>
            {/* <button onClick={() => console.log(id)}></button> */}
            {/* {console.log("Test")} */}
            Public Checklists:
            {renderChecklists ? renderChecklists : undefined}
            </div>
            </div> : undefined}
        </div>
    )
}

export default ViewProfile