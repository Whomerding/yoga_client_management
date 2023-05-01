import axios from "axios";
import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth";

const CheckInButton = ({student}) => {
    const [user, token]= useAuth();
    const [checkInData, setCheckInData]= useState({
       student_id: student.id 
        }
    )

    const handleClick= async (event)=> {
        event.preventDefault();
        try {
            await axios.post("http://127.0.0.1:8000/api/classestaken/", checkInData, {headers: {Authorization:"Bearer " + token}});
            console.log("Class logged!")
        } catch (error) {
            console.log(error)
        }
    }
    
    return ( 
        <div>
            <button onClick={handleClick}>CheckIn</button>
        </div>
     );
}
 
export default CheckInButton;