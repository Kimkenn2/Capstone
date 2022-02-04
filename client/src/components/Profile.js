import NavBar from "./NavBar"
import React, {useState} from "react"
import CreateTask from "./CreateTask"


function Profile({setChecklistTitle, checklistTitle, currentUser}) {
    const [checklistForm, setChecklistForm] = useState(false)
    const [numberofCheckLists, setNumberofCheckLists] = useState(2)
    const [currentTaskTitle, setCurrentTaskTitle] = useState("")
    const [currentSubTaskTitle, setCurrentSubTaskTitle] = useState("")
    const [currentChecklist, setCurrentChecklist] = useState([])
    const [listOfTasks, setListOfTasks] = useState([])
    const [subTaskToggle, setSubTaskToggle] = useState(false)
    const [currentListOfSubTasks, setCurrentListOfSubTasks] = useState([])
    const [returnedSubmittedTask, setReturnedSubmittedTask] = useState()
    

    function newChecklistClick() {
        const data = {
            title: checklistTitle,
            creator_id: currentUser.id
        }
        if (checklistTitle == "") {
            window.alert("Title cannot be blank")
        } else {
        fetch("http://localhost:3000/checklists",{
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(rdata => setCurrentChecklist(rdata))
        // .then(console.log(rdata))
        .then(() => {
            setChecklistForm(true)
            // console.log(currentChecklist)
        })
    }}

    const renderTask = () => {
        let content = [];
        for(let i=1; i<numberofCheckLists;i++){
            // console.log(numberofCheckLists)
            content= (<CreateTask submitSubTask={submitSubTask} currentListOfSubTasks={currentListOfSubTasks} setCurrentListOfSubTasks={setCurrentListOfSubTasks} currentSubTaskTitle={currentSubTaskTitle} setCurrentSubTaskTitle={setCurrentSubTaskTitle} currentTaskTitle={currentTaskTitle} setCurrentTaskTitle={setCurrentTaskTitle} setSubTaskToggle={setSubTaskToggle} subTaskToggle={subTaskToggle} index={i}/>)
            
        }
        return(content)
    }


    const renderCurrentChecklist = 
        listOfTasks ? listOfTasks.map(task => (
            <div> - {task.title} <ul>{task.sub_tasks.map( sT => (
                <div>-- {sT.title}</div>
            )) }</ul><button onClick={() => console.log(task.sub_tasks)}>SubTasks</button>
            <div>----</div></div> 
        )) : undefined
    
    const renderCurrentSubTasks =
            currentListOfSubTasks ? currentListOfSubTasks.map(STask => (
                <div> - {STask}</div>
            )) : undefined

    function handleSubmitTask() {
        setNumberofCheckLists(numberofCheckLists+1)
        console.log(currentChecklist.id)

        const data = {
            title: currentTaskTitle,
            index: numberofCheckLists-1,
            checklist_id: currentChecklist.id
        }
        fetch("http://localhost:3000/tasks",{
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(task => {
            setListOfTasks([...listOfTasks, task]);
            setReturnedSubmittedTask(task)
        })
        .then(setCurrentTaskTitle(""))
        .then(() => secondSubmit())
        
    }

    function secondSubmit() {
        // console.log(listOfTasks)
        fetch(`http://localhost:3000/checklists/${currentChecklist.id}/tasks`)
        .then(resp => resp.json())
        .then(tasks => {
            console.log(tasks.slice(-1))
            console.log(returnedSubmittedTask)
            currentListOfSubTasks.map(subTask => submitSubTask(subTask, tasks.slice(-1)))
        })
        // .then(currentListOfSubTasks.map(subTask => submitSubTask(subTask)))
        // .then(setTimeout(() => console.log(returnedSubmittedTask), 1000))
    }

    function submitSubTask(subTask, mainTask) {
        const data = {
            title: subTask,
            task_index: (numberofCheckLists-1),
            task_id: mainTask[0].id,
            checklist_id: currentChecklist.id
        }
        console.log(mainTask[0].id)
        fetch(`http://localhost:3000/sub_tasks`,{
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(subTask => console.log(subTask))
        .then(fetch(`http://localhost:3000/checklists/${currentChecklist.id}/tasks`)
        .then(resp => resp.json())
        .then(tasks => setListOfTasks(tasks)))
        .then(() => setCurrentListOfSubTasks([]))

    }
        

    function profileOrForm() {
        if (checklistForm == false) {
            return(
                <>
                    {/* <div>Welcome, {currentUser.name}</div> */}
            <button onClick={() => console.log(currentUser)}>Log CurrentUser</button>
            <input placeholder='Insert Checklist Title' onChange={(e) => setChecklistTitle(e.target.value)}></input>
            <button onClick={() => newChecklistClick()}>+</button>
                </>
            )
        } else {
            return(
                <>
                <ul className="createList">
                    <div bold="true">{checklistTitle}</div>
            <div>Number of Tasks: {numberofCheckLists-2}</div>
                {renderTask()}
                <button onClick={() => handleSubmitTask()}>Submit Task</button>
                {/* {subTaskToggle ? <button>Submit SubTask</button> : undefined} */}
            </ul>
            <button onClick={() => console.log(currentChecklist)}>testChecklist</button>
            <button onClick={() => console.log(numberofCheckLists-1)}>index</button>
            <button onClick={() => console.log(listOfTasks)}>ListOfTasks</button>
            <button onClick={() => console.log(returnedSubmittedTask)}>RST</button>
            <button onClick={() => console.log(currentListOfSubTasks)}>SubTasks</button>
                <ul>
                    <label>SubTasks:</label>
                    {renderCurrentSubTasks}
                </ul>
                <ul>
                    <label>Tasks:</label>
                {renderCurrentChecklist}
                </ul>
                </>
            )
        }
    }

    return(
        <div className="Profile">
            <NavBar />
            {profileOrForm()}
        </div>
    )
}

export default Profile