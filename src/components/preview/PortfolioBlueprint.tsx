import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioBlueprint() {
  const { userData, sectionVisibility } = useBuilder();

  const styles = {
    page: {
      fontFamily: "'DM Sans', 'Lato', sans-serif",
      background: "#e8f4f8",
      color: "#1a365d",
      minHeight: "100vh",
      width: "100%",
      position: "relative" as const,
    },
    gridOverlay: {
      position: "fixed" as const,
      inset: 0,
      pointerEvents: "none" as const,
      zIndex: 0,
      opacity: 0.15,
      backgroundImage:
        "linear-gradient(#1a365d 1px, transparent 1px), linear-gradient(90deg, #1a365d 1px, transparent 1px)",
      backgroundSize: "40px 40px, 40px 40px",
    },
    content: {
      position: "relative" as const,
      zIndex: 1,
    },
    hero: {
      padding: "80px 24px 48px",
      textAlign: "center" as const,
      position: "relative" as const,
      borderBottom: "3px solid #1a365d",
    },
    heroCornerTL: {
      position: "absolute" as const,
      top: "16px",
      left: "16px",
      width: "24px",
      height: "24px",
      borderTop: "3px solid #ff6b35",
      borderLeft: "3px solid #ff6b35",
    },
    heroCornerBR: {
      position: "absolute" as const,
      bottom: "-3px",
      right: "16px",
      width: "24px",
      height: "24px",
      borderBottom: "3px solid #ff6b35",
      borderRight: "3px solid #ff6b35",
    },
    specLabel: {
      fontSize: "10px",
      textTransform: "uppercase" as const,
      letterSpacing: "2px",
      color: "#ff6b35",
      fontWeight: 700,
      marginBottom: "8px",
    },
    name: {
      fontSize: "clamp(32px, 5vw, 48px)",
      fontWeight: 700,
      color: "#1a365d",
      margin: "0 0 4px",
      fontFamily: "'DM Sans', sans-serif",
    },
    role: {
      fontSize: "16px",
      color: "#ff6b35",
      fontWeight: 600,
      margin: "0 0 4px",
      letterSpacing: "1px",
      textTransform: "uppercase" as const,
    },
    section: {
      padding: "40px 24px",
      maxWidth: "960px",
      margin: "0 auto",
    },
    specCard: {
      background: "#fff",
      border: "2px solid #1a365d",
      padding: "28px",
      marginBottom: "20px",
      position: "relative" as const,
    },
    specCorner: {
      position: "absolute" as const,
      bottom: "-2px",
      right: "-2px",
      width: "16px",
      height: "16px",
      borderBottom: "3px solid #ff6b35",
      borderRight: "3px solid #ff6b35",
    },
    heading: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#1a365d",
      margin: "0 0 16px",
      textTransform: "uppercase" as const,
      letterSpacing: "1.5px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      borderBottom: "2px solid #1a365d",
      paddingBottom: "8px",
    },
    headingMarker: {
      width: "12px",
      height: "12px",
      background: "#ff6b35",
      flexShrink: 0,
    },
    tag: {
      display: "inlineBlock",
      padding: "4px 14px",
      border: "1.5px solid #1a365d",
      color: "#1a365d",
      fontSize: "12px",
      fontWeight: 600,
      margin: "0 6px 8px 0",
      background: "rgba(26,54,93,0.04)",
    },
    orangeTag: {
      display: "inlineBlock",
      padding: "4px 14px",
      border: "1.5px solid #ff6b35",
      color: "#ff6b35",
      fontSize: "12px",
      fontWeight: 700,
      margin: "0 6px 8px 0",
      background: "rgba(255,107,53,0.06)",
    },
    measurement: {
      fontSize: "10px",
      color: "#ff6b35",
      fontWeight: 700,
      letterSpacing: "1px",
      marginBottom: "4px",
    },
  };

  return (
    <div id="portfolio-preview-content" style={styles.page}>
      <style>{`
        @media print {
          body { background: #e8f4f8; }
          .bp-card { break-inside: avoid; border: 1px solid #1a365d; }
        }
        .bp-card { transition: box-shadow 0.2s; }
        .bp-card:hover { box-shadow: 4px 4px 0 rgba(26,54,93,0.1); }
      `}</style>

      {/* Grid Overlay */}
      <div style={styles.gridOverlay} />

      <div style={styles.content}>
        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.heroCornerTL} />
          <div style={styles.heroCornerBR} />
          <p style={styles.specLabel}>Specification Sheet</p>
          <h1 style={styles.name}>{userData.fullName || "Your Name"}</h1>
          <p style={styles.role}>{userData.role || "Your Role"}</p>
          {userData.portfolioHero && (
            <p style={{ fontSize: "14px", color: "#4a6a8a", maxWidth: "500px", margin: "12px auto 0", fontStyle: "italic" }}>
              "{userData.portfolioHero}"
            </p>
          )}
          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", fontSize: "13px", color: "#1a365d" }}>
            {userData.email && <span>✉ {userData.email}</span>}
            {userData.phone && <span>☎ {userData.phone}</span>}
          </div>
        </section>

        {/* Summary */}
        {sectionVisibility.summary && userData.summary && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-001 // Overview</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Profile</h2>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#2d4a6a", margin: 0 }}>{userData.summary}</p>
            </div>
          </section>
        )}

        {/* Skills */}
        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-002 // Competencies</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Technical Specifications</h2>
              <div>
                {userData.skills.map((s, i) => (
                  <span key={i} style={i % 2 === 0 ? styles.orangeTag : styles.tag}>{s}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience */}
        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-003 // Employment History</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Experience Timeline</h2>
              {userData.experience.map((e, i) => (
                <div key={i} style={{ marginBottom: i < (userData.experience?.length ?? 0) - 1 ? "16px" : 0, paddingLeft: "20px", borderLeft: "2px solid #1a365d", position: "relative" }}>
                  <div style={{ position: "absolute", left: "-5px", top: "4px", width: "8px", height: "8px", background: "#ff6b35", borderRadius: "50%" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "0 0 2px", color: "#1a365d" }}>{e.role}</h3>
                    <span style={{ fontSize: "11px", color: "#ff6b35", fontWeight: 700 }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#4a6a8a", fontWeight: 600, margin: "0 0 4px" }}>{e.organization}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#2d4a6a", margin: 0 }}>{e.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-004 // Deliverables</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Projects</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                {userData.projects.map((p, i) => (
                  <div key={i} style={{ border: "1.5px solid #1a365d", padding: "20px", background: "rgba(26,54,93,0.02)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flexStart", marginBottom: "6px" }}>
                      <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#1a365d" }}>{p.title}</h3>
                      <span style={{ fontSize: "10px", color: "#ff6b35", fontWeight: 700 }}>{`PRJ-${String(i + 1).padStart(3, "0")}`}</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#ff6b35", fontWeight: 600, margin: "0 0 6px" }}>Tech: {p.tools}</p>
                    <p style={{ fontSize: "13px", lineHeight: 1.5, color: "#2d4a6a", margin: 0 }}>{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education */}
        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-005 // Credentials</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Education</h2>
              {userData.education.map((e, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < (userData.education?.length ?? 0) - 1 ? "1px dashed #1a365d" : "none" }}>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#1a365d" }}>{e.degree} in {e.field}</p>
                    <p style={{ fontSize: "13px", color: "#4a6a8a", margin: "1px 0 0" }}>{e.institution}{e.grade ? ` — GPA: ${e.grade}` : ""}</p>
                  </div>
                  <span style={{ fontSize: "11px", color: "#ff6b35", fontWeight: 700, whiteSpace: "nowrap" }}>{e.startYear} – {e.endYear}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-006 // Milestones</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Achievements</h2>
              {userData.achievements.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flexStart", gap: "10px", marginBottom: i < (userData.achievements?.length ?? 0) - 1 ? "10px" : 0 }}>
                  <span style={{ color: "#ff6b35", fontSize: "14px", marginTop: "2px" }}>◆</span>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, margin: 0, color: "#1a365d" }}>{a.title}</p>
                    {a.description && <p style={{ fontSize: "12px", color: "#4a6a8a", margin: "2px 0 0" }}>{a.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section style={styles.section}>
            <div style={styles.specCard} className="bp-card">
              <div style={styles.specCorner} />
              <p style={styles.measurement}>SPEC-007 // Personal</p>
              <h2 style={styles.heading}><span style={styles.headingMarker} />Interests</h2>
              <div>
                {userData.hobbies.map((h, i) => (
                  <span key={i} style={styles.tag}>{h}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "32px 24px", borderTop: "2px solid #1a365d", marginTop: "20px", position: "relative" }}>
          <div style={{ position: "absolute", top: "-2px", left: "24px", width: "16px", height: "16px", borderTop: "3px solid #ff6b35", borderLeft: "3px solid #ff6b35" }} />
          <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", color: "#ff6b35", fontWeight: 700, marginBottom: "8px" }}>End of Specification</p>
          <p style={{ fontSize: "12px", color: "#4a6a8a", margin: 0 }}>
            {userData.email && <span>{userData.email} &nbsp;|&nbsp; </span>}
            {userData.phone && <span>{userData.phone}</span>}
          </p>
        </footer>
      </div>
    </div>
  );
}
