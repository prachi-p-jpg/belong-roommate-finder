import React from "react";
import Layout from "../components/Layout";

function Privacy() {
  return (
    <Layout>
      <div className="page-container" style={{ padding: "80px 5%", maxWidth: "900px", margin: "auto", minHeight: "70vh" }}>
        <h1 style={{ fontSize: "42px", fontFamily: "Playfair Display, serif", marginBottom: "20px", color: "#1a1645" }}>Privacy Policy</h1>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "40px" }}>Last updated: October 2026</p>

        <div style={{ color: "#333", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            At Belong, your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our mobile application.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>1. Information We Collect</h2>
          <p style={{ marginBottom: "20px" }}>
            We collect personal information that you voluntarily provide to us when you register on the platform. This includes:
          </p>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}><strong>Account Information:</strong> Name, email address, phone number, and password.</li>
            <li style={{ marginBottom: "10px" }}><strong>Profile Information:</strong> Age, occupation, lifestyle habits (e.g., sleep schedule, smoking preference), and profile photos.</li>
            <li style={{ marginBottom: "10px" }}><strong>Location Data:</strong> When enabled, we collect location data to show you nearby listings and potential roommates.</li>
          </ul>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>2. How We Use Your Information</h2>
          <p style={{ marginBottom: "20px" }}>
            We use the information we collect primarily to provide and improve our Services. Specifically, we use your data to:
          </p>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}>Calculate compatibility scores using our AI engine, Gemma.</li>
            <li style={{ marginBottom: "10px" }}>Facilitate communication between users via our in-app messaging system.</li>
            <li style={{ marginBottom: "10px" }}>Verify your identity to maintain a safe and trustworthy community.</li>
            <li style={{ marginBottom: "10px" }}>Send you administrative emails, security alerts, and support messages.</li>
          </ul>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>3. Data Sharing and Disclosure</h2>
          <p style={{ marginBottom: "20px" }}>
            We do not sell your personal information to third parties. We may share your information only in the following situations:
          </p>
          <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
            <li style={{ marginBottom: "10px" }}><strong>With Other Users:</strong> Your public profile and lifestyle preferences are visible to other registered users to facilitate matchmaking.</li>
            <li style={{ marginBottom: "10px" }}><strong>Service Providers:</strong> We may share data with third-party vendors who assist us with cloud hosting, analytics, and customer support.</li>
            <li style={{ marginBottom: "10px" }}><strong>Legal Obligations:</strong> We may disclose your information where required by law, subpoena, or similar legal process.</li>
          </ul>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>4. Data Security</h2>
          <p style={{ marginBottom: "20px" }}>
            We implement industry-standard administrative, technical, and physical security measures to protect your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>5. Your Privacy Rights</h2>
          <p style={{ marginBottom: "20px" }}>
            Depending on your jurisdiction, you may have the right to access, rectify, or delete your personal data. You can manage your account settings directly within the app or contact our support team to exercise these rights.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Privacy;
