import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import StudioOwnerForm from '../../components/StudioOwnerForm/StudioOwnerForm';
import StudentDisplayTable from '../../components/StudentDisplayTable/StudentDisplayTable';
import SearchStudents from '../../components/SearchStudents/SearchStudents';


const StudioOwnerPage = () => {
    const [user, token] = useAuth ();
    const [studio, setStudio] = useState (''); 
    const [searchTerm, setSearchTerm]=useState("");
   

    useEffect(()=> {
      getStudio();
   
      }, []);


      async function getStudio(){
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/studio/`)
          const filteredStudios = response.data.filter(el=>(el.email.toLowerCase()===(user.email.toLowerCase())))
          const studio = filteredStudios[0]
          setStudio(studio);          
        } catch (error) {
          
        }
    }

    console.log(studio)



    return ( 
        <div>
          <div>
            <StudioOwnerForm/>
          </div>
          <div>
            {/* <SearchStudents setSearchTerm={setSearchTerm} searchTerm={searchTerm}/> */}
          </div>
          <div>
            <StudentDisplayTable studio={studio} 
            searchTerm={searchTerm} 
            />
          </div>
        </div>

     );
}
 
export default StudioOwnerPage;