import NavBar from "./NavBar"
import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import EditTask from "./EditTask";


function EditChecklist({currentUser, setCurrentUser}) {
    let {id} = useParams();
    const [currentChecklist, setCurrentChecklist] = useState()
    const [renderTasks, setRenderTasks] = useState()

    useEffect(() => {fetch(`http://localhost:3000/checklists/${id}`)
    .then(resp => resp.json())
    .then(data => {setCurrentChecklist(data)
                   setRenderTasks(data.tasks.map(t => (
                       <EditTask task={t}/>
                   )))})
},[])


    return(
        <div>
            <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            <div className="EditChecklist">
            {currentChecklist ? <div>
                <h1>{currentChecklist.title}</h1>
                </div> : undefined}
                <ul className="Checklist">
                {renderTasks ? renderTasks : undefined}
                </ul>
            </div>

        </div>
    )
}

export default EditChecklist