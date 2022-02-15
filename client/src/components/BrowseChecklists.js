import NavBar from "./NavBar"
import React, {useState, useEffect} from "react"
import ChecklistPreview from "./ChecklistPreview"


function BrowseChecklists({currentUser, setCurrentUser}) {
    const [lists, setLists] = useState([])
    // const [renderLists, setRenderLists] = useState()
    const [search, setSearch] = useState("")
    const [followsRendered, setFollowsRendered] = useState([])
    const [usersFollows, setUsersFollows] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => (
        fetch("http://localhost:3000/checklistspublic")
        .then(resp => resp.json())
        .then(data => setLists(data))
    ),[])

        function checkFollows() {
            if (currentUser == undefined){
            console.log("no user yet")
            } else if (loaded==false ){
                fetch(`http://localhost:3000/users/${currentUser.id}/checklistIFollow`)
                .then(resp => resp.json())
                .then(data => {setFollowsRendered(data)
                })

                fetch(`http://localhost:3000/users/${currentUser.id}/checklist_follows`)
                .then(resp => resp.json())
                .then(data => setUsersFollows(data))

                setLoaded(true)
            }
        }

    function searchedLists() {
        if (search == ""){
            return lists
        } else {
            return lists.filter(game => game.title.toLowerCase().includes(search.toLowerCase()))
        }
    }

    const renderLists = searchedLists().map(list => (
        <ChecklistPreview setUsersFollows={setUsersFollows} checklist={list} currentUser={currentUser} followsRendered={followsRendered} setFollowsRendered={setFollowsRendered} usersFollows={usersFollows} loaded={loaded} setLoaded={setLoaded}/>
    ))

    return(
        <div>
            {checkFollows()}
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            <div className="BrowseChecklists">
                <input placeholder="Search Lists" onChange={(e) => setSearch(e.target.value)}></input>
                <div className="listPreviewContainer">
            {renderLists ? renderLists : undefined}
                </div>
            </div>
        </div>
    )
}

export default BrowseChecklists