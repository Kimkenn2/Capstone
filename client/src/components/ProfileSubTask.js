
import React, {useState, useEffect} from "react"

function ProfileSubTask({subTask, currentUser}) {
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
            {completed ? <input type={"checkbox"} checked onClick={() => handleUndoTask()}/> : <input type={"checkbox"} onClick={() => handleCompleteTask()}/>}
            <>{ editMode ? <input type={"text"} value={title} onChange={(e) => setTitle(e.target.value)}/> : <>{title}</>}
            {/* {renderSubTasksButton()} */}
                <button onClick={() => {setShowOptions(!showOptions)
                                        setEditMode(false)
                                        setDeleteMode(false)
                }}>⋮</button>
                {showOptions ? <div>
                    {deleteMode ? <>Are You Sure?</> : undefined}
                    {deleteMode ? <button onClick={() => handleDelete()}>Yes</button> : (editMode ? <button onClick={() => {setEditMode(false)
                                                        setTitle(subTask.title)
                    }}>Cancel</button> : <button onClick={() => setEditMode(!editMode)}>Edit</button>)}
                    {deleteMode ? <button onClick={() => setDeleteMode(false)}>No</button> : (editMode ? <button onClick={() => handleEditSubmit()}>Submit</button> : <button onClick={() => setDeleteMode(true)}>Delete</button>)}
                </div> : undefined }
            </>
           {/* - {subTask.title} */}
        </div>
    )
}

export default ProfileSubTask