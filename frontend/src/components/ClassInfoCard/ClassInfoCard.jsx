import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ClassInfoCard = ({singlePackage, student, getStudents}) => {
    const [user, token]=useAuth()
    var today = format(new Date(), 'yyyy-MM-dd');
    const student_id=student?.id
    const [studentUpdate, setStudentUpdate]=useState()

    useEffect(()=>{setStudentUpdate({
        last_payment: today,
        current_class_package_id: singlePackage.id,
        classes_remaining: student.classes_remaining + singlePackage.number_of_classes_included_in_package
    })},[student])
    
    const handleClick = async (event)=> {   
        // event.preventDefault()
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
        <div key= {singlePackage.id} className="individual-class-card">
            <a href = {singlePackage.stripe_payment_url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                <p>{singlePackage.package_type}</p>
                <p>{singlePackage.price}</p>
            </a>
        </div>
     );
}
 
export default ClassInfoCard;