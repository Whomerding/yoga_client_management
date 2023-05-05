import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import YogaLog from "../YogaLog/YogaLog";

const StudentInfoDisplay = ({student, getStudents}) => {
    const [user, token] = useAuth()
    const [studentClassTakenInfo, setStudentClassTakenInfo]=useState([]);
    useEffect(()=> {
        getStudentClassesTaken()
}, [student]);

const getStudentClassesTaken= async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/classestaken/`, {headers: {Authorization:"Bearer " + token}});
        const filteredResponse = response.data.filter(el=>(el.student.id===(student.id)));
        setStudentClassTakenInfo(filteredResponse);
        
        console.log (studentClassTakenInfo)
    } catch (error) {
        console.log(error)
    } 
}

    return ( 
        <div className='student-info-display'>
            <div>
                <h2 style={{fontFamily: "cursive", fontSize: "2REM", textAlign:"center"}}>{student?.first_name}'s Stats</h2>
            </div>
            <div style={{columnCount: "3", textAlign: "center"}}>
                <div style={{marginTop: "2rem"}}>
                    <p>Name: {student?.first_name} {student.last_name}</p>
                    <p>Phone Number: {student?.phone_number}</p>
                    <p>Email Address: {student?.email}</p>
                </div>
                <div style={{overflow: 'scroll', maxHeight: '11rem'}}>
                    <p>Yoga Log</p>
                    <YogaLog studentClassTakenInfo={studentClassTakenInfo} setStudentClassTakenInfo={setStudentClassTakenInfo} getStudentClassesTaken={getStudentClassesTaken} />
                </div>
                <div>
                    <p>Studio: {student?.studio.studio_name}</p>
                    <p>Member since: {student?.date_joined}</p>
                    <p>Current Class Package: {student?.current_class_package?.package_type}</p>
                    <p>Classes Remaining: {student?.classes_remaining}</p>
                    <p>Last Payment Initiated: {student?.last_payment}</p>
                    <p>Payment Recieved: {student?.payment_last_resolved}</p>
                </div>
            </div> 
        </div>
     );
}
 
export default StudentInfoDisplay;