import NavBar from "./NavBar"
import React, {useState, useEffect} from "react"
import ChecklistPreview from "./ChecklistPreview"


function BrowseChecklists({currentUser, setCurrentUser}) {
    const [lists, setLists] = useState([])
    // const [renderLists, setRenderLists] = useState()
    const [search, setSearch] = useState("")

    useEffect(() => (
        fetch("http://localhost:3000/checklistspublic")
        .then(resp => resp.json())
        .then(data => setLists(data))
    ),[])

    function searchedLists() {
        if (search == ""){
            return lists
        } else {
            return lists.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
        }
    }

    const renderLists = searchedLists().map(list => (
        <ChecklistPreview checklist={list} currentUser={currentUser}/>
    ))

    return(
        <div>
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <div className="BrowseChecklists">
                <input placeholder="Search Lists" onChange={(e) => setSearch(e.target.value)}></input>
            {renderLists ? renderLists : undefined}
            </div>
        </div>
    )
}

export default BrowseChecklists