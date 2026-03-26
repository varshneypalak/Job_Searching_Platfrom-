import React, { useState } from "react";
import { FaRegUser, FaPencilAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPhoneFlip } from "react-icons/fa6";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Input, Select, Button } from "../../ui";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { isAuthorized, register } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({ name, phone, email, role, password });
      setName(""); setEmail(""); setPassword(""); setPhone(""); setRole("");
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
          <h3>Create a new account</h3>
        </div>
        <form className="auth-form" onSubmit={handleRegister}>
          <Select
            label="Register As"
            icon={FaRegUser}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Select Role"
            options={["Employer", "Job Seeker"]}
          />
          <Input label="Name" icon={FaPencilAlt} type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" icon={MdOutlineMailOutline} type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Phone" icon={FaPhoneFlip} type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input label="Password" icon={RiLock2Fill} type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" block>Register</Button>
          <Link to="/login" className="auth-link">Login Now</Link>
        </form>
      </div>
    </section>
  );
};

export default Register;
