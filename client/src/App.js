import HomePage from './components/HomePage';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import CreateChecklist from './components/CreateChecklist';
import Profile from './components/Profile';
import Login from './components/Login'
import Signup from './components/Signup';
import ViewProfile from './components/ViewProfile';
import UserBrowser from './components/UserBrowser';
import FullChecklistPreview from './components/FullChecklistPreview';
import BrowseChecklists from './components/BrowseChecklists';

function App() {
  const [checklistTitle, setChecklistTitle] = useState("")
  const [currentUser, setCurrentUser] = useState(undefined)
  const [authenticated, setAuthenticated] = useState(false);
  const [allUsers, setAllUsers] = useState([])

  // useEffect(() => {
  //   fetch("http://localhost:3000/users")
  //   .then(resp => resp.json())
  //   .then(users => setCurrentUser(users[0]))
  // },[])
  useEffect(() => {
    fetch("/me", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);
          setAuthenticated(true);
          console.log(user)
        });
      } else {
        setAuthenticated(true);
      }
    })
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(users => setAllUsers(users))
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage checklistTitle={checklistTitle} setChecklistTitle={setChecklistTitle} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/Login" element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/CreateList" element={<CreateChecklist setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
          <Route path="/Profile" element={<Profile checklistTitle={checklistTitle} setChecklistTitle={setChecklistTitle} currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/ViewProfile/:id" element={<ViewProfile currentUser={currentUser} allUsers={allUsers} setCurrentUser={setCurrentUser}/>} />
          <Route path="/Signup" element={<Signup currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/UserBrowser" element={<UserBrowser currentUser={currentUser} setCurrentUser={setCurrentUser} allUsers={allUsers}/>} />
          <Route path="/ChecklistBrowser" element={<BrowseChecklists currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
          <Route path="/ViewChecklist/:id" element={<FullChecklistPreview currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);
