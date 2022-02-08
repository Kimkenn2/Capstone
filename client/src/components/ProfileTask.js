import React, {useState, useEffect} from "react"
import ProfileSubTask from "./ProfileSubTask"

function ProfileTask({task, currentUser}) {
    const [toggleSubTasks, setToggleSubTasks] = useState(false)
    const [currentTask, setCurrentTask] = useState([])
    const [renderSubTasks, setRenderSubTasks] = useState()
    const [completed, setCompleted] = useState(false)
    const [usersCompletedTasks, setUsersCompletedTasks] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${task.id}`)
        .then(resp => resp.json())
        .then(taskData => {setCurrentTask(taskData)
                           setRenderSubTasks(taskData.sub_tasks.map(sub => 
                            <ProfileSubTask subTask={sub}/>))
        })
    },[])

    useEffect(() => {
         fetch(`http://localhost:3000/users/${currentUser.id}/completedtasks`)
         .then(resp => resp.json())
         .then(data => {setUsersCompletedTasks(data)
                        if(data.find(t => t.task_id == task.id).completed == true){
                            setCompleted(true)
                        }})
    },[])

    function handleCompleteTask() {
        const data = {
            task_id: currentTask.id,
            user_id: currentUser.id,
            completed: true
        }
        fetch(`http://localhost:3000/completed_tasks`, {
            method: "POST",
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(data => setUsersCompletedTasks([...usersCompletedTasks, data]))
        .then(setCompleted(true))
    }



    function handleUndoTask() {
        console.log("undo")
        const thisTask = usersCompletedTasks.filter(t => t.task_id == task.id)
        thisTask.map(task => {
            fetch(`http://localhost:3000/completed_tasks/${task.id}`, {
                method: "DELETE"
            })
        })
        console.log(thisTask)
        setCompleted(!completed)
    }
    // const renderSubTasks = currentTask.sub_tasks.map(sub => 
    //     <ProfileSubTask subTask={sub}/>)
    function renderSubTasksButton() {
        if(currentTask.sub_tasks == false) {
            console.log("no subtasks")
        } else {
            return (toggleSubTasks ? <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↑</button> : <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↓</button>)
        }
    }
    return(
        <div>
            {completed ? <input type={"checkbox"} checked onClick={() => handleUndoTask()}/> : <input type={"checkbox"} onClick={() => handleCompleteTask()}/>}
            {task.title}
            {/* {toggleSubTasks ? <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↑</button> : <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↓</button>} */}
            {renderSubTasksButton()}
            {/* <button onClick={() => console.log(currentTask.sub_tasks)}>log subtasks</button> */}
            {toggleSubTasks ? <ul>
               {renderSubTasks}
            </ul> : undefined}
            <button onClick={() => console.log(currentTask.sub_tasks)}></button>
        </div>
    )
}

export default ProfileTask