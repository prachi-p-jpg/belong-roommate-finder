import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    confirmPassword: "",
    agree: false
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      const response = await fetch("https://belong-roommate-finder.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      });
      const data = await response.json();
      if (response.ok) {
        alert("Account created successfully! Please log in.");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during registration");
    }
  };

  return (
    <Layout>
      <div className="auth-page">
        <div className="auth-box">
          <div className="auth-title">
            <h1>Create your Belong account</h1>
            <p>Find a place where you belong.</p>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>

            
            <div className="auth-group">
              <label>Full Name</label>
              <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            
            <div className="auth-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="auth-group">
              <label>Phone</label>
              <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="auth-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Create a password" value={formData.password} onChange={handleChange} required minLength="6" />
            </div>
            
            <div className="auth-group">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required minLength="6" />
            </div>
            
            <label className="auth-check" style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "10px" }}>
              <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} required style={{ cursor: "pointer", width: "16px", height: "16px", accentColor: "var(--purple)" }} />
              <span style={{ fontSize: "13px", color: "var(--muted)" }}>
                I agree to the <Link to="/terms" style={{ color: "var(--purple)", fontWeight: "600" }}>Terms</Link> and <Link to="/privacy" style={{ color: "var(--purple)", fontWeight: "600" }}>Privacy Policy</Link>
              </span>
            </label>
            
            <button type="submit" className="primary wide" style={{ marginTop: "10px" }}>Create Account</button>
          </form>
          
          <div className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
