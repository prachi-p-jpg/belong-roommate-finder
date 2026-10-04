import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-brand"><HomeIcon size={28}/> Belong</div>
          <p>Finding a home and a roommate should be easy, safe, and fun.</p>
        </div>
        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/preferences">Find roommates</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <Link to="/help">Help Center</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Belong. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
