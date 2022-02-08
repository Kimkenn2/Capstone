import React, {useState} from 'react';
// import {useHistory} from "react-router-dom"
import NavBar from './NavBar';

function HomePage({setCurrentUser, currentUser}) {
    
   
    return(
        <div>
            <NavBar setCurrentUser={setCurrentUser} currentUser={currentUser}/>

        </div>
    )
}

export default HomePage