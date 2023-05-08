import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import image0 from '../Images/anton-mislawsky-7K4t5352YOY-unsplash.jpg';
import image1 from '../Images/erik-brolin-wmZNEGkcsmw-unsplash.jpg';
import image2 from '../Images/luna-active-fitness-eWCKh0RKqxI-unsplash (1).jpg';
import image3 from '../Images/mor-shani-5f6VXsk25OQ-unsplash.jpg';
import image4 from '../Images/outsidethccn-dsgn-YDaGY4bl2aE-unsplash.jpg';
import image5 from '../Images/tabitha-turner-qtr0Lw4fMGc-unsplash.jpg';
import image6 from '../Images/wesley-tingey--nZynZmR3Ls-unsplash.jpg';
import image7 from '../Images/yannic-laderach-Dqx4XWuXu7w-unsplash.jpg';

const ClassInfoCard = ({singlePackage, student, getStudents}) => {
    const [user, token]=useAuth()
    var today = format(new Date(), 'yyyy-MM-dd');
    const student_id=student?.id
    const [studentUpdate, setStudentUpdate]=useState()
    const [index, setIndex] = useState(0)
    const images = [image0, image1, image2, image3, image4, image5, image6, image7 ]

    useEffect(()=>{setStudentUpdate({
        last_payment: today,
        current_class_package_id: singlePackage.id,
        classes_remaining: student.classes_remaining + singlePackage.number_of_classes_included_in_package
    })},[student])
    
    
  
    function getRandomImage () {
        // const nextIndex = (currentIndex+1) % images.length;
        // setCurrentIndex(nextIndex);
        // return images[nextIndex];

        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };
    
    
  
    function getRandomImage () {
    
        // setIndex((index+1) % images.length);
        // return images[index];
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    };
   console.log (student)
    const handleClick = async (event)=> {   
        console.log(studentUpdate)
        console.log ("classes remaining: "+ student.classes_remaining)
        console.log (typeof singlePackage.number_of_classes_included_in_package, singlePackage.number_of_classes_included_in_package)
        try {
            let result = await axios.patch(`http://127.0.0.1:8000/api/student/update/${student_id}/`, studentUpdate, {headers: {Authorization:"Bearer " + token}});
        
            getStudents()
            console.log("student info updated")
        } catch (error) {
            console.log(error)
        } 
    }



   
    return ( 
        <div key= {singlePackage.id} 
        className="col"
        style={{alignContent: "center"}} 
        >
            <div className="card" style={{textAlign:"center", backgroundColor: "#FFFFFF", opacity: "95%%", borderRadius: ".5REM", margin: ".5rem", padding: "1rem", maxWidth:"15rem"}}>
                <a href = {singlePackage.stripe_payment_url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                    <p style={{fontSize: "1.75rem", paddingTop: ".5rem"}}>${singlePackage.price}</p>
                    <p style={{fontSize: "1.5rem", paddingBottom: "1rem"}}>{singlePackage.package_type}</p>
                    <img style={{height: "17REM", width: "10REM"}} src= {getRandomImage()} alt={"yoga picture"} />
                </a>
            </div>
        </div>
     );
}
 
export default ClassInfoCard;