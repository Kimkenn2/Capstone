import React, {useState, useEffect} from "react";
import EditSubTask from "./EditSubTask";

function EditTask({task}) {
    const [editTask, setEditTask] = useState(task.title)
    const [renderSubTasks, setRenderSubTasks] = useState()
    const [listOfSubTasks, setListOfSubTasks] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/tasks/${task.id}`)
        .then(resp => resp.json())
        .then(taskData => {setListOfSubTasks(taskData.sub_tasks)
                           setRenderSubTasks(taskData.sub_tasks.map(sub => 
                            <EditSubTask subTask={sub}/>))
        })
    },[])

    function handlePatch() {
        const data = {
            title: editTask
        }
        fetch(`http://localhost:3000/tasks/${task.id}`,  {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                Accepts: "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(() => window.location.reload())
    }
    return (
        <div>
            <input type={"text"} value={editTask} onChange={(e) => setEditTask(e.target.value)}></input>
            <button onClick={() => handlePatch()}>✔</button>
            {renderSubTasks}
            
            {/* <button onClick={() => console.log(listOfSubTasks)}>Submit Changes</button> */}
        </div>
    )
}

export default EditTask