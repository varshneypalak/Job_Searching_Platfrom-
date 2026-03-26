import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useJobs } from "../../hooks/useJobs";
import { SectionTitle } from "../../ui";
import "./Jobs.css";

const Jobs = () => {
  const { isAuthorized } = useAuth();
  const { jobs } = useJobs();
  const navigateTo = useNavigate();

  if (!isAuthorized) { navigateTo("/"); return null; }

  return (
    <section className="jobs-page">
      <div className="jobs-inner">
        <SectionTitle sub="Browse and apply to the latest openings">All Available Jobs</SectionTitle>
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <p className="job-title">{job.title}</p>
              <p className="job-category">{job.category}</p>
              <p className="job-country">{job.country}</p>
              <Link to={`/job/${job._id}`} className="job-link">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
