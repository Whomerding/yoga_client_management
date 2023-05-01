import ClassInfoCard from "../ClassInfoCard/ClassInfoCard";
import React from 'react';


const ClassList = ({student, studioPackages}) => {

    return ( 
        <div>
            <div>
                {studioPackages.filter(el=>el.studio.id === student.studio.id).map((el)=> (<ClassInfoCard singlePackage={el}/>))}
            </div>
        </div>
     );
}
 
export default ClassList;