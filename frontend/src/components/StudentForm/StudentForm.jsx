import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StudentForm = () => {
    const [studios, setStudios] = useState([]);
    const navigate = useNavigate();
    const [user, token] = useAuth ();
    // const {state} = useLocation();

    const [studentData, setStudentData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        address: "",
        phone_number: "",
        email: user.email,
        studio_id: "",
    });

    useEffect(()=>{
            getAllStudios();
    },[]);

    async function getAllStudios(){
        const response = await axios.get('http://127.0.0.1:8000/api/studio/', {headers: {Authorization:"Bearer " + token}})
        setStudios(response.data)
    }


    const handleSubmit = async (event) => {
        
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student/`, studentData, {headers: {Authorization:"Bearer " + token}});
            setStudentData ({
                first_name: user.first_name,
                last_name: user.last_name,
                address: "",
                phone_number: "",
                email: user.email,
                studio_id: "",
            });
            if(response.status === 201) {
                console.log ("Studio Added!");
                navigate("/login");
            } else {
                navigate("/registerstudent");
                alert('Something went wrong.  Please try registering again');
            }
        }   catch (error) {
            console.log (error);
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
                <label>Student Address</label>
                <input type='text' name='address' value={studentData.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Student Phone Number</label>
                <input type='text' name='phone_number' value={studentData.phone_number} onChange={handleInputChange}/>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
     );
};

export default StudentForm;