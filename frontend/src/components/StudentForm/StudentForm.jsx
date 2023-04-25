import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const StudentForm = () => {
    
    const [user, token] = useAuth ();
    const [studentData, setStudentData] = useState({
        first_name: user.first_name,
        last_name: user.last_name,
        address: "",
        phone_number: "",
        email: user.email,
        studio_name: "",
    });
  
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
        setStudentData({ ...studioData, [event.target.name]: event.target.value });
      };
   
    return ( 
        <form onSubmit={handleSubmit}>
            <div>
                <label>Studio Address</label>
                <input type='text' name='address' value={studioData.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Studio Phone Number</label>
                <input type='text' name='phone_number' value={studentData.phone_number} onChange={handleInputChange}/>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
     );
};
export default StudentForm;