import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./CTABanner.css";

const CTABanner = () => {
  const { user } = useAuth();

  return (
    <section className="cta-banner">
      <div className="cta-glow" />
      <div className="cta-inner">
        <h2>
          {user?.role === "Employer"
            ? "Find Your Next Star Employee"
            : "Ready to Land Your Dream Job?"}
        </h2>
        <p>
          {user?.role === "Employer"
            ? "Post jobs, review applications, and hire top talent — all in one place."
            : "Thousands of companies are hiring right now. Don't miss out."}
        </p>
        <Link
          to={user?.role === "Employer" ? "/job/post" : "/job/getall"}
          className="cta-btn"
        >
          {user?.role === "Employer" ? "Post a Job Now" : "Explore Jobs"}
        </Link>
      </div>
    </section>
  );
};

export default CTABanner;
