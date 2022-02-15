
import React, {useState, useEffect} from "react"

function ProfileSubTask({subTask, currentUser, owned}) {
    const [showOptions, setShowOptions] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [title, setTitle] = useState(subTask.title)
    const [completed, setCompleted] = useState(false)
    const [usersCompletedSubTasks, setUsersCompletedSubTasks] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/users/${currentUser.id}/completedsubtasks`)
        .then(resp => resp.json())
        .then(data => {setUsersCompletedSubTasks(data)
                       if(data.find(t => t.sub_task_id == subTask.id)){
                           setCompleted(true)
                       }})
   },[])

   function handleCompleteTask() {
    const data = {
        sub_task_id: subTask.id,
        user_id: currentUser.id
    }
    fetch(`http://localhost:3000/completed_subtasks`, {
        method: "POST",
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => setUsersCompletedSubTasks([...usersCompletedSubTasks, data]))
    .then(setCompleted(true))
    }

    function handleUndoTask() {
        console.log("undo")
        const thisTask = usersCompletedSubTasks.filter(t => t.sub_task_id == subTask.id)
        thisTask.map(subtask => {
            fetch(`http://localhost:3000/completed_subtasks/${subtask.id}`, {
                method: "DELETE"
            })
        })
        console.log(thisTask)
        setCompleted(!completed)
    }

    function handleEditSubmit() {
        const data = {
             title: title
         }
         fetch(`http://localhost:3000/sub_tasks/${subTask.id}`, {
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
         fetch(`http://localhost:3000/sub_tasks/${subTask.id}`, {
         method: "DELETE"     
     })
     .then(() => window.location.reload())
     }
    return (
        <div className="profileSubTask">
            {editMode ? undefined : (completed ? <input type={"checkbox"} checked onClick={() => handleUndoTask()}/> : <input type={"checkbox"} onClick={() => handleCompleteTask()}/>)}
            <>{ editMode ? <input className={"editInput"}type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}/> : <>{title}</>}
            {/* {renderSubTasksButton()} */}
                {owned ? <button onClick={() => {setShowOptions(!showOptions)
                                        setEditMode(false)
                                        setDeleteMode(false)
                }} className="initOptionsSubTask">⋮</button> : undefined }
                {showOptions ? <div className="options">
                    {deleteMode ? <>Are You Sure?</> : undefined}
                    {deleteMode ? <button onClick={() => handleDelete()} className="optionsButtons">Yes</button> : (editMode ? <button onClick={() => {setEditMode(false)
                                                        setTitle(subTask.title)
                    }} className="optionsButtons">Cancel</button> : <button onClick={() => setEditMode(!editMode)} className="optionsButtons">Edit</button>)}
                    {deleteMode ? <button onClick={() => setDeleteMode(false)} className="optionsButtons">No</button> : (editMode ? <button onClick={() => handleEditSubmit()} className="optionsButtons">Submit</button> : <button onClick={() => setDeleteMode(true)} className="optionsButtons">Delete</button>)}
                </div> : undefined }
            </>
           {/* - {subTask.title} */}
        </div>
    )
}

export default ProfileSubTask