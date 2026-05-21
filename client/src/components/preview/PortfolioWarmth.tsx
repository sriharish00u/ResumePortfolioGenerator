import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioWarmth() {
  const { userData, sectionVisibility } = useBuilder();

  const styles = {
    page: {
      fontFamily: "'Nunito', sans-serif",
      background: "#faf3e0",
      color: "#3d2c2a",
      minHeight: "100vh",
      width: "100%",
    },
    hero: {
      textAlign: "center" as const,
      padding: "80px 24px 60px",
      position: "relative" as const,
      overflow: "hidden" as const,
      background: "linear-gradient(135deg, #faf3e0 0%, #f5e6d0 50%, #faf3e0 100%)",
    },
    blob1: {
      position: "absolute" as const,
      top: "-60px",
      right: "-40px",
      width: "280px",
      height: "280px",
      borderRadius: "60% 40% 50% 50% / 45% 55% 50% 50%",
      background: "radial-gradient(circle, rgba(204,107,74,0.15) 0%, transparent 70%)",
      pointerEvents: "none" as const,
    },
    blob2: {
      position: "absolute" as const,
      bottom: "-40px",
      left: "-30px",
      width: "220px",
      height: "220px",
      borderRadius: "50% 60% 45% 55% / 55% 45% 55% 45%",
      background: "radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 70%)",
      pointerEvents: "none" as const,
    },
    name: {
      fontSize: "clamp(36px, 6vw, 52px)",
      fontWeight: 700,
      color: "#3d2c2a",
      margin: "0 0 4px",
      letterSpacing: "-0.02em",
    },
    role: {
      fontSize: "18px",
      color: "#cc6b4a",
      fontWeight: 600,
      margin: "0 0 8px",
    },
    tagline: {
      fontSize: "15px",
      color: "#7a6b68",
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: 1.6,
    },
    section: {
      padding: "48px 24px",
      maxWidth: "900px",
      margin: "0 auto",
    },
    card: {
      background: "#fff",
      borderRadius: "20px",
      padding: "32px",
      boxShadow: "0 4px 20px rgba(61,44,42,0.08)",
      marginBottom: "24px",
      border: "1px solid rgba(204,107,74,0.1)",
    },
    heading: {
      fontSize: "22px",
      fontWeight: 700,
      color: "#3d2c2a",
      margin: "0 0 20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    headingDot: {
      display: "inlineBlock",
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: "#cc6b4a",
      flexShrink: 0,
    },
    footer: {
      textAlign: "center" as const,
      padding: "40px 24px",
      borderTop: "1px solid rgba(204,107,74,0.15)",
    },
    tag: {
      display: "inlineBlock",
      padding: "6px 16px",
      borderRadius: "20px",
      background: "#f5e6d0",
      color: "#3d2c2a",
      fontSize: "13px",
      fontWeight: 600,
      margin: "0 6px 8px 0",
    },
    terracottaTag: {
      display: "inlineBlock",
      padding: "6px 16px",
      borderRadius: "20px",
      background: "#cc6b4a",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 600,
      margin: "0 6px 8px 0",
    },
    contactBtn: {
      display: "inlineBlock",
      padding: "12px 28px",
      borderRadius: "30px",
      background: "#cc6b4a",
      color: "#fff",
      fontSize: "14px",
      fontWeight: 600,
      textDecoration: "none",
      margin: "4px 8px",
    },
  };

  return (
    <div id="portfolio-preview-content" style={styles.page}>
      <style>{`
        @media print {
          body { background: #faf3e0; }
          .warmth-card { break-inside: avoid; }
        }
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        .warmth-blob { animation: floatBlob 6s ease-in-out infinite; }
        .warmth-card { transition: transform 0.2s; }
        .warmth-card:hover { transform: translateY(-2px); }
      `}</style>

      {/* Hero */}
      <section style={styles.hero}>
        <div className="warmth-blob" style={styles.blob1} />
        <div className="warmth-blob" style={styles.blob2} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {userData.profileImage && (
            <img
              src={userData.profileImage}
              alt=""
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "16px", border: "3px solid #cc6b4a" }}
            />
          )}
          <h1 style={styles.name}>{userData.fullName || "Your Name"}</h1>
          <p style={styles.role}>{userData.role || "Your Role"}</p>
          {userData.portfolioHero && <p style={styles.tagline}>{userData.portfolioHero}</p>}
        </div>
      </section>

      {/* Summary */}
      {sectionVisibility.summary && userData.summary && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />About Me</h2>
            <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#5a4b48", margin: 0 }}>{userData.summary}</p>
          </div>
        </section>
      )}

      {/* Skills */}
      {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Things I'm Good At</h2>
            <div>
              {userData.skills.map((s, i) => (
                <span key={i} style={i % 3 === 0 ? styles.terracottaTag : styles.tag}>{s}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Where I've Been</h2>
            {userData.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: i < (userData.experience?.length ?? 0) - 1 ? "20px" : 0, paddingLeft: "16px", borderLeft: "2px solid #f5e6d0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 2px", color: "#3d2c2a" }}>{e.role}</h3>
                  <span style={{ fontSize: "12px", color: "#7a6b68" }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: "13px", color: "#cc6b4a", fontWeight: 600, margin: "0 0 4px" }}>{e.organization}</p>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#5a4b48", margin: 0 }}>{e.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              {userData.projects.map((p, i) => (
                <div key={i} style={{ background: "#faf3e0", borderRadius: "14px", padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px", color: "#3d2c2a" }}>{p.title}</h3>
                  <p style={{ fontSize: "12px", color: "#cc6b4a", fontWeight: 600, margin: "0 0 8px" }}>{p.tools}</p>
                  <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#5a4b48", margin: 0 }}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education */}
      {sectionVisibility.education && userData.education && userData.education.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Education</h2>
            {userData.education.map((e, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < (userData.education?.length ?? 0) - 1 ? "1px solid #f5e6d0" : "none" }}>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#3d2c2a" }}>{e.degree} in {e.field}</p>
                  <p style={{ fontSize: "13px", color: "#7a6b68", margin: "2px 0 0" }}>{e.institution}{e.grade ? ` — ${e.grade}` : ""}</p>
                </div>
                <span style={{ fontSize: "12px", color: "#cc6b4a", fontWeight: 600, whiteSpace: "nowrap" }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Achievements</h2>
            {userData.achievements.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flexStart", gap: "10px", marginBottom: i < (userData.achievements?.length ?? 0) - 1 ? "12px" : 0 }}>
                <span style={{ color: "#cc6b4a", fontSize: "16px", marginTop: "2px" }}>✦</span>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, margin: 0, color: "#3d2c2a" }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: "13px", color: "#5a4b48", margin: "2px 0 0" }}>{a.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hobbies */}
      {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
        <section style={styles.section}>
          <div style={styles.card} className="warmth-card">
            <h2 style={styles.heading}><span style={styles.headingDot} />Outside of Work</h2>
            <div>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={styles.tag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Footer */}
      <footer style={styles.footer}>
        <p style={{ color: "#7a6b68", marginBottom: "16px", fontSize: "14px" }}>Let's connect</p>
        <div>
          {userData.email && <a href={`mailto:${userData.email}`} style={styles.contactBtn}>{userData.email}</a>}
          {userData.phone && <span style={{ ...styles.contactBtn, background: "#3d2c2a" }}>{userData.phone}</span>}
          {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactBtn, background: "#f5e6d0", color: "#3d2c2a" }}>LinkedIn</a>}
          {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactBtn, background: "#f5e6d0", color: "#3d2c2a" }}>GitHub</a>}
          {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={{ ...styles.contactBtn, background: "#f5e6d0", color: "#3d2c2a" }}>Portfolio</a>}
        </div>
        <p style={{ fontSize: "12px", color: "#a0908d", marginTop: "24px" }}>Built with warmth</p>
      </footer>
    </div>
  );
}
