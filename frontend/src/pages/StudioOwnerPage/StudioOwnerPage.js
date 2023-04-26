import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';


const StudioOwnerPage = () => {
    const [user, token] = useAuth ();
    const { state } = useLocation();
    const [students, setStudents] = useState("");
    const [newStudents, setNewStudents] = useState("");

    useEffect(()=> {
        getAllStudents();
        getNewStudents();
      }, []);
    
      async function getAllStudents(){
        const response = await axios.get(`http://127.0.0.1:8000/api/student?studio=${state.id}`, {headers: {Authorization:"Bearer " + token}})
        setStudents(response.data);
        console.log (students)
    }
    
    async function getNewStudents(){
        const response = await axios.get(`http://127.0.0.1:8000/api/student?studio=${state.id}&&new=date_joined`, {headers: {Authorization:"Bearer " + token}})
        setNewStudents(response.data);
        console.log (newStudents)
    }

    console.log("State inside of the Studio Owner Page", state)
    console.log(students)
    console.log(newStudents)

    return ( 
        <div>
            <h1>Studio Owner Page</h1>
        </div>
     );
}
 
export default StudioOwnerPage;