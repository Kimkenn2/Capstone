import React, {useState} from "react"
import ProfileTask from "./ProfileTask"

function Checklist({list, currentUser, owned}) {
    const [view, setView] = useState(false)

    function handleViewCancel() {
        setView(!view)
    }

    const tasks = list.tasks.map(task => 
        <ProfileTask task={task} currentUser={currentUser}/>)
    return (
        <div className="Checklist">
            <div>{list.title}</div>
            {owned ? <button onClick={() => window.location.assign(`http://localhost:4000/editchecklist/${list.id}`)}>Edit</button> : undefined }
            {view ? <button onClick={() => handleViewCancel()}>Cancel</button> : <button onClick={() => handleViewCancel()}>View</button>}
            {view ? <div>
                {tasks}
            </div> : undefined}
        </div>
    )
}

export default Checklist