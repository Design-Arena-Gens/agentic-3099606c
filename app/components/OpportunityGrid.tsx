const insights = [
  {
    title: "Adaptive Alpha Streams",
    description:
      "Systematically harvest crypto and FX inefficiencies with machine-driven models that re-weight exposure by venue, volatility regime, and funding cost in real time.",
    bullets: [
      "Cross-exchange smart routing across spot, perpetuals, and futures",
      "Volatility-aware sizing with drawdown governors",
      "Institutional grade execution with slippage intelligence"
    ]
  },
  {
    title: "Macro & On-chain Fusion",
    description:
      "Blend macro indicators with on-chain signals to price directional conviction ahead of the market. Integrate your proprietary feeds through our pipeline.",
    bullets: [
      "Yield differentials, PMI, CPI, and Fed tone overlay",
      "Token velocity, staking flows, and whale wallet heuristics",
      "Automated signal QA with explainability tooling"
    ]
  },
  {
    title: "Risk Alignment Operating System",
    description:
      "Codify mandates, tax lots, and credit limits into executable policies. Ensure compliance and risk symmetry across global desks without slowing execution.",
    bullets: [
      "Dynamic hedging autopilot with VaR projections",
      "Counterparty health scoring and exposure heatmaps",
      "Automated incident routing with full audit trail"
    ]
  }
];

const OpportunityGrid = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="badge-pill">Strategy DNA</div>
        <h2 className="section-heading">Deploy quant-playbooks that scale globally</h2>
        <p className="section-description">
          Configure your trading stack from price discovery through reconciliation. We orchestrate
          every layer so your teams can focus on capturing alpha and preserving capital.
        </p>
        <div className="grid grid-3">
          {insights.map((insight) => (
            <div key={insight.title} className="surface" style={{ display: "grid", gap: "1rem" }}>
              <div className="card-title" style={{ fontSize: "1.35rem" }}>
                {insight.title}
              </div>
              <div className="status" style={{ fontSize: "0.95rem" }}>
                {insight.description}
              </div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "var(--muted)", display: "grid", gap: "0.4rem" }}>
                {insight.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunityGrid;
