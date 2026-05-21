import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioMinimal() {
  const { userData, sectionVisibility } = useBuilder();

  const s = {
    root: { fontFamily: "'Lato', system-ui, sans-serif", background: '#ffffff', color: '#111111', minHeight: '100vh' },
    inner: { maxWidth: '800px', margin: '0 auto', width: '100%' },
    section: { padding: '120px 40px' } as React.CSSProperties,
    sectionBorder: { padding: '120px 40px', borderTop: '1px solid #eee' } as React.CSSProperties,
    hero: { padding: '140px 40px 100px', textAlign: 'center' as const, maxWidth: '700px', margin: '0 auto' },
    displayText: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 42px)', fontStyle: 'italic', fontWeight: 400, color: '#111', lineHeight: 1.4, letterSpacing: '-0.3px' } as React.CSSProperties,
    displayLarge: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(48px, 8vw, 88px)', fontWeight: 400, color: '#111', lineHeight: 1, letterSpacing: '-2px', margin: '0 0 24px' },
    role: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 32px)', fontStyle: 'italic', fontWeight: 400, color: '#999', margin: '0 0 32px' },
    subtitle: { fontSize: '14px', color: '#999', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 12px' },
    body: { fontSize: '15px', lineHeight: 1.8, color: '#444', margin: 0, maxWidth: '600px' },
    heading: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 400, color: '#111', margin: '0 0 32px', lineHeight: 1.15 },
    headingSmall: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 400, fontStyle: 'italic', color: '#999', margin: '0 0 16px' },
    smallText: { fontSize: '12px', color: '#bbb', letterSpacing: '2px', textTransform: 'uppercase' as const, margin: '0 0 32px' },
    line: { width: '40px', height: '1px', background: '#ddd', marginBottom: '32px' },
    tag: { fontSize: '13px', color: '#777', border: '1px solid #e0e0e0', padding: '6px 16px', borderRadius: '0', fontWeight: 400, letterSpacing: '0.5px' },
    projectCard: { borderBottom: '1px solid #f0f0f0', paddingBottom: '32px', marginBottom: '32px' } as React.CSSProperties,
    projectTitle: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: '22px', fontWeight: 400, color: '#111', margin: '0 0 8px' },
    eduItem: { borderBottom: '1px solid #f0f0f0', paddingBottom: '24px', marginBottom: '24px' } as React.CSSProperties,
    expItem: { borderBottom: '1px solid #f0f0f0', paddingBottom: '24px', marginBottom: '24px' } as React.CSSProperties,
    achievementItem: { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' } as React.CSSProperties,
    hobbyTag: { fontSize: '13px', color: '#888', border: '1px solid #eee', padding: '8px 20px', borderRadius: '0', fontWeight: 400 },
    contact: { padding: '100px 40px', textAlign: 'center' as const, borderTop: '1px solid #eee' } as React.CSSProperties,
    footerLink: { fontSize: '13px', color: '#999', textDecoration: 'none', letterSpacing: '1px', textTransform: 'uppercase' as const, fontWeight: 400, transition: 'color 0.2s' } as React.CSSProperties,
    toolTag: { fontSize: '11px', color: '#aaa', letterSpacing: '0.5px' },
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          section { page-break-inside: avoid; }
        }
        @keyframes minimalFade { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes minimalReveal { 0% { opacity: 0; } 100% { opacity: 1; } }
        .minimal-fade { animation: minimalFade 0.8s ease forwards; opacity: 0; }
        .minimal-fade:nth-child(1) { animation-delay: 0s; }
        .minimal-fade:nth-child(2) { animation-delay: 0.15s; }
        .minimal-fade:nth-child(3) { animation-delay: 0.3s; }
        a { transition: color 0.2s ease; }
        a:hover { color: #111 !important; }
        .minimal-link { transition: color 0.2s ease; }
        .minimal-link:hover { color: #111 !important; }
        @media (max-width: 600px) {
          section { padding: 60px 24px !important; }
        }
      `}</style>

      <section style={s.hero}>
        <div style={{ animation: 'minimalFade 0.8s ease' }}>
          <p style={s.subtitle}>{userData.role || 'Your Role'}</p>
          <h1 style={s.displayLarge}>{userData.fullName || 'Your Name'}</h1>
          {(userData.portfolioHero || userData.summary) && (
            <p style={s.displayText}>
              &ldquo;{userData.portfolioHero || userData.summary}&rdquo;
            </p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>About</p>
            <div style={s.line} />
            <p style={s.body}>{userData.summary}</p>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={s.sectionBorder}>
          <div style={s.inner}>
            <p style={s.smallText}>Skills</p>
            <div style={s.line} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} style={s.tag}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>Experience</p>
            <div style={s.line} />
            <div style={{ maxWidth: '600px' }}>
              {userData.experience.map((exp, i) => (
                <div key={i} style={s.expItem}>
                  <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: 400, color: '#111', margin: '0 0 2px' }}>{exp.role}</h3>
                    <span style={{ fontSize: '12px', color: '#bbb', letterSpacing: '1px' }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#888', margin: '0 0 10px', letterSpacing: '0.5px' }}>{exp.organization}</p>
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={s.sectionBorder}>
          <div style={s.inner}>
            <p style={s.smallText}>Projects</p>
            <div style={s.line} />
            <div style={{ maxWidth: '600px' }}>
              {userData.projects.map((proj, i) => (
                <div key={i} style={s.projectCard}>
                  <h3 style={s.projectTitle}>{proj.title}</h3>
                  {proj.tools && (
                    <p style={{ ...s.toolTag, margin: '0 0 8px' }}>{proj.tools}</p>
                  )}
                  <p style={{ fontSize: '14px', color: '#555', lineHeight: 1.7, margin: 0 }}>{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>Education</p>
            <div style={s.line} />
            <div style={{ maxWidth: '500px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} style={s.eduItem}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '18px', fontWeight: 400, color: '#111', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '13px', color: '#888', margin: '0 0 2px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{edu.field} &middot; {edu.startYear}–{edu.endYear}{edu.grade ? ` &middot; ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionBorder}>
          <div style={s.inner}>
            <p style={s.smallText}>Achievements</p>
            <div style={s.line} />
            <div style={{ maxWidth: '500px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} style={s.achievementItem}>
                  <p style={{ fontSize: '15px', fontWeight: 400, color: '#111', margin: '0 0 2px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <p style={s.smallText}>Interests</p>
            <div style={s.line} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          {userData.email && <p style={{ fontSize: '14px', color: '#777', margin: '0 0 4px' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '14px', color: '#999', margin: '0 0 24px' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" className="minimal-link" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" className="minimal-link" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" className="minimal-link" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
