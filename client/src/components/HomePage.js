import React, {useState} from 'react';
// import {useHistory} from "react-router-dom"
import NavBar from './NavBar';

function HomePage({setCurrentUser}) {
    
   
    return(
        <div>
            <NavBar setCurrentUser={setCurrentUser}/>

        </div>
    )
}

export default HomePage