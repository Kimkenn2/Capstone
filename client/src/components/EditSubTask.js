import React, {useState} from "react"


function EditSubTask({subTask}) {
const [editSubTask, setEditSubTask] = useState(subTask.title)

function handlePatch(){
    const data = {
        title: editSubTask
    }
    fetch(`http://localhost:3000/sub_tasks/${subTask.id}`, {
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
           - - <input type={"text"} value={editSubTask} onChange={(e) => setEditSubTask(e.target.value)}></input>
           <button onClick={() => handlePatch()}>✔</button>
        </div>
    )
}

export default EditSubTask