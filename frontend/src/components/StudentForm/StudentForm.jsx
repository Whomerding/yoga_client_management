import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';


const StudentForm = () => {
    const [studios, setStudios] = useState([]);
    const [user, token] = useAuth ();
    const [studentData, setStudentData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        address: "",
        phone_number: "",
        email: user.email,
        studio_name: "",
    });

    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/studio/', {headers: {Authorization:"Bearer " + token}})
        .then(response=> setStudios(response.data))
        .catch(error=> console.error(error));
    },[]);

    const handleSubmit = async (event) => {
        
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/student/`, studentData, {headers: {Authorization:"Bearer " + token}});
            setStudentData ({
                first_name: user.first_name,
                last_name: user.last_name,
                address: "",
                phone_number: "",
                email: user.email, 
                studio_name: "",
            });
            console.log ("Studio Added!");
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
                <label>Student Address</label>
                <input type='text' name='address' value={studentData.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Student Phone Number</label>
                <input type='text' name='phone_number' value={studentData.phone_number} onChange={handleInputChange}/>
            </div>
            <div>
            <label>
                Select Your Studio
                <select>
                    {studios.map(studio => (
                    <option key={studio.id} value={studio.studio_name} onChange={handleInputChange}>{studio.studio_name}</option>
                    ))}
                </select>
                </label>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
     );
};
debugger
export default StudentForm;