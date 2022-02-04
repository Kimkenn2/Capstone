import NavBar from "./NavBar"
import CreateTask from "./CreateTask"
import React, {useState} from "react"

function CreateChecklist() {
    const [numberofCheckLists, setNumberofCheckLists] = useState(2)
    const [formState, setFormState] = useState({
        title: "",
        tasks: [{title: "adsfadsf"}, ]
    })

    const renderTask = () => {
        let content = [];
        for(let i=1; i<numberofCheckLists;i++){
            // console.log(numberofCheckLists)
            content.push(<CreateTask index={i - 1}/>)
        }
        return(content)
    }

    return (
        <div>
            <NavBar />
            <ul className="createList">
            <div>Number of Tasks: {numberofCheckLists-1}</div>
                {renderTask()}
                <button onClick={() => setNumberofCheckLists(numberofCheckLists+1)}>NewTask</button>
            </ul>
        </div>
    )
}

export default CreateChecklist


