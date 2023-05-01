import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import StudioOwnerForm from '../../components/StudioOwnerForm/StudioOwnerForm';
import StudentDisplayTable from '../../components/StudentDisplayTable/StudentDisplayTable';
import SearchStudents from '../../components/SearchStudents/SearchStudents';
import ClassPackageForm from '../../components/ClassPackageForm/ClassPackageForm';
import ClassPackageTable from '../../components/ClassPackageTable/ClassPackageTable';
import StudioInfoDisplay from '../../components/StudioInfoDisplay/StudioInfoDisplay';
import InactiveStudentDisplay from '../../components/InactiveStudentDisplay/InactiveStudentDisplay';

const StudioOwnerPage = () => {
    const [user, token] = useAuth ();
    const [studio, setStudio] = useState (''); 
    const [searchTerm, setSearchTerm]=useState("");
    const [studioPackages, setStudioPackages]=useState([]);

    useEffect(()=> {
      getStudio();
      getAllClassPackages();
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
    async function getAllClassPackages() {
      const response = await axios.get(`http://127.0.0.1:8000/api/classpackage/`, {headers: {Authorization:"Bearer " + token}});
      setStudioPackages(response.data);
  }


    console.log(studio)
    console.log(studioPackages)
  


    return ( 
        <div>

          <div>
            {studio.id ? (<StudioInfoDisplay studio={studio}/>): (<StudioOwnerForm/>)}
          </div>
          <div>
            {/* <SearchStudents setSearchTerm={setSearchTerm} searchTerm={searchTerm}/> */}
          </div>
          <div>
            <StudentDisplayTable studio={studio} 
            searchTerm={searchTerm} 
            />
          </div>
          <div>
            <ClassPackageForm studio={studio} getAllClassPackages={getAllClassPackages} />
          </div>
          <div>
            <ClassPackageTable studio={studio} studioPackages={studioPackages} getAllClassPackages={getAllClassPackages}/>
          </div>
          <div>
            <InactiveStudentDisplay studio={studio} />
          </div>
        </div>

     );
}
 
export default StudioOwnerPage;