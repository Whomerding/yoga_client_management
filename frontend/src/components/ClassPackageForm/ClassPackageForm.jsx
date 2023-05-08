import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ClassPackageForm = ({studio, getAllClassPackages}) => {
    // const [classPackages, setClassPackages]=useState([]);
    const [user, token] = useAuth ();
    const [classData, setClassData] = useState([]);
    
    useEffect(()=>{setClassData({
        // package_type: "",
        // number_of_classes_included_in_package: "",
        // price: "",
        // stripe_payment_url: "",
        studio_id: studio?.id, 
    })},[studio])

    console.log ("studio:"+studio.id)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://127.0.0.1:8000/api/classpackage/`, classData, {headers: {Authorization:"Bearer " + token}})
            getAllClassPackages();
            setClassData ({
                package_type: "",
                price: "",
                number_of_classes_included_in_package: "",
                stripe_payment_url: "",
                studio_id: studio?.id,
            })
            // const newClass = response.data;
            // await new Promise((resolve)=>setTimeout(resolve, 0));
            // console.log (newClass)
            console.log ("Class Added!");
        }   catch (error) {
            console.log (error.response.data);
        }
    };

    const handleInputChange = (event) => {
        setClassData({ ...classData, [event.target.name]: event.target.value });
      };
    
    return ( 
        <div className='info-display' style={{marginBottom:"1rem"}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{width: "50%"}}> Package Type</label>
                    <input style={{width: "50%", marginBottom: "1.5REM"}} type='text' name='package_type' value={classData.package_type} onChange={handleInputChange}/>
                </div>
                <div>
                    <label style={{width: "50%"}} >Number of Classes Included in Package</label>
                    <input style={{width: "50%", marginBottom: "1.5rem"}} placeholder='  if unlimited type 0' type='text' name='number_of_classes_included_in_package' value={classData.number_of_classes_included_in_package} onChange={handleInputChange}/>
                </div>
                <div>
                    <label style={{width: "50%"}} >Stripe Payment URL</label>
                    <input style={{width: "50%", marginBottom: "1.5rem"}} type='url' name='stripe_payment_url' value={classData.stripe_payment_url} onChange={handleInputChange}/>
                </div>
                <div>
                    <label style={{width: "50%"}} >Price</label>
                    <input style={{width: "50%"}} type='text' name='price' value={classData.price} onChange={handleInputChange}/>
                </div>
                <div>
                    <button className='check-in-button' style={{color: 'darkgrey', borderColor:"darkgrey"}} type="submit">Submit</button>
                </div>
            </form>
        </div>
     );
};
export default ClassPackageForm;