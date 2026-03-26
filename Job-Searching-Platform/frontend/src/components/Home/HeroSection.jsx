import React from "react";
import { Link } from "react-router-dom";
import { FaSuitcase, FaBuilding, FaUsers, FaUserPlus, FaMicrosoft, FaGoogle, FaApple, FaAmazon } from "react-icons/fa";
import { SiInfosys, SiWipro } from "react-icons/si";
import { useAuth } from "../../hooks/useAuth";
import "./HeroSection.css";

const stats = [
  { icon: FaSuitcase, value: "1,23,441", label: "Live Jobs" },
  { icon: FaBuilding, value: "91,220", label: "Companies" },
  { icon: FaUsers, value: "2,34,200", label: "Job Seekers" },
  { icon: FaUserPlus, value: "1,03,761", label: "Employers" },
];

const trusted = [
  { icon: FaMicrosoft, name: "Microsoft" },
  { icon: FaGoogle, name: "Google" },
  { icon: FaApple, name: "Apple" },
  { icon: FaAmazon, name: "Amazon" },
  { icon: SiInfosys, name: "Infosys" },
  { icon: SiWipro, name: "Wipro" },
];

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="hero">
      <div className="hero-bg-glow hero-glow-1" />
      <div className="hero-bg-glow hero-glow-2" />

      <div className="hero-content">
        <p className="hero-badge">🚀 India's Fastest Growing Job Portal</p>
        <h1>
          Your Next <span className="hero-gradient">Career Move</span> Starts Here
        </h1>
        <p className="hero-sub">
          Whether you're looking for your dream job or the perfect candidate — 
          we connect talent with opportunity across India.
        </p>
        <div className="hero-ctas">
          <Link to="/job/getall" className="hero-btn hero-btn--primary">
            Browse Jobs
          </Link>
          {user?.role === "Employer" ? (
            <Link to="/job/post" className="hero-btn hero-btn--outline">
              Post a Job
            </Link>
          ) : (
            <Link to="/applications/me" className="hero-btn hero-btn--outline">
              My Applications
            </Link>
          )}
        </div>
      </div>

      <div className="hero-stats">
        {stats.map(({ icon: Icon, value, label }, i) => (
          <div className="hero-stat" key={i}>
            <div className="hero-stat-icon"><Icon /></div>
            <div>
              <p className="hero-stat-value">{value}</p>
              <p className="hero-stat-label">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-trust">
        <p>Trusted by professionals at</p>
        <div className="hero-trust-logos">
          {trusted.map(({ icon: Icon, name }, i) => (
            <div className="hero-trust-item" key={i}>
              <Icon /> <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
