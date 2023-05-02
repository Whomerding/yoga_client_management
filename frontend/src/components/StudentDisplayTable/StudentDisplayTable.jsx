import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const StudentDisplayTable = ({studio, searchTerm}) => {
    const [students, setStudents] = useState([]);
    const [user, token]= useAuth();
    const studio_id=studio.id
    
    useEffect(()=> {
          getAllStudents();  
      }, []);
    
    async function getAllStudents() {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/`);
        setStudents(response.data);
      }


    const deleteStudent = async(id) => {
        await axios.delete(`http://127.0.0.1:8000/api/student/${id}/`, {headers: {Authorization:"Bearer " + token}}).then(()=> getAllStudents())
    }


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
                <th>Payment Last Initiated</th>
            </tr>
        </thead>
        <tbody>
            
        {students.filter((el) => el.studio.id === studio_id) 
        .map((el)=>(       
            <tr key={el.id}>
                <td>{el.first_name}</td>
                <td>{el.last_name}</td>
                <td>{el.phone_number}</td>
                <td>{el.email}</td>
                <td>{el.address}</td>
                <td>{el.current_class_package}</td>
                <td>{el.last_payment}</td>
                <td><button onClick= {()=> deleteStudent(el.id)}>Delete</button></td>  
            </tr> 
            ))}
        </tbody>
    </table>
     );
    }
 
export default StudentDisplayTable;