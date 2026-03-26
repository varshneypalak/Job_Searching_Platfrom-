import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { JOB_CATEGORIES } from "../../constants";
import * as api from "../../api";
import { Input, Select, Button } from "../../ui";
import "./PostJob.css";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  const { isAuthorized, user } = useAuth();
  const navigateTo = useNavigate();

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      fixedSalary.length >= 4
        ? { title, description, category, country, city, location, fixedSalary }
        : { title, description, category, country, city, location, salaryFrom, salaryTo };
    try {
      const { data } = await api.postJob(payload);
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="post-job">
      <div className="post-inner">
        <h3>Post New Job</h3>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="post-row">
            <Input type="text" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Select value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Select Category" options={JOB_CATEGORIES} />
          </div>
          <div className="post-row">
            <Input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <Input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Select
            value={salaryType}
            onChange={(e) => setSalaryType(e.target.value)}
            options={[
              { value: "default", label: "Select Salary Type" },
              { value: "Fixed Salary", label: "Fixed Salary" },
              { value: "Ranged Salary", label: "Ranged Salary" },
            ]}
          />
          {salaryType === "default" && <p className="salary-note">Please provide Salary Type *</p>}
          {salaryType === "Fixed Salary" && (
            <Input type="number" placeholder="Enter Fixed Salary" value={fixedSalary} onChange={(e) => setFixedSalary(e.target.value)} />
          )}
          {salaryType === "Ranged Salary" && (
            <div className="post-row">
              <Input type="number" placeholder="Salary From" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} />
              <Input type="number" placeholder="Salary To" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} />
            </div>
          )}
          <textarea rows="8" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job Description" />
          <Button type="submit" block>Create Job</Button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
