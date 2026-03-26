import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useJobDetail } from "../../hooks/useJobs";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const { isAuthorized, user } = useAuth();
  const { job, loading, error } = useJobDetail(id);

  if (!isAuthorized) return <Navigate to="/login" />;
  if (error) return <Navigate to="/notfound" />;

  if (loading) {
    return (
      <section className="job-detail">
        <div className="detail-loading">
          <div className="spinner" />
          <p>Loading job details...</p>
        </div>
      </section>
    );
  }

  const rows = [
    ["Title", job.title],
    ["Category", job.category],
    ["Country", job.country],
    ["City", job.city],
    ["Location", job.location],
    ["Description", job.description],
    ["Posted On", job.jobPostedOn ? new Date(job.jobPostedOn).toLocaleDateString() : ""],
    ["Salary", job.fixedSalary ? `₹${job.fixedSalary.toLocaleString()}` : `₹${job.salaryFrom?.toLocaleString()} - ₹${job.salaryTo?.toLocaleString()}`],
  ];

  return (
    <section className="job-detail">
      <div className="detail-inner">
        <div className="detail-card">
          <h3>Job Details</h3>
          {rows.map(([label, value]) => (
            <div className="detail-row" key={label}>
              <span className="detail-label">{label}:</span>
              <span className="detail-value">{value}</span>
            </div>
          ))}
          {user?.role !== "Employer" && (
            <Link to={`/application/${job._id}`} className="detail-apply">Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
