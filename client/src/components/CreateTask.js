import CreateSubTask from "./CreateSubTask"
import React, {useState} from "react";

function CreateTask({submitSubTask, setCurrentTaskTitle, setSubTaskToggle, subTaskToggle, currentTaskTitle, currentSubTaskTitle, setCurrentSubTaskTitle, currentListOfSubTasks, setCurrentListOfSubTasks}) {
    const [numberOfSubTasks, setNumberOfSubTasks] = useState(1)
    const renderSubTask = () => {
        let content = [];
        for(let i=1; i<numberOfSubTasks;i++){
            // console.log(numberofCheckLists)
            content.push(<CreateSubTask i={i} submitSubTask={submitSubTask} currentListOfSubTasks={currentListOfSubTasks} setCurrentListOfSubTasks={setCurrentListOfSubTasks} currentSubTaskTitle={currentSubTaskTitle} setCurrentSubTaskTitle={setCurrentSubTaskTitle} subTaskToggle={subTaskToggle}/>)
        }
        return(content)

    }
    function handleAddSubTask() {
        setSubTaskToggle(true);
        setNumberOfSubTasks(numberOfSubTasks+1)
    }
    function handleSubtractSubTask() {
        setSubTaskToggle(false)
        setNumberOfSubTasks(numberOfSubTasks-1)
    }
    return (
        <div className="Task">
        <input placeholder="Add a Task" value={currentTaskTitle} onChange={(e) => setCurrentTaskTitle(e.target.value)}></input>
        {subTaskToggle ? <button onClick={() => handleSubtractSubTask()}>- SubTask</button> : <button onClick={() => handleAddSubTask()}>+ SubTask</button>}
        {renderSubTask()}
    </div>
    )
}

export default CreateTask