import NavBar from "./NavBar"
import React, {useState, useEffect} from "react"
import CreateTask from "./CreateTask"
import Checklist from "./Checklist"


function Profile({setChecklistTitle, checklistTitle, currentUser, setCurrentUser}) {
    const [checklistForm, setChecklistForm] = useState(false)
    const [numberofCheckLists, setNumberofCheckLists] = useState(2)
    const [currentTaskTitle, setCurrentTaskTitle] = useState("")
    const [currentSubTaskTitle, setCurrentSubTaskTitle] = useState("")
    const [currentChecklist, setCurrentChecklist] = useState([])
    const [listOfTasks, setListOfTasks] = useState([])
    const [subTaskToggle, setSubTaskToggle] = useState(false)
    const [currentListOfSubTasks, setCurrentListOfSubTasks] = useState([])
    const [returnedSubmittedTask, setReturnedSubmittedTask] = useState()
    const [yourChecklists, setYourChecklists] = useState([])
    const [checklistsFetched, setChecklistsFetched] = useState(false)
    const [listPublic, setListPublic] = useState(false)
    const [didLoadFollowedChecklists, setDidLoadFollowedChecklists] = useState(false)
    const [followedChecklistsIds, setFollowedChecklistsIds] = useState([])
    const [followedChecklists, setFollowedChecklists] = useState([])
    const [usersFollows, setUsersFollows] = useState(false)

    function newChecklistClick(e) {
        e.preventDefault()
        const data = {
            title: checklistTitle,
            user_id: currentUser.id,
            public: false
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
        .then( () => fetch(`http://localhost:3000/checklists/${currentChecklist.id}/tasks`)
        .then(resp => resp.json())
        .then(tasks => setListOfTasks(tasks)))
        .then(() => setCurrentListOfSubTasks([]))

    }

    function renderWelcome() {
        if(currentUser == undefined) {
            console.log("no user")
        } else {
            // console.log(currentUser.username)
            return(<div>Welcome, {currentUser.username}</div>)
        }
    }
    function loadChecklists() {
        if (currentUser == undefined) {
            console.log("no current user")
        } else if(checklistsFetched == false) {  
            fetch(`http://localhost:3000/users/${currentUser.id}/checklists`)
            .then(resp => resp.json())
            .then(checklists => setYourChecklists(checklists))
            .then(setChecklistsFetched(true))
    }
        }

    

    const renderChecklists = yourChecklists ? yourChecklists.map(list => (
        <Checklist list={list} currentUser={currentUser} owned={true} usersFollows={usersFollows}/>
    ))  : undefined

        function onComplete() {
            window.location.reload()
        }

        function handlePublic() {
            setListPublic(!listPublic)
            const data = {
                public: !listPublic
            }
            console.log(!listPublic)
            fetch(`http://localhost:3000/checklists/${currentChecklist.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    Accepts: "application/json",
                },
                body: JSON.stringify(data),
            })
        }
        function loadFollowedChecklists() {
            if(currentUser == undefined){
                console.log("no user yet")
            } else if (didLoadFollowedChecklists == false) {
                fetch(`http://localhost:3000/users/${currentUser.id}/checklistIFollow`)
                .then(resp => resp.json())
                .then(data => setFollowedChecklists(data))
                .then(setDidLoadFollowedChecklists(true))

                fetch(`http://localhost:3000/users/${currentUser.id}/checklist_follows`)
                .then(resp => resp.json())
                .then(data => setUsersFollows(data))
                .then(() => console.log(usersFollows))
            }
        }

        const renderFollowedChecklists = followedChecklists ? followedChecklists.map(list => (
            <Checklist list={list} currentUser={currentUser} owned={false} usersFollows={usersFollows} setDidLoadFollowedChecklists={setDidLoadFollowedChecklists}/>
        )) : undefined
    function profileOrForm() {
        if (checklistForm == false) {
            return(
                <>
                    {loadChecklists()}
                    {renderWelcome()}
                    {loadFollowedChecklists()}
            {/* <button onClick={() => console.log(currentUser)}>Log CurrentUser</button> */}
            <form onSubmit={(e) => newChecklistClick(e)}>
            <input placeholder='Insert New Checklist Title' onChange={(e) => setChecklistTitle(e.target.value)}></input>
            <button onClick={() => newChecklistClick()}>+</button>
            </form>

            <div>
                <h2>Your Checklists:</h2>
                {renderChecklists}
            </div>
            <div>
                <h2>Checklists You Follow:</h2>
                {renderFollowedChecklists}
                {/* <button onClick={() => console.log(followedChecklists)}></button> */}
                
            </div>
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
            {/* <button onClick={() => console.log(currentChecklist)}>testChecklist</button>
            <button onClick={() => console.log(numberofCheckLists-1)}>index</button>
            <button onClick={() => console.log(listOfTasks)}>ListOfTasks</button>
            <button onClick={() => console.log(returnedSubmittedTask)}>RST</button>
            <button onClick={() => console.log(currentListOfSubTasks)}>SubTasks</button> */}
                <ul>
                    <label>SubTasks:</label>
                    {renderCurrentSubTasks}
                </ul>
                <ul>
                    <label>Tasks:</label>
                {renderCurrentChecklist}
                </ul>
                <div>
                    Public
                    <input type={"checkbox"} onClick={() => handlePublic()}></input>
                    <button onClick={() => onComplete()}>Complete</button>
                </div>
                </>
            )
        }
    }

    return(
        <div className="Profile">
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>
            {profileOrForm()}
        </div>
    )
}

export default Profile