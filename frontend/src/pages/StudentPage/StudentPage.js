import React, { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import StudentForm from '../../components/StudentForm/StudentForm';
import StudentInfoDisplay from '../../components/StudentInfoDisplay/StudentInfoDisplay';
import CheckInButton from '../../components/CheckInButton/CheckInButton';
import ClassList from '../../components/ClassList/ClassList';

const StudentPage = () => {
    const [user, token] = useAuth ();
    const [studioPackages, setStudioPackages]=useState([]);
    const [student, setStudent]=useState([]);

    useEffect(()=> {
      getAllClassPackages();
      getStudents();
    }, []);
    
    async function getAllClassPackages() {
      const response = await axios.get(`http://127.0.0.1:8000/api/classpackage/`, {headers: {Authorization:"Bearer " + token}});
      setStudioPackages(response.data);
  }

  async function getStudents() {      
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/student/`)
      const filteredStudent = response.data.filter(el=>(el.email.toLowerCase()===(user.email.toLowerCase())));
      setStudent(filteredStudent[0]);
               
    } catch (error) {
        console.log(error)
    }}
    
    

    console.log(student)
    console.log(studioPackages)


    return ( 
        <div>
            <div>
                {student.id ? (<StudentInfoDisplay student={student}/>): (<StudentForm/>)}
            </div>
            <div>
                <CheckInButton student={student}/>
            </div>
            <div>
                <ClassList student={student} studioPackages={studioPackages}/>
            </div>
        </div>

     );
}
 
export default StudentPage;