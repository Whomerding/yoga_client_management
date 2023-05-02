import ClassInfoCard from "../ClassInfoCard/ClassInfoCard";
import React from 'react';


const ClassList = ({student, studioPackages}) => {

    return student && studioPackages && ( 
        <div>
            <div>
                {studioPackages.filter(el=>el.studio?.id === student.studio?.id).map((el)=> (<ClassInfoCard singlePackage={el} student={student}/>))}
            </div>
        </div>
     );
}
 
export default ClassList;
