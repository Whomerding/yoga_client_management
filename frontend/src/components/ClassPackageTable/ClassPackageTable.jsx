import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const ClassPackageTable = ({studioPackages, getAllClassPackages, studio}) => {

    const [user, token]= useAuth();
    // const studio_id=studio.id

    // console.log("studio_id:"+studio_id)

    // useEffect(()=> {
    //     const storedData = localStorage.getItem("class_packages");
    //     if (storedData) {
    //       setStudioPackages(JSON.parse(storedData));
    //     } else {
    //       getAllClassPackages();
    //     }
    //   }, []);
    


    const deleteStudioPackage = async(id) => {
        await axios.delete(`http://127.0.0.1:8000/api/classpackage/${id}/`, {headers: {Authorization:"Bearer " + token}}).then(()=> getAllClassPackages())
    }

    
    console.log(`studio.id: ${studio.id}`)   
    return ( 
 
        <table class="table table-dark">
        <thead>
            <tr>
                <th>Package Type</th>
                <th>Number of Classes Included</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
        {studioPackages
        .filter(el => el.studio.id === studio.id)
        .map((el)=>(       
            <tr key={el.id}>
                <td>{el.package_type}</td>
                <td>{el.number_of_classes_included_in_package}</td>
                <td>{el.price}</td>  
                <td><button onClick= {()=> deleteStudioPackage(el.id)}>Delete</button></td>  
                {console.log(el.studio.id)}  
            </tr> 
            ))}
        </tbody>
    </table>
     );
    }

export default ClassPackageTable;