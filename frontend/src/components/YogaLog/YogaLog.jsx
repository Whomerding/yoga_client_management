import React, { useState, useEffect } from 'react';

const YogaLog = ({studentClassTakenInfo}) => {
    

    return ( 
        <ul style={{flexDirection: 'column'}}>
            {studentClassTakenInfo.slice(0).reverse().map((el)=> (
            <li key={el.id}>{el.classes_taken}</li>))}
        </ul>    
     );
}
 
export default YogaLog;