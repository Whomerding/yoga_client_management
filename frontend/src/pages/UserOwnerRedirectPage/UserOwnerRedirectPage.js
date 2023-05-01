import useAuth from "../../hooks/useAuth";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function UserOwnerRedirectPage() {
    const [user, token] = useAuth ();
    const navigate = useNavigate();

    
    useEffect(()=> {

        Redirect()
      }, []);
    

    function Redirect() { 
  
        {user.is_owner===true? navigate("/owner"): navigate("/student")};      
    }
    return ( 
        <div>
            REDIRECT PAGE
            <h1>{user.id}</h1>
        </div>
     );
}

export default UserOwnerRedirectPage;
