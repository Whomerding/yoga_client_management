import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import { format } from 'date-fns';

const StudentDisplayTable = ({studio}) => {
    const [students, setStudents] = useState([
        {
            "id": 15,
            "first_name": "TEST",
            "last_name": "STUDENT",
            "date_joined": "2023-04-28",
            "last_payment": "2001-01-01",
            "address": "TEST STUDENT",
            "phone_number": 4048675309,
            "email": "TESTSTUDENT@TEST.COM",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2023-05-01",
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            },
            "current_class_package": null
        },
        {
            "id": 16,
            "first_name": "TESTSTUDENT2",
            "last_name": "TESTSTUDENT2",
            "date_joined": "2023-04-28",
            "last_payment": "2001-01-01",
            "address": "TESTSTUDENT2",
            "phone_number": 3348675309,
            "email": "TESTSTUDENT2@TEST.com",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2023-05-01",
            "studio": {
                "id": 21,
                "studio_name": "TEST2 STUDIO",
                "first_name": "TEST2",
                "last_name": "TEST2",
                "address": "TEST 2 ADDRESS",
                "phone_number": 8038675309,
                "email": "TEST2@test.com"
            },
            "current_class_package": null
        },
        {
            "id": 17,
            "first_name": "TEST STUDENT3",
            "last_name": "TEST  STUDENT3",
            "date_joined": "2023-04-28",
            "last_payment": "2001-01-01",
            "address": "TESTSTUDENT 3 ADDRESS",
            "phone_number": 3348675309,
            "email": "TESTSTUDENT3@TEST.COM",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2023-05-01",
            "studio": {
                "id": 20,
                "studio_name": "Test Studio 1",
                "first_name": "TEST1",
                "last_name": "TEST1",
                "address": "Test Address 1",
                "phone_number": 3348675309,
                "email": "TEST1@test.com"
            },
            "current_class_package": null
        },
        {
            "id": 19,
            "first_name": "TESTSTUDENT1",
            "last_name": "TESTSTUDENT1",
            "date_joined": "2023-05-01",
            "last_payment": "2023-01-02",
            "address": "Student Address",
            "phone_number": 3058675309,
            "email": "TESTSTUDENT1@TEST.COM",
            "classes_remaining": 0,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2023-05-02",
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            },
            "current_class_package": {
                "id": 30,
                "package_type": "5 Class Pass",
                "number_of_classes_included_in_package": 5,
                "price": "100.00",
                "stripe_payment_url": "https://buy.stripe.com/test_fZedSD54f1VA9ZS6op",
                "studio": {
                    "id": 22,
                    "studio_name": "TEST3 Studio",
                    "first_name": "TEST3",
                    "last_name": "TEST3",
                    "address": "TEST3 Address",
                    "phone_number": 3452134567,
                    "email": "TEST3@TEST.COM"
                }
            }
        },
        {
            "id": 20,
            "first_name": "TESTSTUDENT2",
            "last_name": "TESTSTUDENT2",
            "date_joined": "2023-05-01",
            "last_payment": "2001-01-01",
            "address": "Testing Address",
            "phone_number": 8038675309,
            "email": "TESTSTUDENT2@TEST.COM",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2023-05-01",
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            },
            "current_class_package": null
        },
        {
            "id": 21,
            "first_name": "Old",
            "last_name": "Student",
            "date_joined": "2022-07-01",
            "last_payment": "2001-01-01",
            "address": "Old Student Address",
            "phone_number": 4534567868,
            "email": "oldstudent@student.com",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2021-05-01",
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            },
            "current_class_package": null
        },
        {
            "id": 22,
            "first_name": "Another Old Student",
            "last_name": "Older",
            "date_joined": "2021-05-02",
            "last_payment": "2001-01-01",
            "address": "Random Address",
            "phone_number": 3568675301,
            "email": "ANOTHEROLDSTUDENT@gmail.com",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2021-04-01",
            "studio": {
                "id": 20,
                "studio_name": "Test Studio 1",
                "first_name": "TEST1",
                "last_name": "TEST1",
                "address": "Test Address 1",
                "phone_number": 3348675309,
                "email": "TEST1@test.com"
            },
            "current_class_package": null
        },
        {
            "id": 23,
            "first_name": "test300",
            "last_name": "test300student",
            "date_joined": "2023-05-03",
            "last_payment": null,
            "address": "1829 Tradd ave",
            "phone_number": 13344641755,
            "email": "test@test.com",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": null,
            "studio": {
                "id": 23,
                "studio_name": "test300studio",
                "first_name": "test300",
                "last_name": "test300",
                "address": "test300 address",
                "phone_number": 3333003000,
                "email": "test300@test.com"
            },
            "current_class_package": null
        },
        {
            "id": 24,
            "first_name": "Wendy",
            "last_name": "Homerding",
            "date_joined": "2023-05-03",
            "last_payment": null,
            "address": "1829 Tradd ave",
            "phone_number": 13344641755,
            "email": "wendy.homerding@gmail.com",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": null,
            "studio": {
                "id": 23,
                "studio_name": "test300studio",
                "first_name": "test300",
                "last_name": "test300",
                "address": "test300 address",
                "phone_number": 3333003000,
                "email": "test300@test.com"
            },
            "current_class_package": null
        },
        {
            "id": 25,
            "first_name": "test500",
            "last_name": "test500",
            "date_joined": "2023-05-03",
            "last_payment": null,
            "address": "test500@test.com",
            "phone_number": 45556555555,
            "email": "test500@test.com",
            "classes_remaining": null,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": null,
            "studio": {
                "id": 23,
                "studio_name": "test300studio",
                "first_name": "test300",
                "last_name": "test300",
                "address": "test300 address",
                "phone_number": 3333003000,
                "email": "test300@test.com"
            },
            "current_class_package": null
        },
        {
            "id": 27,
            "first_name": "Holley",
            "last_name": "Homerding",
            "date_joined": "2023-05-03",
            "last_payment": null,
            "address": "1829 Tradd ave",
            "phone_number": 3344641755,
            "email": "Wendy.homerding@gmail.com",
            "classes_remaining": 0,
            "payment_last_resolved": "2023-05-03",
            "last_class_taken": "2023-05-03",
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            },
            "current_class_package": null
        }
    ]);
    var today = format(new Date(), 'yyyy-MM-dd');
    const [updateStudent, setUpdateStudent] = useState({
        payment_last_resolved: today
    })
    const [user, token]= useAuth();
    
    const studio_id=studio.id

    useEffect(()=> {
          getAllStudents();  
      }, [students.last_payment, studio]);
    
    async function getAllStudents() {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/`);
        setStudents(response.data);
      }
      
      const deleteStudent = async(id) => {
          await axios.delete(`http://127.0.0.1:8000/api/student/${id}/`, {headers: {Authorization:"Bearer " + token}}).then(()=> getAllStudents())
            getAllStudents()
            getAllStudents()
        }
        
        const updateStudentFunction = async (id)=> {   
                await axios.patch(`http://127.0.0.1:8000/api/student/update/${id}/`, updateStudent, {headers: {Authorization:"Bearer " + token}});
                console.log("student info updated")
                getAllStudents()
                getAllStudents()
            } 
            
console.log (students)
    return ( 
 
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
        {students.filter((el) => el.studio.id === studio_id) 
        .map((el)=>(       
            <tr key={el.id}>
                <td >{el.first_name}</td>
                <td >{el.last_name}</td>
                <td >{el.phone_number}</td>
                <td >{el.email}</td>
                <td style={{maxHeight: "1REM", overflow: "scroll"}}>{el.address}</td>
                <td >{el?.current_class_package?.package_type}</td>
                <td>{el?.classes_remaining}</td>
                <td >{el?.last_payment}</td>
                <td >{el?.payment_last_resolved}</td>
                <td ><button style={{color:"darkgrey", borderColor: "darkgrey"}}  onClick={()=>updateStudentFunction(el.id)}>$$Recieved</button></td>
                <td><button style={{color:"darkgrey", borderColor: "darkgrey"}} onClick= {()=> deleteStudent(el.id)}>Delete</button></td> 
                 
            </tr> 
            ))}
        </tbody>
    </table>
     );
    }
 
export default StudentDisplayTable;