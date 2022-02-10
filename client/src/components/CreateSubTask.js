
function CreateSubTask({submitSubTask, subTaskToggle, currentSubTaskTitle, setCurrentSubTaskTitle, currentListOfSubTasks, setCurrentListOfSubTasks, i}) {
    function addSubTask(e) {
        e.preventDefault()
        setCurrentListOfSubTasks([...currentListOfSubTasks, currentSubTaskTitle])
        setCurrentSubTaskTitle("")
        console.log(i)
    }
    return (
        <div className="Task">
            <form onSubmit={(e) => addSubTask(e)}>
        <input placeholder="Add a Sub Task" value={currentSubTaskTitle} onChange={(e) => setCurrentSubTaskTitle(e.target.value)} onSubmit={() => addSubTask()}></input>
        {subTaskToggle ? <button onClick={() => addSubTask()}>+</button> : undefined}

            </form>
    </div>
    )
}

export default CreateSubTask