import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { JOB_CATEGORIES } from "../../constants";
import { SectionTitle } from "../../ui";
import "./Jobs.css";

const Jobs = () => {
  const { isAuthorized } = useAuth();
  const { jobs, loading } = useJobs();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  if (!isAuthorized) return <Navigate to="/" />;

  const filtered = jobs.filter((job) => {
    const matchSearch =
      !search ||
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.country?.toLowerCase().includes(search.toLowerCase()) ||
      job.city?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !category || job.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <section className="jobs-page">
      <div className="jobs-inner">
        <SectionTitle sub="Browse and apply to the latest openings">All Available Jobs</SectionTitle>

        <div className="jobs-filters">
          <div className="jobs-search">
            <FiSearch className="jobs-search-icon" />
            <input
              type="text"
              placeholder="Search by title, city or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="jobs-category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {JOB_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="jobs-loading">
            <div className="spinner" />
            <p>Loading jobs...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="jobs-empty">
            <p className="jobs-empty-icon">📭</p>
            <h3>No Jobs Found</h3>
            <p>{search || category ? "Try adjusting your search or filter." : "No jobs have been posted yet."}</p>
          </div>
        ) : (
          <>
            <p className="jobs-count">{filtered.length} job{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="jobs-grid">
              {filtered.map((job) => (
                <div className="job-card" key={job._id}>
                  <p className="job-title">{job.title}</p>
                  <p className="job-category">{job.category}</p>
                  <p className="job-country">{job.country}{job.city ? `, ${job.city}` : ""}</p>
                  {job.fixedSalary ? (
                    <p className="job-salary">₹{job.fixedSalary.toLocaleString()}</p>
                  ) : job.salaryFrom && job.salaryTo ? (
                    <p className="job-salary">₹{job.salaryFrom.toLocaleString()} - ₹{job.salaryTo.toLocaleString()}</p>
                  ) : null}
                  <Link to={`/job/${job._id}`} className="job-link">View Details</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Jobs;
