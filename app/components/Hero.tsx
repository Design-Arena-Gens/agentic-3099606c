import Link from "next/link";

const Hero = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="tag tag-accent">Global Crypto & Forex Command Center</div>
        <h1 className="title">Operate Advanced Markets in Real Time</h1>
        <p className="subtitle">
          GlobeX Markets automates discovery, quant analytics, and risk alignment across the full
          spectrum of digital assets and fiat pairs. Execute globally with institutional precision,
          powered by streaming intelligence and adaptive playbooks.
        </p>
        <div className="cta-actions" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="#intelligence">
            Launch Intelligence Suite
          </Link>
          <Link className="btn btn-outline" href="#contact">
            Request Institutional Access
          </Link>
        </div>
        <div
          className="surface"
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.25rem"
          }}
        >
          {[
            {
              label: "Active markets",
              value: "150+",
              helper: "Cross-venue crypto & FX liquidity"
            },
            { label: "Strategy runtime", value: "24/7", helper: "Low-latency automation" },
            { label: "Counterparty coverage", value: "60+", helper: "Global prime partners" }
          ].map((item) => (
            <div key={item.label}>
              <div className="badge-pill">{item.label}</div>
              <div className="card-value" style={{ marginTop: "0.35rem" }}>
                {item.value}
              </div>
              <div className="status" style={{ marginTop: "0.2rem" }}>
                {item.helper}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
