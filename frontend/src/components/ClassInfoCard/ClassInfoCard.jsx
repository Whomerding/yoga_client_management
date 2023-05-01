const ClassInfoCard = ({singlePackage}) => {
    
    return ( 
        <div>
            <p>{singlePackage.package_type}</p>
            <p>{singlePackage.price}</p>
        </div>
     );
}
 
export default ClassInfoCard;