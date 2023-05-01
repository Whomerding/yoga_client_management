import React from 'react';

const StudentInfoDisplay = ({student}) => {

    return ( 
        <div>
            <h2>{student.first_name}'s Stats</h2>
            <p>Name: {student.first_name} {student.last_name}</p>
            <p>Phone Number: {student.phone_number}</p>
            <p>Email Address: {student.email}</p>
            <p>Studio: {student.studio.studio_name}</p>
            <p>Member since: {student.date_joined}</p>
            {student.current_class_package==null?
            <p>Current Class Package: You do not have an active class package at this time</p>: <p>Current Class Package: {student.current_class_package}</p>}
        </div>
     );
}
 
export default StudentInfoDisplay;