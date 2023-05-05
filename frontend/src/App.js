// General Imports
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import StudioRegisterPage from './pages/StudioRegisterPage/StudioRegisterPage';
import StudentRegisterPage from './pages/StudentRegisterPage/StudentRegisterPage';
import StudioOwnerPage from './pages/StudioOwnerPage/StudioOwnerPage';
import UserOwnerRedirectPage from "./pages/UserOwnerRedirectPage/UserOwnerRedirectPage";
import StudentPage from "./pages/StudentPage/StudentPage";
// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

// Images
import image from "./Images/lotusflower_jay_castor_on_unsplash.jpg"

function App() {
  
  return (
    <div style={{backgroundImage: `url(${image})`,  backgroundSize: "cover", backgroundAttachment: "fixed"}}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path = "/registerstudio" element={<StudioRegisterPage />}/>
        <Route path = "/registerstudent" element={<StudentRegisterPage />}/>
        <Route path = "/owner" element={<PrivateRoute><StudioOwnerPage /></PrivateRoute>}/>
        <Route path = "/student" element={<PrivateRoute><StudentPage /></PrivateRoute>}/>
        <Route path = "/userownerredirect" element={<PrivateRoute><UserOwnerRedirectPage /></PrivateRoute>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
