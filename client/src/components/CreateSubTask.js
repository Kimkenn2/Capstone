
function CreateSubTask({submitSubTask, subTaskToggle, currentSubTaskTitle, setCurrentSubTaskTitle, currentListOfSubTasks, setCurrentListOfSubTasks, i}) {
    function addSubTask() {
        setCurrentListOfSubTasks([...currentListOfSubTasks, currentSubTaskTitle])
        setCurrentSubTaskTitle("")
        console.log(i)
    }
    return (
        <div className="Task">
        <input placeholder="Add a Sub Task" value={currentSubTaskTitle} onChange={(e) => setCurrentSubTaskTitle(e.target.value)}></input>
        {subTaskToggle ? <button onClick={() => addSubTask()}>+</button> : undefined}
    </div>
    )
}

export default CreateSubTask