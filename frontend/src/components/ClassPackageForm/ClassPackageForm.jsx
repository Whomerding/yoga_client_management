import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ClassPackageForm = ({studio, getAllClassPackages}) => {
    const [classPackages, setClassPackages]=useState([]);
    const [user, token] = useAuth ();
    const studio_id= parseInt(studio.id);
    const [classData, setClassData] = useState({
        package_type: "",
        number_of_classes_included_in_package: "",
        price: "",
        stripe_payment_url: "",
        studio_id: "22",
    });
    

    console.log (studio_id)
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(`http://127.0.0.1:8000/api/classpackage/`, classData, {headers: {Authorization:"Bearer " + token}})
            
            setClassData ({
                package_type: "",
                price: "",
                number_of_classes_included_in_package: "",
                stripe_payment_url: "",
                studio_id: "",
            })
            // const newClass = response.data;
            await new Promise((resolve)=>setTimeout(resolve, 0));
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Package Type</label>
                <input type='text' name='package_type' value={classData.package_type} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Number of Classes Included in Package..if unlimited type 'unlimited'</label>
                <input type='text' name='number_of_classes_included_in_package' value={classData.number_of_classes_included_in_package} onChange={handleInputChange}/>
            </div>
            <div>
                <label>Price</label>
                <input type='text' name='price' value={classData.price} onChange={handleInputChange}/>
            </div>
            {/* <div>
                <label>Stripe Payment URL</label>
                <input type='text' name='stripe_payment_url' value={classData.stripe_payment_url} onChange={handleInputChange}/>
            </div> */}
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
     );
};
export default ClassPackageForm;