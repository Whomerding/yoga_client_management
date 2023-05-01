import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const StudentDisplayTable = ({studio}) => {
    const [inactiveStudents, setInactiveStudents] = useState([]);
    const [user, token]= useAuth();
    const studio_id=studio.id
    var today = new Date();
    var thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
     
    
    
    useEffect(()=> {
        getInactiveStudents();  
    }, []);
    
    async function getInactiveStudents() {
        const response = await axios.get('http://127.0.0.1:8000/api/classestaken/', {headers: {Authorization:"Bearer " + token}} );
        const filteredResponse = response.data.filter((el)=>Date.parse(el.classes_taken) >= Date.parse(thirtyDaysAgo))
        setInactiveStudents(filteredResponse);
    }
        
console.log (thirtyDaysAgo)
console.log (inactiveStudents)
    return ( 
 
        <table class="table table-dark">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Package Type</th>
            </tr>
        </thead>
        <tbody>
            
        {inactiveStudents.filter((el) => el.student.studio === studio_id)
        .map((el)=>(       
            <tr key={el.id}>
                <td>{el.student.first_name}</td>
                <td>{el.student.last_name}</td>
                <td>{el.student.phone_number}</td>
                <td>{el.student.email}</td>
                <td>{el.student.address}</td>
                <td>{el.student.current_class_package}</td>
            </tr> 
            ))}
        </tbody>
    </table>
     );
    }
 
export default StudentDisplayTable;