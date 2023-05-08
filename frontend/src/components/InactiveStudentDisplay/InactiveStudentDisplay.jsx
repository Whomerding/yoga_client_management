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
    }, [studio]);
    console.log (inactiveStudents)
    async function getInactiveStudents() {
        const response = await axios.get('http://127.0.0.1:8000/api/student/' );
        const filteredResponse = response.data.filter((el)=>Date.parse(el.last_class_taken) <= Date.parse(thirtyDaysAgo))
        setInactiveStudents(filteredResponse);
    }
        


    return ( 
        <table className="table table-striped studio-table">
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Package Type</th>
                <th>Last Class Taken</th>
            </tr>
        </thead>
        <tbody>
            
        {inactiveStudents.filter((el) => el.studio.id === studio_id) 
        .map((el)=>(       
            <tr key={el.id}>
                <td>{el.first_name}</td>
                <td>{el.last_name}</td>
                <td>{el.phone_number}</td>
                <td>{el.email}</td>
                <td>{el.address}</td>
                <td>{el?.current_class_package.package_type}</td>
                <td>{el?.last_class_taken}</td>
            </tr> 
            ))}
        </tbody>
    </table>
     );
    }
 
export default StudentDisplayTable;