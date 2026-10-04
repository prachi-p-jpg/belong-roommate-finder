import React from "react";
import Layout from "../components/Layout";

function Contact() {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [status, setStatus] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("https://belong-roommate-finder.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  return (
    <Layout>
      <div className="page-container" style={{ padding: "80px 5%", maxWidth: "800px", margin: "auto", minHeight: "70vh" }}>
        <h1 style={{ fontSize: "42px", fontFamily: "Playfair Display, serif", marginBottom: "20px", color: "#1a1645" }}>Contact Us</h1>
        <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: "1.7", marginBottom: "40px" }}>
          Have a question or need assistance? Our support team is here to help. Reach out to us below and we will get back to you as soon as possible.
        </p>

        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontWeight: 600, color: "#1a1645" }}>Full Name</label>
            <input type="text" placeholder="John Doe" required style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #eae2ff", fontSize: "15px" }} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontWeight: 600, color: "#1a1645" }}>Email Address</label>
            <input type="email" placeholder="john@example.com" required style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #eae2ff", fontSize: "15px" }} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontWeight: 600, color: "#1a1645" }}>Message</label>
            <textarea placeholder="How can we help?" rows="5" required style={{ padding: "12px 15px", borderRadius: "8px", border: "1px solid #eae2ff", fontSize: "15px", resize: "vertical" }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
          </div>
          <button type="submit" style={{ background: "var(--purple)", color: "#fff", padding: "14px 24px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", alignSelf: "flex-start", marginTop: "10px" }}>
            Send Message
          </button>
          {status && <p style={{ color: status.includes("success") ? "green" : "var(--purple)", marginTop: "10px", fontWeight: "bold" }}>{status}</p>}
        </form>
      </div>
    </Layout>
  );
}

export default Contact;
