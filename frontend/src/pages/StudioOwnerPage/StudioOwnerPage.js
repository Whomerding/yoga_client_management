import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import StudioOwnerForm from '../../components/StudioOwnerForm/StudioOwnerForm';


const StudioOwnerPage = () => {
    const [user, token] = useAuth ();
    const [studio, setStudio] = useState("");


    useEffect(()=> {
      // setStudioId();
      getStudio();
      }, []);
      
      
      async function getStudio(){
        const response = await axios.get(`http://127.0.0.1:8000/api/studio?email=TEST3@TEST.com`, {headers: {Authorization:"Bearer " + token}})
        setStudio(response.data);    
    }
    console.log(studio.email)
      // async function setStudioId(){
      //   const response = await axios.get(`http://127.0.0.1:8000/api/auth/updatestudio/${user.id}/`, {headers: {Authorization:"Bearer " + token}})
      // }

    return ( 
        <div>
            <StudioOwnerForm/>
        </div>
     );
}
 
export default StudioOwnerPage;