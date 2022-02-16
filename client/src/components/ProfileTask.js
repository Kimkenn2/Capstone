import React, { useState, useEffect } from "react";
import ProfileSubTask from "./ProfileSubTask";

function ProfileTask({ task, currentUser, owned }) {
  const [toggleSubTasks, setToggleSubTasks] = useState(false);
  const [currentTask, setCurrentTask] = useState([]);
  const [renderSubTasks, setRenderSubTasks] = useState();
  const [completed, setCompleted] = useState(false);
  const [usersCompletedTasks, setUsersCompletedTasks] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [title, setTitle] = useState(task.title);
  useEffect(() => {
    fetch(`http://localhost:3000/tasks/${task.id}`)
      .then((resp) => resp.json())
      .then((taskData) => {
        setCurrentTask(taskData);
        setRenderSubTasks(
          taskData.sub_tasks.map((sub) => (
            <ProfileSubTask
              subTask={sub}
              currentUser={currentUser}
              owned={owned}
            />
          ))
        );
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUser.id}/completedtasks`)
      .then((resp) => resp.json())
      .then((data) => {
        setUsersCompletedTasks(data);
        if (data.find((t) => t.task_id == task.id).completed == true) {
          setCompleted(true);
        }
      });
  }, []);

  function handleCompleteTask() {
    const data = {
      task_id: currentTask.id,
      user_id: currentUser.id,
      completed: true,
    };
    fetch(`http://localhost:3000/completed_tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => setUsersCompletedTasks([...usersCompletedTasks, data]))
      .then(setCompleted(true));
  }

  function handleUndoTask() {
    console.log("undo");
    const thisTask = usersCompletedTasks.filter((t) => t.task_id == task.id);
    thisTask.map((task) => {
      fetch(`http://localhost:3000/completed_tasks/${task.id}`, {
        method: "DELETE",
      });
    });
    console.log(thisTask);
    setCompleted(!completed);
  }
  // const renderSubTasks = currentTask.sub_tasks.map(sub =>
  //     <ProfileSubTask subTask={sub}/>)
  function renderSubTasksButton() {
    if (currentTask.sub_tasks == false) {
      console.log("no subtasks");
    } else {
      return toggleSubTasks ? (
        <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↑</button>
      ) : (
        <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↓</button>
      );
    }
  }

  function handleEditSubmit() {
    const data = {
      title: title,
    };
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Accepts: "application:json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      setEditMode(false);
      setShowOptions(false);
    });
  }

  function handleDelete() {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    }).then(() => window.location.reload());
  }
  return (
    <div className="profileTask">
      {editMode ? undefined : completed ? (
        <input
          type={"checkbox"}
          checked
          onClick={() => handleUndoTask()}
          className="checkBox"
        />
      ) : (
        <input
          type={"checkbox"}
          onClick={() => handleCompleteTask()}
          className="checkBox"
        />
      )}
      {/* {task.title} */}
      {/* {toggleSubTasks ? <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↑</button> : <button onClick={() => setToggleSubTasks(!toggleSubTasks)}>↓</button>} */}
      <>
        {editMode ? (
          <input
            type={"text"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : completed ? (
          <a className="completed">{title}</a>
        ) : (
          <a>{title}</a>
        )}
        {renderSubTasksButton()}
        {owned ? (
          <button
            onClick={() => {
              setShowOptions(!showOptions);
              setEditMode(false);
              setDeleteMode(false);
            }}
            className="initOptions"
          >
            ⋮
          </button>
        ) : undefined}
        {showOptions ? (
          <div className="options">
            {deleteMode ? <>Are You Sure?</> : undefined}
            {deleteMode ? (
              <button onClick={() => handleDelete()} className="optionsButtons">
                Yes
              </button>
            ) : editMode ? (
              <button
                onClick={() => {
                  setEditMode(false);
                  setTitle(task.title);
                }}
                className="optionsButtons"
              >
                Cancel
              </button>
            ) : (
              <button
                onClick={() => setEditMode(!editMode)}
                className="optionsButtons"
              >
                Edit
              </button>
            )}
            {deleteMode ? (
              <button
                onClick={() => setDeleteMode(false)}
                className="optionsButtons"
              >
                No
              </button>
            ) : editMode ? (
              <button
                onClick={() => handleEditSubmit()}
                className="optionsButtons"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => setDeleteMode(true)}
                className="optionsButtons"
              >
                Delete
              </button>
            )}
          </div>
        ) : undefined}
      </>
      {/* <button onClick={() => console.log(currentTask.sub_tasks)}>log subtasks</button> */}
      {toggleSubTasks ? (
        <ul className="subTaskContainer">{renderSubTasks}</ul>
      ) : undefined}
      {/* <button onClick={() => console.log(currentTask.sub_tasks)}></button> */}
    </div>
  );
}

export default ProfileTask;
