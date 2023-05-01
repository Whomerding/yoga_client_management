
import axios from "axios";
import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";

const CheckInButton = ({student}) => {
    const [user, token]= useAuth();
    const [checkInData, setCheckInData]= useState(

    )
    useEffect(()=>{
        setCheckInData({student_id: student?.id})
    },[student])
    console.log (student.id)
    const handleClick= async (event)=> {
        event.preventDefault();
        debugger
        try {
            await axios.post("http://127.0.0.1:8000/api/classestaken/", checkInData, {headers: {Authorization:"Bearer " + token}});
            console.log("Class logged!")
        } catch (error) {
            console.log(error)
        }
    }
    
    return student && ( 
        <div>
            <button onClick={handleClick}>CheckIn</button>
        </div>
     );
}
 
export default CheckInButton;
