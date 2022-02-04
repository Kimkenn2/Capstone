

function Checklist({list}) {

    return (
        <div className="Checklist">
            <div>{list.title}</div>
            <button>Edit</button>
        </div>
    )
}

export default Checklist