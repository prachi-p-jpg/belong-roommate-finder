import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Profile(){
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Guest User", email: "guest@example.com", phone: "+91 XXXXX XXXXX", image: null });

  useEffect(() => {
    const stored = localStorage.getItem("belong_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        ...parsed,
        email: parsed.email || `${parsed.name.toLowerCase().split(" ")[0]}@example.com`,
        phone: parsed.phone || "+91 XXXXX XXXXX"
      });
    } else {
      setUser({ name: "Prachi Prajapati", email: "prachi@email.com", phone: "+91 XXXXX XXXXX", image: null });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("belong_user");
    window.dispatchEvent(new Event("userLogin"));
    navigate("/");
  };

  return (
    <Layout>
      <div className="auth-page">
        <div className="auth-box" style={{ textAlign: "center", maxWidth: "400px", padding: "40px 30px" }}>
          
          <h1 style={{ marginBottom: "25px", fontSize: "24px" }}>My Profile</h1>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
            {user.image ? (
              <img src={user.image} alt={user.name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <div className="avatar giant" style={{ width: '100px', height: '100px', fontSize: '40px' }}>{user.name.charAt(0)}</div>
            )}
          </div>
          
          <h2 style={{ fontSize: "22px", margin: "5px 0" }}>{user.name}</h2>
          <p style={{ color: "var(--muted)", margin: "3px 0", fontSize: "15px" }}>{user.email}</p>
          

          
          <button onClick={handleLogout} className="primary wide" style={{ background: "#fdf2f2", color: "#d93b3b", border: "1px solid #f8d7d7", marginTop: "20px" }}>
            Logout
          </button>
          
        </div>
      </div>
    </Layout>
  );
}

export default Profile;