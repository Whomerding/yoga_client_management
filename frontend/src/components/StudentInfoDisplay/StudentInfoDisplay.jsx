import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth
 from '../../hooks/useAuth';
const StudentInfoDisplay = ({student}) => {
    // const [studentInfo, setStudentInfo]=useState()
    const [user, token] = useAuth()
//     useEffect(()=> {
//         getStudentbyId()
// }, [student.classes_remaining]);

// const getStudentbyId= async () => {
//     try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/student/${student.id}/`, {headers: {Authorization:"Bearer " + token}});
//         setStudentInfo(response.data);
//     } catch (error) {
//         console.log(error)
//     } 
// }

    return ( 
        <div className='student-info-display'>
            <div>
                <h2>{student?.first_name}'s Stats</h2>
            </div>
            <div>
                <p>Name: {student?.first_name} {student.last_name}</p>
                <p>Phone Number: {student?.phone_number}</p>
                <p>Email Address: {student?.email}</p>
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
     );
}
 
export default StudentInfoDisplay;