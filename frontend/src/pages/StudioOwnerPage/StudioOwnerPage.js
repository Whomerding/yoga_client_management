import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import StudioOwnerForm from '../../components/StudioOwnerForm/StudioOwnerForm';
import StudentDisplayTable from '../../components/StudentDisplayTable/StudentDisplayTable';
import SearchStudents from '../../components/SearchStudents/SearchStudents';
import ClassPackageForm from '../../components/ClassPackageForm/ClassPackageForm';
import ClassPackageTable from '../../components/ClassPackageTable/ClassPackageTable';
import StudioInfoDisplay from '../../components/StudioInfoDisplay/StudioInfoDisplay';
import InactiveStudentDisplay from '../../components/InactiveStudentDisplay/InactiveStudentDisplay';
import Footer from '../../components/Footer/Footer';
const StudioOwnerPage = () => {
    const [user, token] = useAuth ();
    const [studio, setStudio] = useState (    
      {
      "id": 20,
      "studio_name": "Test Studio 1",
      "first_name": "TEST1",
      "last_name": "TEST1",
      "address": "Test Address 1",
      "phone_number": 3348675309,
      "email": "TEST1@test.com"
  }
  ); 
    const [studioPackages, setStudioPackages]=useState([
      {
          "id": 28,
          "package_type": "sdlfhaisudhf",
          "price": "40.00",
          "stripe_payment_url": null,
          "number_of_classes_included_in_package": "Unlimited",
          "studio": {
              "id": 20,
              "studio_name": "Test Studio 1",
              "first_name": "TEST1",
              "last_name": "TEST1",
              "address": "Test Address 1",
              "phone_number": 3348675309,
              "email": "TEST1@test.com"
          }
      },
      {
          "id": 29,
          "package_type": "drop in class",
          "price": "25.00",
          "stripe_payment_url": "https://buy.stripe.com/test_6oEaGrcwH8jYc80cMM",
          "number_of_classes_included_in_package": "1",
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
          "number_of_classes_included_in_package": "5",
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
          "number_of_classes_included_in_package": "10",
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
          "id": 33,
          "package_type": "Unlimited",
          "price": "275.00",
          "stripe_payment_url": "https://buy.stripe.com/test_9AQ4i3fITcAe5JC3cf",
          "number_of_classes_included_in_package": "unlimited",
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
  ]);
    // const navigate = useNavigate(); 
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


  


    return ( 
        <div className='container-fluid'>
          <div className="row">
            <div class="col">
              <h2>Studio Info</h2>
              <div>
                <StudioInfoDisplay studio={studio}/>
              </div>
              <div>
                <h2>Class Packages</h2>
                <ClassPackageForm studio={studio} getAllClassPackages={getAllClassPackages} />
              </div>
              <div>
                <ClassPackageTable studio={studio} studioPackages={studioPackages} getAllClassPackages={getAllClassPackages}/>
              </div>
            </div>
            <div class='col'>
              <div>
                <h2>Students</h2>
                <StudentDisplayTable studio={studio} />
              </div>
              <div>
                <h2>Inactive Students</h2>
                <InactiveStudentDisplay studio={studio} />
              </div>
            </div>
          </div>
          <div>
            <Footer studio={studio}/>
          </div>
        </div>

     );
}
 
export default StudioOwnerPage;