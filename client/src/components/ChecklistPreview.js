function ChecklistPreview({
  checklist,
  currentUser,
  followsRendered,
  setFollowsRendered,
  usersFollows,
  loaded,
  setLoaded,
}) {
  function handleFollow() {
    const data = {
      checklist_id: checklist.id,
      user_id: currentUser.id,
    };
    // setLoaded(false)
    fetch(`http://localhost:3000/checklist_follows`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => window.location.reload());
  }

  function handleUnfollow() {
    console.log(checklist.id);
    console.log(currentUser.id);
    console.log(usersFollows);
    const targetedUnfollow = usersFollows.find(
      (f) => f.checklist_id == checklist.id && f.user_id == currentUser.id
    ).id;
    console.log(targetedUnfollow);

    fetch(`http://localhost:3000/checklist_follows/${targetedUnfollow}`, {
      method: "DELETE",
    }).then(window.location.reload());
  }
  return (
    <div className="ChecklistPreview">
      {checklist.title}
      <div>Tasks: {checklist.tasks.length}</div>
      <button
        onClick={() =>
          window.location.assign(
            `http://localhost:4000/viewchecklist/${checklist.id}`
          )
        }
      >
        👁
      </button>
      {currentUser ? (
        currentUser.id == checklist.user_id ? undefined : followsRendered.find(
            (c) => c.id == checklist.id
          ) ? (
          <button onClick={() => handleUnfollow()} className="unfollowButton">x</button>
        ) : (
          <button onClick={() => handleFollow()} className="followButton">+</button>
        )
      ) : undefined}
      {/* <button onClick={() => console.log(currentUser)}></button> */}
      {/* <button onClick={() => console.log(currentUser)}></button> */}
    </div>
  );
}

export default ChecklistPreview;
