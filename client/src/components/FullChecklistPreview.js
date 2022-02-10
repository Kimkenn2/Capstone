import React, {useState, useEffect} from "react"
import TaskPreview from "./TaskPreview"
import {useParams} from "react-router-dom"
import NavBar from "./NavBar"

function FullChecklistPreview({setCurrentUser, currentUser}) {
    const [currentChecklist, setCurrentChecklist] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [renderChecklist, setRenderChecklist] = useState()
    const [renderTasks, setRenderTasks] = useState()
    const [currentTasks, setCurrentTasks] = useState([])
    const [creator, setCreator] = useState("")
    const [followsLoaded, setFollowsLoaded] = useState(false)
    const [followsRendered, setFollowsRendered] = useState([])
    const [usersFollows, setUsersFollows] = useState(false)
    let {id} = useParams()
    useEffect(() => {
        fetch(`http://localhost:3000/checklists/${id}`)
        .then(resp => resp.json())
        .then(data => {setCurrentChecklist(data)
                       setRenderChecklist(data.tasks.map(t => (
                           <TaskPreview task={t}/>
                       ))) 
                       fetch(`http://localhost:3000/users/${data.user_id}`)
                       .then(resp => resp.json())                       
                       .then(user => setCreator(user))
                    //    .then(() => setLoaded(true))
        })
    },[])
    function loadPage() {
        if(currentChecklist == false) {
        } else if(loaded == false) {
            setLoaded(true)
            
        }
    }

    function checkFollows() {
        if (currentUser == undefined){
        console.log("no user yet")
        } else if (followsLoaded==false ){
            fetch(`http://localhost:3000/users/${currentUser.id}/checklistIFollow`)
            .then(resp => resp.json())
            .then(data => {setFollowsRendered(data)
            })

            fetch(`http://localhost:3000/users/${currentUser.id}/checklist_follows`)
            .then(resp => resp.json())
            .then(data => setUsersFollows(data))

            setFollowsLoaded(true)
        }
    }

    function handleFollow() {
        const data = {
            checklist_id: currentChecklist.id,
            user_id: currentUser.id
        }
        // setLoaded(false)
        fetch(`http://localhost:3000/checklist_follows`, {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(data) 
        })
        .then(() => window.location.reload())
    }

    function handleUnfollow() {
        console.log(currentChecklist.id)
        console.log(currentUser.id)
        console.log(usersFollows)
        const targetedUnfollow = usersFollows.find(f => f.checklist_id == currentChecklist.id && f.user_id == currentUser.id).id
        console.log(targetedUnfollow)

        fetch(`http://localhost:3000/checklist_follows/${targetedUnfollow}`, {
            method: "DELETE"
        })
        .then(window.location.reload())
    }

    // const loadCreator = creator ? <h3>Created By: {creator.username}</h3>} : undefined

    return (
        <div>
            {checkFollows()}
            {loadPage()}
            {currentChecklist ? <div>
                <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                <div className="FullChecklistPreview">
                <h1>{currentChecklist.title}</h1>
            {loaded ? (currentUser ? (currentUser.id == currentChecklist.user_id ? undefined : ( followsRendered.find(c => c.id == currentChecklist.id) ? <button onClick={() => handleUnfollow()}>x</button> : <button onClick={() => handleFollow()}>+</button>  ) ) : undefined) : undefined}
                {creator ? <h3>Created By: {creator.username}</h3> : undefined}
                {renderChecklist}
                </div>
                </div> : undefined}
        </div>
    )
}

export default FullChecklistPreview