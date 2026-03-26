import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => (
  <section className="notfound">
    <div className="nf-content">
      <img src="/notfound.png" alt="notfound" />
      <Link to="/">Return to Home</Link>
    </div>
  </section>
);

export default NotFound;
