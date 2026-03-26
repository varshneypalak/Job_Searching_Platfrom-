import React from "react";
import { HERO_STATS } from "../../constants";
import "./HeroSection.css";

const HeroSection = () => (
  <div className="hero">
    <div className="hero-inner">
      <div className="hero-text">
        <h1>
          Find a Job That <span>Suits Your Skills</span>
        </h1>
        <p>
          A dedicated job portal providing real-time Government, Public and
          Private sector job openings across India. Create your profile and
          apply to multiple jobs with a single click.
        </p>
      </div>
      <div className="hero-image">
        <img src="/heroS.png" alt="hero" />
      </div>
    </div>
    <div className="hero-stats">
      {HERO_STATS.map(({ id, title, subTitle, icon: Icon }) => (
        <div className="hero-stat-card" key={id}>
          <div className="stat-icon"><Icon /></div>
          <div className="stat-info">
            <p>{title}</p>
            <p>{subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HeroSection;
