import React from 'react';

export default function SearchStudents({setSearchTerm, searchTerm}){

    return ( 
        <div>
            <form> 
            <input placeholder = "Search Students" type="text" value = {searchTerm} onChange= {event=> setSearchTerm(event.target.value)}/>
            </form>
        </div>
     );
}