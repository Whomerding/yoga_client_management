import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import { format } from 'date-fns';

const StudentDisplayTable = ({studio}) => {
    const [students, setStudents] = useState();
    var today = format(new Date(), 'yyyy-MM-dd');
    
    const [updateStudent, setUpdateStudent] = useState({
        payment_last_resolved: today
    })
    const [user, token]= useAuth();
    
    const studio_id=studio.id

    useEffect(()=> {
          getAllStudents();  
      }, [students?.last_payment, students?.id, studio, students?.last_payment]);
    
    async function getAllStudents() {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/`);
        setStudents(response.data);
      }
      
      const deleteStudent = async(id) => {
          await axios.delete(`http://127.0.0.1:8000/api/student/${id}/`, {headers: {Authorization:"Bearer " + token}}).then(() => getAllStudents())
        //   await getAllStudents()
           
        }
        
    const updateStudentFunction = async (id)=> {   
            await axios.patch(`http://127.0.0.1:8000/api/student/update/${id}/`, updateStudent, {headers: {Authorization:"Bearer " + token}});
            console.log("student info updated")
            getAllStudents()
        
        } 
console.log (students)
    return students ? ( 
 
        <table className="table table-striped studio-table" style={{padding: "2rem"}} >
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Address</th>
                <th>Package Type</th>
                <th>Classes Remaining</th>
                <th>Payment Last Initiated</th>
                <th>Payment Last Recieved</th>
                <th>Click to Recieve Payment</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {students.filter((el) => el.studio?.id === studio_id) 
        .map((el)=>(       
            <tr key={el.id}>
                <td >{el.first_name}</td>
                <td >{el.last_name}</td>
                <td >{el.phone_number}</td>
                <td >{el.email}</td>
                <td style={{maxHeight: "1REM", overflow: "scroll"}}>{el.address}</td>
                <td >{el?.current_class_package?.package_type}</td>
                {el?.current_class_package?.package_type === "Unlimited" ? (<td>Unlimited</td>) : (<td>{el?.classes_remaining}</td>)}
                <td >{el?.last_payment}</td>
                <td >{el?.payment_last_resolved}</td>
                <td ><button style={{color: "darkgray"}} onClick={()=>updateStudentFunction(el.id)}>$$Recieved</button></td>
                <td><button  style={{color: "darkgray"}} onClick= {()=> deleteStudent(el.id)}>Delete</button></td> 
                 
            </tr> 
            ))}
        </tbody>
    </table>
     ):<div>Loading...</div>
    }
 
export default StudentDisplayTable;