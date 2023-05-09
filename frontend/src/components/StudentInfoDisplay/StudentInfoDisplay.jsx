import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import YogaLog from "../YogaLog/YogaLog";
import CheckInButton from '../CheckInButton/CheckInButton';

const StudentInfoDisplay = ({student, getStudents, setStudent}) => {
    const [user, token] = useAuth()
    const [studentClassTakenInfo, setStudentClassTakenInfo]=useState([]);
    useEffect(()=> {
        getStudentClassesTaken()
}, [student ]);

const getStudentClassesTaken= async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/classestaken/?id=${student.id}`, {headers: {Authorization:"Bearer " + token}});
        // const filteredResponse = response.data.filter(el=>(el.student.id===(student.id)));
        setStudentClassTakenInfo(response.data);
        
        
    } catch (error) {
        console.log(error)
    } 
}
    
    return ( 
        <div className='info-display'>
            <div>
                <h2 style={{fontFamily: "cursive", fontSize: "2REM", textAlign:"center", color: '#33404E'}}>{student?.first_name}'s Stats</h2>
            </div>
            <div> 
            <CheckInButton student={student}  getStudents={getStudents} />
            </div>
            <div className='container' style={{color: "black", width: "100%"}}> 
                <div className='row'>
                    <div  className= "col-sm" style={{textAlign: "center"}}>
                        <div style={{marginTop: "2rem"}}>
                            <p>Name: {student?.first_name} {student.last_name}</p>
                            <p>Phone Number: {student?.phone_number}</p>
                            <p>Email Address: {student?.email}</p>
                        </div>
                    </div>
                        <div className='col-sm' style={{overflow: 'scroll', maxHeight: '11rem'}}>
                            <p>Yoga Log</p>
                            {studentClassTakenInfo ? (<YogaLog studentClassTakenInfo={studentClassTakenInfo} setStudentClassTakenInfo={setStudentClassTakenInfo} getStudentClassesTaken={getStudentClassesTaken} />): (<p>This is your Yoga Log.  When you take classes they will show up here.</p>)}
                        </div>
                    <div className='col-sm'>
                        <p>Studio: {student?.studio.studio_name}</p>
                        <p>Member since: {student?.date_joined}</p>
                        {student.current_class_package ? (<p>Current Class Package: {student?.current_class_package?.package_type}</p>): (<p>Please Purchase A Package Below</p>)}
                        {student.current_class_package ? (
                        <div>
                            {student.current_class_package.package_type === "Unlimited" ? (
                            <p>Classes Remaining: Unlimited</p>
                            ) : (
                            <p>Classes Remaining: {student.classes_remaining}</p>
                            )}
                        </div>
                        ) : (
                        <p></p>
                        )}
                        <p>Last Payment Initiated: {student?.last_payment}</p>
                        <p>Payment Recieved: {student?.payment_last_resolved}</p>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default StudentInfoDisplay;