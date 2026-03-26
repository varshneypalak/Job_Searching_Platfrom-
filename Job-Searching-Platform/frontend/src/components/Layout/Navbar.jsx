import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSun, FiMoon } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  if (!isAuthorized) return null;

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          Job<span>.Com</span>
        </Link>
        <ul className={`nav-menu ${show ? "open" : ""}`}>
          <li><Link to="/" onClick={() => setShow(false)}>Home</Link></li>
          <li><Link to="/job/getall" onClick={() => setShow(false)}>All Jobs</Link></li>
          <li>
            <Link to="/applications/me" onClick={() => setShow(false)}>
              {user?.role === "Employer" ? "Applicants" : "My Applications"}
            </Link>
          </li>
          {user?.role === "Employer" && (
            <>
              <li><Link to="/job/post" onClick={() => setShow(false)}>Post Job</Link></li>
              <li><Link to="/job/me" onClick={() => setShow(false)}>My Jobs</Link></li>
            </>
          )}
          <li>
            <button className="nav-theme-toggle" onClick={toggleTheme} title="Toggle theme">
              {theme === "light" ? <FiMoon /> : <FiSun />}
            </button>
          </li>
          <li>
            <button className="nav-logout" onClick={logout}>Logout</button>
          </li>
        </ul>
        <div className="nav-hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
