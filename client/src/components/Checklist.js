import React, {useState, Component} from "react"
import ProfileTask from "./ProfileTask"


function Checklist({list, currentUser, owned}) {
    const [view, setView] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [title, setTitle] = useState(list.title)

    function handleViewCancel() {
        setView(!view)
    }

    function handleEditSubmit() {
       const data = {
            title: title
        }
        fetch(`http://localhost:3000/checklists/${list.id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Accepts: "application:json"
            },
            body: JSON.stringify(data)
        })
        .then(() => setEditMode(false))
    }

    function handleDelete() {
        fetch(`http://localhost:3000/checklists/${list.id}`, {
        method: "DELETE"     
    })
    .then(() => window.location.reload())
    }

    const tasks = list.tasks.map(task => 
        <ProfileTask task={task} currentUser={currentUser}/>)
    return (
        <div className="Checklist">
            <div>{ editMode ? <input type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}/> : <>{title}</>}
                <button onClick={() => {setShowOptions(!showOptions)
                                        setEditMode(false)
                                        setDeleteMode(false)
                }}>⋮</button>
                {showOptions ? <div>
                    {deleteMode ? <>Are You Sure?</> : undefined}
                    {deleteMode ? <button onClick={() => handleDelete()}>Yes</button> : (editMode ? <button onClick={() => {setEditMode(false)
                                                        setTitle(list.title)
                    }}>Cancel</button> : <button onClick={() => setEditMode(!editMode)}>Edit</button>)}
                    {deleteMode ? <button onClick={() => setDeleteMode(false)}>No</button> : (editMode ? <button onClick={() => handleEditSubmit()}>Submit</button> : <button onClick={() => setDeleteMode(true)}>Delete</button>)}
                </div> : undefined }
            </div>
            {/* {owned ? <button onClick={() => window.location.assign(`http://localhost:4000/editchecklist/${list.id}`)}>Edit</button> : undefined } */}
            
            {view ? <button onClick={() => handleViewCancel()}>Cancel</button> : <button onClick={() => handleViewCancel()}>View</button>}
            {view ? <div>
                {tasks}
            </div> : undefined}
        </div>
    )
}

export default Checklist