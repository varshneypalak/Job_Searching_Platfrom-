import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { SectionTitle } from "../../ui";
import "./HowItWorks.css";

const steps = [
  { icon: FaUserPlus, title: "Create Account", desc: "Simply create your profile and start applying to different jobs with a single click.", dark: false },
  { icon: MdFindInPage, title: "Find or Post a Job", desc: "Browse real-time job openings across Public and Private sectors or post your own.", dark: true },
  { icon: IoMdSend, title: "Apply or Recruit", desc: "Apply for jobs or recruit suitable candidates through our streamlined platform.", dark: false },
];

const HowItWorks = () => (
  <div className="howitworks">
    <div className="hiw-inner">
      <SectionTitle sub="Simple steps to get started">How It Works</SectionTitle>
      <div className="hiw-cards">
        {steps.map(({ icon: Icon, title, desc, dark }, i) => (
          <div className={`hiw-card ui-card ui-card--${dark ? "dark" : "default"} ${dark ? "hiw-card--dark" : ""}`} key={i}>
            <div className="hiw-icon"><Icon /></div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default HowItWorks;
