import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return  (
    <div className="navBar" style={{paddingBottom: "3px", paddingTop: "3px"}}>
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: '#707070' }}>
            <b>Studio <span>Manager</span></b>
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
