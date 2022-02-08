import React, {useState, useEffect} from "react"
import SubTaskPreview from "./SubTaskPreview"

function TaskPreview({task, currentUser}) {
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
                            <SubTaskPreview subTask={sub}/>))
        })
    },[])
    // const renderSubTasks = currentTask.sub_tasks.map(sub => 
    //     <ProfileSubTask subTask={sub}/>)
    function renderSubTasksButton() {
        if(currentTask.sub_tasks == false) {
        } else {
            return (toggleSubTasks ? <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↑</button> : <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↓</button>)
        }
    }
    return(
        <div>
            {task.title}
            {renderSubTasksButton()}
            {toggleSubTasks ? <ul>
               {renderSubTasks}
            </ul> : undefined}
        </div>
    )
}

export default TaskPreview