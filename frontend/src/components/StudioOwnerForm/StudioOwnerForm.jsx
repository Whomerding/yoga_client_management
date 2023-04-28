import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const StudioOwnerForm = () => {
    const navigate = useNavigate();
    const [user, token] = useAuth ();
    const {state}= useLocation ();
    const [studioData, setStudioData] = useState({
        id: "",
        studio_name: "",
        first_name: user.first_name,
        last_name: user.last_name,
        address: "",
        phone_number: "",
        email: user.email,
    });
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/studio/`, studioData, {headers: {Authorization:"Bearer " + token}})
            setStudioData ({
                id: "",
                studio_name: "",
                first_name: user.first_name,
                last_name: user.last_name,
                address: "",
                phone_number: "",
                email: user.email, 
            })
            const newStudio = response.data;
            await new Promise((resolve)=>setTimeout(resolve, 0));
            console.log (newStudio)
            console.log ("Studio Added!");
            navigate("/login")
        }   catch (error) {
            console.log (error.response.data);
        }
    };

    const handleInputChange = (event) => {
        setStudioData({ ...studioData, [event.target.name]: event.target.value });
      };
    
    return ( 
        <form onSubmit={handleSubmit}>
            <div>
                <label>Studio Name</label>
                <input type='text' name='studio_name' value={studioData.studio_name} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Studio Address</label>
                <input type='text' name='address' value={studioData.address} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Studio Phone Number</label>
                <input type='text' name='phone_number' value={studioData.phone_number} onChange={handleInputChange}/>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
     );
};
export default StudioOwnerForm;