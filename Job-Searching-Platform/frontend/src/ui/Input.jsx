import React from "react";
import "./Input.css";

const Input = ({ icon: Icon, label, className = "", ...props }) => (
  <div className={`ui-input-group ${className}`}>
    {label && <label className="ui-input-label">{label}</label>}
    <div className="ui-input-wrapper">
      <input className="ui-input" {...props} />
      {Icon && <span className="ui-input-icon"><Icon /></span>}
    </div>
  </div>
);

export default Input;
