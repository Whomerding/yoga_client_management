import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return {
     username: user.username,
    id: user.user_id,
    first_name: user.first_name,
    last_name:user.last_name,
    is_owner: user.is_owner,
    email: user.email,
    studio_id: user.studio_id,
    student_id: user.student_id
  };
}

export const AuthProvider = ({ children }) => {
  const BASE_URL = "http://127.0.0.1:8000/api/auth";
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        username: registerData.username,
                password: registerData.password,
                email: registerData.email,
                first_name: registerData.firstName,
                last_name: registerData.lastName,
                is_owner: registerData.isOwner,
      };
      let response = await axios.post(`${BASE_URL}/register/`, finalData);
      if (response.status === 201) {
        console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate("/login");
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const loginUser = async (loginData) => {
    try {
      let response = await axios.post(`${BASE_URL}/login/`, loginData);
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem("token")));
        let loggedInUser = jwtDecode(response.data.access);
        setUser(setUserObject(loggedInUser));
        setIsServerError(false);
        await new Promise((resolve)=>setTimeout(resolve, 0));
        console.log(user)
        const yogi = response.data
        console.log(yogi)
        navigate("/userownerredirect");
        console.log (user)
      } else {
        navigate("/register");
      }
    } catch (error) {
      console.log(error.response.data);
      setIsServerError(true);
      console.log(user)
      navigate("/register");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};



// import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext();

// export default AuthContext;

// function setUserObject(user) {
//   if (!user) {
//     return null;
//   }
//   return {
//     username: user.username,
//     id: user.user_id,
//     first_name: user.first_name,
//     last_name:user.last_name,
//     is_owner: user.is_owner,
//     email: user.email,
//   };
// }

// export const AuthProvider = ({ children }) => {
//   const BASE_URL = "http://127.0.0.1:8000/api/auth";
//   const userToken = JSON.parse(localStorage.getItem("token"));
//   const decodedUser = userToken ? jwtDecode(userToken) : null;
//   const [token, setToken] = useState(userToken);
//   const [user, setUser] = useState(setUserObject(decodedUser));
//   const [isServerError, setIsServerError] = useState(false);
//   const navigate = useNavigate();

//   const registerUser = async (registerData) => {
//     try {
//       let finalData = {
//         username: registerData.username,
//         password: registerData.password,
//         email: registerData.email,
//         first_name: registerData.firstName,
//         last_name: registerData.lastName,
//         is_owner: registerData.isOwner,
//       };
      
//   //     let response = await axios.post(`${BASE_URL}/register/`, finalData);
//   //     if (response.status === 201) {
//   //       console.log("Successful registration! Log in to access token");
//   //       setIsServerError(false);
//   //       const newUser = response.data;
//   //       await new Promise((resolve)=>setTimeout(resolve, 0));
//   //       console.log (newUser)
//   //       navigate("/login", {state: newUser});
//   //     } else {
//   //       navigate("/register");
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
//   let response = await axios.post(`${BASE_URL}/register/`, finalData);
//       if (response.status === 201) {
//         console.log("Successful registration! Log in to access token");
//         setIsServerError(false);
//         navigate("/login");
//       } else {
//         navigate("/register");
//       }
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   const loginUser = async (loginData) => {
//   //   try {
//   //     let response = await axios.post(`${BASE_URL}/login/`, loginData);
//   //     if (response.status === 200) {
//   //       localStorage.setItem("token", JSON.stringify(response.data.access));
//   //       setToken(JSON.parse(localStorage.getItem("token")));
//   //       //loggedInUser will have the "isOwner" data
//   //       let loggedInUser = jwtDecode(response.data.access);
//   //       setUser(setUserObject(loggedInUser));
//   //       setIsServerError(false);
//   //       console.log (`user: ${user}`)
//   //       const yogi = response.data;
//   //       console.log(user)
//   //       await new Promise((resolve)=>setTimeout(resolve, 0));
//   //       // console.log (`newUser: ${newUser}`)
//   //       console.log (`user: ${user}`)
//   //       {user.is_owner? navigate("/owner"):navigate("/student")};
//   //     } else {
//   //       navigate("/register");
//   //     }
//   //   } catch (error) {
//   //     console.log(error.response.data);
//   //     setIsServerError(true);
//   //     navigate("/register");
//   //   }
//   // };
//   try {
//     let response = await axios.post(`${BASE_URL}/login/`, loginData);
//     if (response.status === 200) {
//       localStorage.setItem("token", JSON.stringify(response.data.access));
//       setToken(JSON.parse(localStorage.getItem("token")));
//       //loggedInUser will have the "isOwner" data
//       let loggedInUser = jwtDecode(response.data.access);
//       setUser(setUserObject(loggedInUser));
//       setIsServerError(false);
//       navigate("/registerstudio");
//     } else {
//       navigate("/register");
//     }
//   } catch (error) {
//     console.log(error.response.data);
//     setIsServerError(true);
//     navigate("/register");
//   }
// };

//   const logoutUser = () => {
//     if (user) {
//       localStorage.removeItem("token");
//       setUser(null);
//       setToken(null);
//       navigate("/");
//     }
//   };

//   const contextData = {
//     user,
//     token,
//     loginUser,
//     logoutUser,
//     registerUser,
//     isServerError,
//   };

//   return (
//     <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
//   );
// };
