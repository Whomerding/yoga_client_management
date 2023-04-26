// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import StudioRegisterPage from './pages/StudioRegisterPage/StudioRegisterPage';
import StudentRegisterPage from './pages/StudentRegisterPage/StudentRegisterPage';
import StudioOwnerPage from './pages/StudioOwnerPage/StudioOwnerPage';
import UserOwnerRedirectPage from "./pages/UserOwnerRedirectPage/UserOwnerRedirectPage";
// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  
  return (
    <div>
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
        <Route path = "/registerstudio" element={<PrivateRoute><StudioRegisterPage /></PrivateRoute>}/>
        <Route path = "/registerstudent" element={<PrivateRoute><StudentRegisterPage /></PrivateRoute>}/>
        <Route path = "/owner" element={<PrivateRoute><StudioOwnerPage /></PrivateRoute>}/>
        <Route path = "/userownerredirectpage" element={<PrivateRoute><UserOwnerRedirectPage /></PrivateRoute>}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
