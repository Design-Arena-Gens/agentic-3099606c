const Footer = () => {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div>© {new Date().getFullYear()} GlobeX Markets. All rights reserved.</div>
        <div className="pill-group">
          <span className="badge-pill">SOC 2 Type II</span>
          <span className="badge-pill">ISO 27001</span>
          <span className="badge-pill">Digital asset + FX regulated</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
