import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Input, Select, Button } from "../../ui";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, login } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password, role });
      setEmail(""); setPassword(""); setRole("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) return <Navigate to="/" />;

  return (
    <section className="auth-page">
      <button className="auth-theme-toggle" onClick={toggleTheme} title="Toggle theme">
        {theme === "light" ? <FiMoon /> : <FiSun />}
      </button>
      <div className="auth-form-side">
        <div className="auth-header">
          <h3>Login to your account</h3>
        </div>
        <form className="auth-form" onSubmit={handleLogin}>
          <Select
            label="Login As"
            icon={FaRegUser}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Select Role"
            options={["Employer", "Job Seeker"]}
          />
          <Input
            label="Email Address"
            icon={MdOutlineMailOutline}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            icon={RiLock2Fill}
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" block>Login</Button>
          <Link to="/register" className="auth-link">Register Now</Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
