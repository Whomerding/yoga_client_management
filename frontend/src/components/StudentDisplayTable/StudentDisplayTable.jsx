const StudentDisplayTable = (props) => {
    const { state } = useLocation();
    const [students, setStudents] = useState("");
    const [newStudents, setNewStudents] = useState("");

    useEffect(()=> {
        getAllStudents();
        }, []);
    
        async function getAllStudents(){
        const response = await axios.get(`http://127.0.0.1:8000/api/student?studio=${state.id}`)
        setStudents(response.data);
        console.log (students)
    }
    

    console.log("State inside of the Studio Owner Page", state)
    console.log(students)
    console.log(newStudents)
    
    
    return ( 

     );
}
 
export default StudentDisplayTable;