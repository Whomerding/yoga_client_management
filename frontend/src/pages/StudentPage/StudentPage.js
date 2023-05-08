import React, { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useRef } from 'react';
import StudentForm from '../../components/StudentForm/StudentForm';
import StudentInfoDisplay from '../../components/StudentInfoDisplay/StudentInfoDisplay';
import CheckInButton from '../../components/CheckInButton/CheckInButton';
import ClassList from '../../components/ClassList/ClassList';
import Footer from "../../components/Footer/Footer"
const StudentPage = () => {
    const [user, token] = useAuth ();
    const [studioPackages, setStudioPackages]=useState([[
        {
            "id": 29,
            "package_type": "drop in class",
            "price": "25.00",
            "stripe_payment_url": "https://buy.stripe.com/test_6oEaGrcwH8jYc80cMM",
            "number_of_classes_included_in_package": 1,
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            }
        },
        {
            "id": 30,
            "package_type": "5 Class Pass",
            "price": "100.00",
            "stripe_payment_url": "https://buy.stripe.com/test_fZedSD54f1VA9ZS6op",
            "number_of_classes_included_in_package": 5,
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            }
        },
        {
            "id": 31,
            "package_type": "10 Class Pass",
            "price": "190.00",
            "stripe_payment_url": "https://buy.stripe.com/test_28og0L40b43I4Fy6oq",
            "number_of_classes_included_in_package": 10,
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            }
        }
    ]]);
    const [student, setStudent]=useState ({
        "id": 19,
        "first_name": "TESTSTUDENT1",
        "last_name": "TESTSTUDENT1",
        "date_joined": "2023-05-01",
        "last_payment": "2023-01-02",
        "address": "Student Address",
        "phone_number": 3058675309,
        "email": "TESTSTUDENT1@TEST.COM",
        "classes_remaining": 10,
        "last_class_taken": "2023-05-02",
        "studio": {
            "id": 22,
            "studio_name": "TEST3 Studio",
            "first_name": "TEST3",
            "last_name": "TEST3",
            "address": "TEST3 Address",
            "phone_number": 3452134567,
            "email": "TEST3@TEST.COM"
        },
        "current_class_package": {
            "id": 30,
            "package_type": "5 Class Pass",
            "number_of_classes_included_in_package": "5",
            "price": "100.00",
            "stripe_payment_url": "https://buy.stripe.com/test_fZedSD54f1VA9ZS6op",
            "studio": {
                "id": 22,
                "studio_name": "TEST3 Studio",
                "first_name": "TEST3",
                "last_name": "TEST3",
                "address": "TEST3 Address",
                "phone_number": 3452134567,
                "email": "TEST3@TEST.COM"
            }
        }
    });
    
    useEffect(()=> {
            getStudents();
            getAllClassPackages();
    }, []);
    

    async function getStudents() {      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/student/`)
        const filteredStudent = response.data.filter(el=>(el.email.toLowerCase()===(user.email.toLowerCase())));
        const student = filteredStudent[0]
        setStudent(student);         
      } catch (error) {

      }
}

    async function getAllClassPackages() {
      const response = await axios.get(`http://127.0.0.1:8000/api/classpackage/`, {headers: {Authorization:"Bearer " + token}});
      setStudioPackages(response.data);
  }

    console.log(student)
    console.log(studioPackages)

    return student && ( 
        <div>
            {/* <div> 
              <CheckInButton student={student}  getStudents={getStudents} />
            </div> */}
            <div>
                <StudentInfoDisplay student={student} setStudent= {setStudent} getStudents={getStudents}/>
            </div> 
            <div>
              <ClassList student={student}  studioPackages={studioPackages} getStudents={getStudents} />
            </div> 
            <div>
                <Footer studio= {student.studio}/>
            </div>

        </div>
     );
}
 
export default StudentPage;