import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const StudioOwnerForm = () => {
    
    const [user, token] = useAuth ();
    const [studioData, setStudioData] = useState({
        studio_name: "",
        first_name: user.first_name,
        last_name: user.last_name,
        address: "",
        phone_number: "",
        email: user.email,
    });
  
    const handleSubmit = async (event) => {
        
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/studio/`, studioData, {headers: {Authorization:"Bearer " + token}});
            setStudioData ({
                studio_name: "",
                first_name: user.first_name,
                last_name: user.last_name,
                address: "",
                phone_number: "",
                email: user.email, 
            });
            console.log ("Studio Added!");
        }   catch (error) {
            console.log (error);
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