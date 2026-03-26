import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useJobDetail } from "../../hooks/useJobs";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useAuth();
  const { job, error } = useJobDetail(id);

  if (!isAuthorized) { navigateTo("/login"); return null; }
  if (error) { navigateTo("/notfound"); return null; }

  const rows = [
    ["Title", job.title],
    ["Category", job.category],
    ["Country", job.country],
    ["City", job.city],
    ["Location", job.location],
    ["Description", job.description],
    ["Posted On", job.jobPostedOn],
    ["Salary", job.fixedSalary ? job.fixedSalary : `${job.salaryFrom} - ${job.salaryTo}`],
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
