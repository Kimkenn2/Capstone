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
        })
    },[])
    function loadPage() {
        if(currentChecklist == false) {
        } else if(loaded == false) {
            setLoaded(true)
            
        }
    }

    // const loadCreator = creator ? <h3>Created By: {creator.username}</h3>} : undefined

    return (
        <div>
            {loadPage()}
            {currentChecklist ? <div>
                <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
                <div className="FullChecklistPreview">
                <h1>{currentChecklist.title}</h1>
                {creator ? <h3>Created By: {creator.username}</h3> : undefined}
                {renderChecklist}
                </div>
                </div> : undefined}
        </div>
    )
}

export default FullChecklistPreview