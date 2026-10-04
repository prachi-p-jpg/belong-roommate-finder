import React from "react";
import Layout from "../components/Layout";

function Help() {
  return (
    <Layout>
      <div className="page-container" style={{ padding: "80px 5%", maxWidth: "900px", margin: "auto", minHeight: "70vh" }}>
        <h1 style={{ fontSize: "42px", fontFamily: "Playfair Display, serif", marginBottom: "20px", color: "#1a1645" }}>Help Center</h1>
        <p style={{ fontSize: "18px", color: "var(--muted)", lineHeight: "1.7", marginBottom: "40px" }}>
          Welcome to the Belong Help Center. Below you will find comprehensive guides and frequently asked questions to help you navigate our platform and ensure a safe, smooth, and successful roommate finding experience.
        </p>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "28px", color: "#1a1645", borderBottom: "2px solid #eae2ff", paddingBottom: "10px", marginBottom: "20px" }}>Getting Started</h2>
          
          <h3 style={{ fontSize: "20px", color: "var(--purple)", marginBottom: "10px" }}>How do I create a profile?</h3>
          <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "20px" }}>
            To create a profile, click on the "Sign Up" button at the top right of the homepage. You will be asked to provide basic information, verify your email, and fill out a lifestyle questionnaire to ensure accurate matchmaking. The more details you provide, the better Gemma (our AI assistant) can match you with compatible roommates.
          </p>

          <h3 style={{ fontSize: "20px", color: "var(--purple)", marginBottom: "10px" }}>How does the AI matching work?</h3>
          <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "20px" }}>
            Our proprietary matching algorithm, powered by Gemma, analyzes over 50 data points ranging from sleep schedules and cleanliness habits to social preferences. It generates a match percentage that indicates how well your lifestyle aligns with a potential roommate.
          </p>
        </section>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "28px", color: "#1a1645", borderBottom: "2px solid #eae2ff", paddingBottom: "10px", marginBottom: "20px" }}>Safety and Trust</h2>
          
          <h3 style={{ fontSize: "20px", color: "var(--purple)", marginBottom: "10px" }}>Are all users verified?</h3>
          <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "20px" }}>
            Yes! We mandate phone number verification and optional (but highly encouraged) government ID verification. Look for the blue "Verified" badge next to a user's name to ensure you are interacting with a confirmed profile.
          </p>

          <h3 style={{ fontSize: "20px", color: "var(--purple)", marginBottom: "10px" }}>What should I do if I feel unsafe?</h3>
          <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "20px" }}>
            If you ever feel uncomfortable interacting with a user, you can block them immediately by navigating to their profile and clicking "Block User." Additionally, please use the "Report" button to flag any suspicious behavior to our 24/7 trust and safety team. In case of emergencies, always contact local authorities first.
          </p>
        </section>

        <section style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "28px", color: "#1a1645", borderBottom: "2px solid #eae2ff", paddingBottom: "10px", marginBottom: "20px" }}>Payments and Fees</h2>
          
          <h3 style={{ fontSize: "20px", color: "var(--purple)", marginBottom: "10px" }}>Is Belong free to use?</h3>
          <p style={{ color: "var(--muted)", lineHeight: "1.7", marginBottom: "20px" }}>
            Basic account creation, browsing, and matching are 100% free. We also offer a premium tier which provides background checks, priority messaging, and lease agreement templates for a nominal monthly fee.
          </p>
        </section>
      </div>
    </Layout>
  );
}

export default Help;
