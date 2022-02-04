import HomePage from './components/HomePage';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import CreateChecklist from './components/CreateChecklist';
import Profile from './components/Profile';
import Login from './components/Login'

function App() {
  const [checklistTitle, setChecklistTitle] = useState("")
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(users => setCurrentUser(users[0]))
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage checklistTitle={checklistTitle} setChecklistTitle={setChecklistTitle} currentUser={currentUser}/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/CreateList" element={<CreateChecklist />} />
          <Route path="/Profile" element={<Profile checklistTitle={checklistTitle} setChecklistTitle={setChecklistTitle} currentUser={currentUser}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// require('react-dom');
// window.React2 = require('react');
// console.log(window.React1 === window.React2);
