import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import * as api from "../../api";
import { Input, Button } from "../../ui";
import "./Application.css";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useAuth();
  const navigateTo = useNavigate();
  const { id } = useParams();

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    try {
      const { data } = await api.postApplication(formData);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="application-page">
      <div className="app-inner">
        <h3>Application Form</h3>
        <form className="app-form" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="number" placeholder="Your Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <Input type="text" placeholder="Your Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          <textarea placeholder="Cover Letter..." value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
          <div>
            <label className="app-file-label">Select Resume</label>
            <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => setResume(e.target.files[0])} />
          </div>
          <Button type="submit" block>Send Application</Button>
        </form>
      </div>
    </section>
  );
};

export default Application;
