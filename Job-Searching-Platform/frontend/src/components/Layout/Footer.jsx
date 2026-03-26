import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTelegram, FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import "./Footer.css";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) return null;

  return (
    <footer className="footer">
      <div className="footer-copy">&copy; 2024 All Rights Reserved By Code With Hemkumar.</div>
      <div className="footer-links">
        <Link to="https://www.linkedin.com/in/hem-kumar-07b846248/" target="_blank"><FaLinkedin /></Link>
        <Link to="https://github.com/hemkumar19" target="_blank"><FaGithub /></Link>
        <Link to="https://t.me/hemkumar99" target="_blank"><FaTelegram /></Link>
        <Link to="https://www.instagram.com/hemkumar_9r_/" target="_blank"><RiInstagramFill /></Link>
        <Link to="https://www.facebook.com/profile.php?id=100044598192309" target="_blank"><FaFacebookF /></Link>
      </div>
    </footer>
  );
};

export default Footer;
