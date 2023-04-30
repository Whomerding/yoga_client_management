import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import StudioOwnerForm from '../../components/StudioOwnerForm/StudioOwnerForm';
import StudentDisplayTable from '../../components/StudentDisplayTable/StudentDisplayTable';
import SearchStudents from '../../components/SearchStudents/SearchStudents';
import ClassPackageForm from '../../components/ClassPackageForm/ClassPackageForm';
import ClassPackageTable from '../../components/ClassPackageTable/ClassPackageTable';
const StudioOwnerPage = () => {
    const [user, token] = useAuth ();
    const [studio, setStudio] = useState (''); 
    const [searchTerm, setSearchTerm]=useState("");
    const [studioPackages, setStudioPackages]=useState([]);

    useEffect(()=> {
      getStudio();
      getAllClassPackages();
      // const storedData = localStorage.getItem("studioPackages");
      //   if (storedData) {
      //     setStudioPackages(JSON.parse(storedData));
      //   } else {
      //     getAllClassPackages();
      //   }
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
      const filteredData = response.data.filter((el) => el.studio.id === studio.id);
      setStudioPackages(filteredData);
      localStorage.setItem("studioPackages", JSON.stringify(filteredData));
    }
  

    console.log(studio.id)
    



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
          <div>
          <ClassPackageForm studio={studio} getAllClassPackages={getAllClassPackages} />
          </div>
          <div>
            <ClassPackageTable studio={studio} studioPackages={studioPackages} getAllClassPackages={getAllClassPackages}/>
          </div>
        </div>

     );
}
 
export default StudioOwnerPage;