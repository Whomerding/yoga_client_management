import React, { useState, useEffect } from 'react';
import { format } from 'date-fns'
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const ClassInfoCard = ({singlePackage, student}) => {
    const [user, token]=useAuth()
    var today = format(new Date(), 'yyyy-MM-dd');
    const student_id=student?.id
    
    const [lastPayment, setLastPayment]=useState({
        last_payment: today
    })

    // useEffect(()=>{
    //     setLastPayment({last_payment:today})
    // },[student, singlePackage])

    const handleClick = async (event)=> {
        try {
            await axios.patch(`http://127.0.0.1:8000/api/student/update/${student_id}/`, lastPayment, {headers: {Authorization:"Bearer " + token}});
            console.log("Payment Initiated with onClick Event!")
        } catch (error) {
            console.log(error)
        } 
    }
    console.log (student.last_payment)
    return ( 
        <div>
            <a href = {singlePackage.stripe_payment_url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
                <p>{singlePackage.package_type}</p>
                <p>{singlePackage.price}</p>
            </a>
        </div>
     );
}
 
export default ClassInfoCard;