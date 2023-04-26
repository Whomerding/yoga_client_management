import useAuth from "../../hooks/useAuth";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function UserOwnerRedirectPage() {
    const [user, token] = useAuth ();
    const [student, setStudent] = useState("");
    const [studio, setStudio] = useState("");
    const navigate = useNavigate(); 
    
    console.log (user)
    debugger
    useEffect(()=> {
        // {user.is_owner===true ? (getStudio()):
        // getStudent()};
        getStudioOrOwner();
      }, []);

    function getStudioOrOwner (){
        {user.is_owner ==true? (getStudio()): (getStudent())}
    }
    async function getStudent(){
        const response = await axios.get(`http://127.0.0.1:8000/api/student`, {headers: {Authorization:"Bearer " + token}})
        setStudent(response.data.filter(item => item.email === user.email));
        console.log (student)
        navigate("/student", {state: student})
    }
    async function getStudio(){
        const response = await axios.get(`http://127.0.0.1:8000/api/studio`, {headers: {Authorization:"Bearer " + token}})
        setStudio(response.data.filter(item => item.email === user.email));
        console.log (studio)
        navigate("/owner", {state:studio})
    }
    //   async function getStudent(){
    //     axios.get(`http://127.0.0.1:8000/api/student`, {headers: {Authorization:"Bearer " + token}})
    //     .then(response => {
    //     let filteredData = response.data.filter(item => item.email === user.email);
    //     setStudent(filteredData);
    //   })
    //     navigate("/student", {state: student})   
    //   }
    //   async function getStudio(){
    //     axios.get(`http://127.0.0.1:8000/api/studio`, {headers: {Authorization:"Bearer " + token}})
    //     .then(response => {
    //     let filteredData = response.data.filter(item => item.email === user.email);
    //     setStudio(filteredData);
    //     })
    //     navigate("/owner", {state:studio})
    // }
    
    return ( 
        <div>
            
        </div>
     );
}

export default UserOwnerRedirectPage;
