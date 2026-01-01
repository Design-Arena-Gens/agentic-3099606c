const coverage = [
  {
    region: "Americas",
    hubs: ["New York", "Chicago", "São Paulo", "Toronto"],
    focus: "Options liquidity, USD funding, OTC block desk"
  },
  {
    region: "EMEA",
    hubs: ["London", "Zurich", "Dubai", "Johannesburg"],
    focus: "FX macros, structured products, CBDC readiness"
  },
  {
    region: "APAC",
    hubs: ["Singapore", "Hong Kong", "Tokyo", "Sydney"],
    focus: "24/7 coverage, DeFi connectivity, derivatives innovation"
  }
];

const GlobalExpansion = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="badge-pill">Global network</div>
        <h2 className="section-heading">Licensed coverage & execution in 20+ jurisdictions</h2>
        <p className="section-description">
          Connect instantly to regulated venues, OTC desks, and banking partners. Our compliance
          fabric keeps your mandate aligned across every geography while preserving speed.
        </p>
        <div className="glass" style={{ padding: "2.5rem", display: "grid", gap: "2rem" }}>
          <div className="split">
            <div style={{ display: "grid", gap: "0.75rem" }}>
              <div className="highlight">
                <div className="status">Coverage fabric</div>
                <p style={{ margin: "0.5rem 0 0", color: "var(--text)" }}>
                  12 regulatory regimes, 40+ banks, 120+ exchanges, and liquidity pools – unified
                  through a single command center.
                </p>
              </div>
              <div className="status">
                Deploy new strategies in days, not quarters. Our global onboarding kernel maps your
                entity structure, risk constraints, and counterparty stack so you can launch
                anywhere instantly.
              </div>
            </div>
            <div
              className="surface"
              style={{
                borderRadius: "16px",
                padding: "1.5rem",
                border: "1px solid rgba(56,189,248,0.25)",
                display: "grid",
                gap: "1rem"
              }}
            >
              {coverage.map((item) => (
                <div key={item.region} style={{ display: "grid", gap: "0.35rem" }}>
                  <div className="card-title" style={{ fontSize: "1.15rem" }}>
                    {item.region}
                  </div>
                  <div className="status">
                    Hubs:{" "}
                    <span style={{ color: "var(--text)" }}>
                      {item.hubs.join(" • ")}
                    </span>
                  </div>
                  <div className="status">Focus: {item.focus}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="pill-group">
            {[
              "MiCA-ready digital asset compliance",
              "MAS and SFC aligned reporting",
              "CFTC + FCA derivatives coverage",
              "Tier-1 custody & insurance partners"
            ].map((item) => (
              <span key={item} className="badge-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalExpansion;
