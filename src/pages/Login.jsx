import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });
      let data = await response.json();

      if (response.status === 404) {
        alert("You have to create your account first.");
        return;
      } else if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      } else {
        alert("Logged in successfully!");
      }
      
      localStorage.setItem("belong_user", JSON.stringify(data.user));
      localStorage.setItem("belong_token", data.token);
      window.dispatchEvent(new Event("userLogin"));
      navigate("/");

    } catch (err) {
      console.error(err);
      alert("Error logging in or creating account");
    }
  };

  return (
    <Layout>
      <div className="auth-page">
        <div className="auth-box">
          <div className="auth-title">
            <h1>Welcome to Belong</h1>
            <p>Find a place where you belong.</p>
          </div>
          

          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className="auth-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            
            <button type="submit" className="primary wide" style={{ marginTop: "10px" }}>Login</button>
          </form>
          
          <div className="auth-footer">
            New to Belong? <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
