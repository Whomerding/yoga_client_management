
import axios from "axios";
import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import { format } from 'date-fns';

const CheckInButton = ({student, getStudents}) => {
    const [user, token]= useAuth();
    const [checkInData, setCheckInData]= useState();
    var today = format(new Date(), 'yyyy-MM-dd');
    const [lastClassTaken, setLastClassTaken] = useState();

    useEffect(()=>{
        setLastClassTaken({
        last_class_taken: today,
        classes_remaining: student.classes_remaining -1   
    })},[student])
    
    useEffect(()=>{
        setCheckInData({student_id: student?.id})
    },[student])
    
    console.log (student.id)
    
    const handleClick = async (event)=> {
        event.preventDefault();
       logItAll()
       console.log(lastClassTaken)
    }
    
    const logClass = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/classestaken/", checkInData, {headers: {Authorization:"Bearer " + token}});
            console.log("Class logged!")
        } catch (error) {
            console.log(error)
        } 
        }
        
    const logLastClassTaken = async () => {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/student/update/${student.id}/`, lastClassTaken, {headers: {Authorization:"Bearer " + token}});
            console.log("Last Class Taken logged!")
            getStudents()
        } catch (error) {
            console.log(error)
        } 
    }

    const logItAll = ()=> {
        logClass();
        logLastClassTaken();
 
    }

    return student && ( 
        <div>
            <button className="check-in-button" onClick={handleClick}>CHECK-IN</button>
        </div>
     );
}
 
export default CheckInButton;
