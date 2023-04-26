import React from "react";
import { useLocation } from "react-router-dom";


const StudioOwnerPage = () => {
    const { state } = useLocation();
    console.log("State inside of the Studio Owner Page", state)
    return ( 
        <div>

        </div>
     );
}
 
export default StudioOwnerPage;