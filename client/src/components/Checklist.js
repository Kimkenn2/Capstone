import React, {useState} from "react"
import ProfileTask from "./ProfileTask"

function Checklist({list, currentUser}) {
    const [view, setView] = useState(false)

    function handleViewCancel() {
        setView(!view)
    }

    const tasks = list.tasks.map(task => 
        <ProfileTask task={task} currentUser={currentUser}/>)
    return (
        <div className="Checklist">
            <div>{list.title}</div>
            <button onClick={() => console.log(list)}>Edit</button>
            {view ? <button onClick={() => handleViewCancel()}>Cancel</button> : <button onClick={() => handleViewCancel()}>View</button>}
            {view ? <div>
                {tasks}
            </div> : undefined}
        </div>
    )
}

export default Checklist