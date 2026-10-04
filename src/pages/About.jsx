import React from "react";
import Layout from "../components/Layout";
import { Users, ShieldCheck, Heart } from "lucide-react";

function About() {
  return (
    <Layout>
      <div className="about-page" style={{ padding: "80px 5%", maxWidth: "1000px", margin: "auto", minHeight: "60vh" }}>
        <h1 style={{ fontSize: "48px", fontFamily: "Playfair Display, serif", marginBottom: "20px", color: "#1a1645" }}>About Belong</h1>
        <p style={{ fontSize: "20px", color: "var(--muted)", lineHeight: "1.7", marginBottom: "60px", maxWidth: "700px" }}>
          We believe finding a home is more than just four walls—it's about the people you share it with. Our mission is to connect compatible roommates and help you find a space where you truly belong.
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px", marginBottom: "50px" }}>
           <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#f4f1ff", color: "var(--purple)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                 <Users size={24} />
              </div>
              <h3 style={{ marginTop: "15px", color: "#1a1645" }}>Community First</h3>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>We build connections that matter, matching you with roommates who share your vibe, lifestyle, and daily habits.</p>
           </div>
           <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#e6f0ff", color: "#367bd9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                 <ShieldCheck size={24} />
              </div>
              <h3 style={{ marginTop: "15px", color: "#1a1645" }}>Safe & Verified</h3>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>Every listing and user is verified to ensure a secure, transparent, and trustworthy environment for everyone.</p>
           </div>
           <div style={{ background: "#fff", padding: "30px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
              <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#fff0e6", color: "#d97736", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                 <Heart size={24} />
              </div>
              <h3 style={{ marginTop: "15px", color: "#1a1645" }}>Inclusive Spaces</h3>
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: "1.6" }}>We are deeply committed to fostering LGBTQ+ friendly and welcoming homes where you can be yourself.</p>
           </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
