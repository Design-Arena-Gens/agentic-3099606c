'use client';

import { FormEvent, useState } from "react";

const ContactSection = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage("Request received. Our institutional team will follow up within 24 hours.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Something went wrong. Please retry or email desk@globexmarkets.com.");
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="badge-pill">Institutional onboarding</div>
        <h2 className="section-heading">Partner with our trading intelligence desk</h2>
        <p className="section-description">
          Request a private briefing and sandbox environment. We tailor integrations to match your
          strategy, compliance posture, and risk appetite.
        </p>
        <div className="split">
          <div className="surface" style={{ display: "grid", gap: "1.25rem" }}>
            <div className="status">
              Custom launch plans covering infrastructure, governance, and liquidity orchestration.
            </div>
            <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", display: "grid", gap: "0.5rem" }}>
              <li>Rapid integration via FIX, REST, WebSocket, and prime APIs</li>
              <li>Dedicated program manager with 24/7 follow-the-sun coverage</li>
              <li>Multi-entity, multi-jurisdiction compliance templates</li>
            </ul>
          </div>
          <div className="glass" style={{ padding: "2rem" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="name">Full name *</label>
                <input id="name" name="name" placeholder="Jane Doe" required />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="email">Work email *</label>
                <input id="email" name="email" type="email" placeholder="jane@fund.com" required />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="company">Company</label>
                <input id="company" name="company" placeholder="GlobeX Capital" />
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="interest">Primary interest</label>
                <select id="interest" name="interest" defaultValue="crypto-alpha">
                  <option value="crypto-alpha">Crypto quant strategies</option>
                  <option value="forex-liquidity">Forex liquidity & hedging</option>
                  <option value="treasury">Treasury & treasury yield</option>
                  <option value="defi-integration">DeFi connectivity</option>
                  <option value="infrastructure">Full-stack infrastructure</option>
                </select>
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                <label htmlFor="message">Mission brief</label>
                <textarea id="message" name="message" placeholder="Share your objectives" />
              </div>
              <button className="btn btn-primary" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Transmitting..." : "Engage Strategy Team"}
              </button>
              {message && (
                <div
                  className={`status ${status === "success" ? "success" : status === "error" ? "error" : ""}`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
