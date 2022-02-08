

function ChecklistPreview({checklist, currentUser}) {
    return (
        <div className="ChecklistPreview">
            {checklist.title}
            <div>
            Tasks: {checklist.tasks.length}
            </div>
            <button onClick={() => window.location.assign(`http://localhost:4000/viewchecklist/${checklist.id}`)}>👁</button>
            {currentUser ? <button>+</button> : undefined}
            <button onClick={() => console.log(currentUser)}></button>
        </div>
    )
}

export default ChecklistPreview