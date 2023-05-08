
import React, { useState, useEffect } from 'react';


const StudioInfoDisplay = ({studio}) => {
   


    return ( 
        <div className='info-display'>
            <h2 style={{color: "darkgray"}}>{studio?.studio_name}</h2>
            <p>Name: {studio?.first_name} {studio?.last_name}</p>
            <p>Address: {studio?.address}</p>
            <p>Phone Number: {studio?.phone_number}</p>
            <p>Email Address: {studio?.email}</p>
        </div>
     );
}
 
export default StudioInfoDisplay;