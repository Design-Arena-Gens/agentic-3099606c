const playbooks = [
  {
    headline: "Volatility Surge Playbook",
    description:
      "When implied volatility jumps above the 80th percentile, automatically pivot from directional to market-neutral carry with delta-adjusted straddles.",
    checklist: [
      "Route BTC & ETH delta to CME futures for hedge efficiency",
      "Deploy FX straddle grid across EUR/USD and USD/JPY",
      "Activate cross-venue spread monitoring with circuit breakers"
    ]
  },
  {
    headline: "Liquidity Rotation Lens",
    description:
      "Detect liquidity migration between centralized exchanges, DEX pools, and prime brokers. Optimize utilization with dynamic collateral orchestration.",
    checklist: [
      "Collateralize with tri-party repo or staked ETH as eligible margin",
      "Rebalance borrow costs with automated RFQ to 20+ lenders",
      "Mirror book to synthetic exposures during venue downtime"
    ]
  },
  {
    headline: "Macro Catalyst Sprint",
    description:
      "Encode macro event calendars – FOMC, NFP, CPI, ECB – with pre- and post-event guardrails. Execute playbooks that protect downside while chasing upside dislocations.",
    checklist: [
      "Hedge basis risk with rolling swaps and dynamic delta bands",
      "Shift spot inventory into synthetics for balance sheet efficiency",
      "Trigger machine-read news sentiment for adaptive scaling"
    ]
  }
];

const SignalPlaybook = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="badge-pill">Executable playbooks</div>
        <h2 className="section-heading">Codify institutional strategy once – deploy everywhere</h2>
        <p className="section-description">
          Our agentic orchestration layer listens to signals, allocates capital, and confirms
          execution across every desk. Governance, audit, and compliance stay in lockstep.
        </p>
        <div className="grid" style={{ gap: "1.5rem" }}>
          {playbooks.map((playbook) => (
            <div
              key={playbook.headline}
              className="glass"
              style={{ padding: "1.8rem", display: "grid", gap: "1rem" }}
            >
              <div className="card-title" style={{ fontSize: "1.25rem" }}>
                {playbook.headline}
              </div>
              <div className="status">{playbook.description}</div>
              <div
                className="surface"
                style={{
                  padding: "1rem 1.25rem",
                  display: "grid",
                  gap: "0.6rem",
                  background: "rgba(8,11,19,0.55)"
                }}
              >
                {playbook.checklist.map((item) => (
                  <div key={item} className="status">
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignalPlaybook;
