import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const StudentForm = () => {
    const [studios, setStudios] = useState([]);
    const [user, token] = useAuth ();
    const navigate=useNavigate();

    const [studentData, setStudentData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        phone_number: "",
        email: "",
        studio_id: "",
    });

    useEffect(()=>{
            getAllStudios();
    },[]);

    async function getAllStudios(){
        const response = await axios.get(`http://127.0.0.1:8000/api/studio/`)
        setStudios(response.data)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student/`, studentData);
            setStudentData ({
                first_name: "",
                last_name: "",
                address: "",
                phone_number: "",
                email: "",
                studio_id: "",
            });
            const newStudent = response.data;
            await new Promise((resolve)=>setTimeout(resolve, 0));
            console.log (newStudent)
            console.log ("Student Added!");
            navigate("/login")
        }   catch (error) {
            console.log (error.response.data);
        }
    };
    const handleInputChange = (event) => {
        setStudentData({ ...studentData, [event.target.name]: event.target.value });
      };

    return ( 
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Select Your Studio
                    <select value = {studentData.studio_id} name = "studio_id" onChange={handleInputChange}>
                        {studios.map(studio => (
                        <option key={studio.id} type = 'text'  value={studio.id} >{studio.studio_name}</option>
                        ))}
                    </select>
                </label>
            </div>
            <div>
                <label>First Name</label>
                <input type='text' name='first_name' value={studentData.first_name} onChange={handleInputChange}/>
            </div>            <div>
                <label>Last Name</label>
                <input type='text' name='last_name' value={studentData.last_name} onChange={handleInputChange}/>
            </div>            <div>
                <label>Email</label>
                <input type='text' name='email' value={studentData.email} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Address</label>
                <input type='text' name='address' value={studentData.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Phone Number</label>
                <input type='text' name='phone_number' value={studentData.phone_number} onChange={handleInputChange}/>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
     );
};

export default StudentForm;