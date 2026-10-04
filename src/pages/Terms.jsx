import React from "react";
import Layout from "../components/Layout";

function Terms() {
  return (
    <Layout>
      <div className="page-container" style={{ padding: "80px 5%", maxWidth: "900px", margin: "auto", minHeight: "70vh" }}>
        <h1 style={{ fontSize: "42px", fontFamily: "Playfair Display, serif", marginBottom: "20px", color: "#1a1645" }}>Terms & Conditions</h1>
        <p style={{ fontSize: "14px", color: "var(--muted)", marginBottom: "40px" }}>Last updated: October 2026</p>

        <div style={{ color: "#333", lineHeight: "1.8", fontSize: "16px" }}>
          <p style={{ marginBottom: "20px" }}>
            Welcome to Belong. By accessing or using our website, mobile application, and services (collectively, the "Services"), you agree to be bound by these Terms and Conditions ("Terms"). Please read them carefully before using our platform.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>1. Acceptance of Terms</h2>
          <p style={{ marginBottom: "20px" }}>
            By registering for an account or using the Services in any way, you accept these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our Services. We may update these Terms from time to time, and your continued use of the Services signifies your acceptance of any changes.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>2. User Eligibility</h2>
          <p style={{ marginBottom: "20px" }}>
            You must be at least 18 years old to use the Services. By creating an account, you represent and warrant that you are of legal age to form a binding contract and that all information you submit is accurate and truthful.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>3. Community Guidelines</h2>
          <p style={{ marginBottom: "20px" }}>
            Belong is built on mutual respect and trust. You agree to interact with other users courteously. Harassment, discrimination, hate speech, or deceptive behavior will not be tolerated and will result in immediate account termination.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>4. Listings and Accuracy</h2>
          <p style={{ marginBottom: "20px" }}>
            Users who post room listings ("Hosts") are responsible for ensuring the accuracy, legality, and safety of their listings. Belong acts solely as a matching platform and does not own, manage, or inspect the properties listed. We strongly advise all users to verify details and view properties in person before signing agreements or making payments.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>5. Limitation of Liability</h2>
          <p style={{ marginBottom: "20px" }}>
            To the maximum extent permitted by law, Belong shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Services; (b) any conduct or content of any third party on the Services; or (c) unauthorized access, use, or alteration of your transmissions or content.
          </p>

          <h2 style={{ fontSize: "24px", color: "#1a1645", marginTop: "40px", marginBottom: "15px" }}>6. Governing Law</h2>
          <p style={{ marginBottom: "20px" }}>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Belong is headquartered, without regard to its conflict of law provisions.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Terms;
