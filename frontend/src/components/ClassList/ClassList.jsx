import ClassInfoCard from "../ClassInfoCard/ClassInfoCard";
import React from 'react';


const ClassList = ({student, studioPackages, getStudents}) => {

    return student && studioPackages && ( 
        <div
        
        >
            <div 
            className='row'
             style={{margin: "2REM"}}>
                {studioPackages.filter(el=>el.studio?.id === student.studio?.id).map((el)=> (<ClassInfoCard singlePackage={el} student={student} getStudents={getStudents}/>))}
            </div>
        </div>
     );
}
 
export default ClassList;
