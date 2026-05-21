import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioDark() {
  const { userData, sectionVisibility } = useBuilder();

  const glow = '#8b5cf6';
  const glowRgb = '139, 92, 246';
  const bg = '#0a0a0a';
  const surface = '#111111';
  const border = '#1a1a1a';
  const textMuted = '#888888';

  const glowShadow = `0 0 40px rgba(${glowRgb},0.3), 0 0 80px rgba(${glowRgb},0.15), 0 0 120px rgba(${glowRgb},0.05)`;

  const s = {
    root: { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: bg, color: '#f1f1f1', minHeight: '100vh', position: 'relative' as const, overflowX: 'hidden' as const },
    inner: { maxWidth: '960px', margin: '0 auto', width: '100%' },
    section: { padding: '100px 24px', position: 'relative' as const } as React.CSSProperties,
    sectionBorder: { borderTop: `1px solid ${border}` },
    hero: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' as const, overflow: 'hidden', padding: '48px 24px' },
    heroGlow: { position: 'absolute' as const, width: '500px', height: '500px', borderRadius: '50%', background: `radial-gradient(circle, rgba(${glowRgb},0.1) 0%, transparent 70%)`, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' as const },
    heroName: { fontSize: 'clamp(44px, 7vw, 72px)', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-1.5px', textShadow: `0 0 40px rgba(${glowRgb},0.4), 0 0 80px rgba(${glowRgb},0.2)` },
    heroRole: { fontSize: 'clamp(18px, 2.5vw, 24px)', color: textMuted, fontWeight: 500, margin: '0 0 16px' },
    heroTagline: { fontSize: '15px', color: '#666', lineHeight: 1.6, margin: '0 auto', maxWidth: '500px' },
    profileImg: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 24px', border: `3px solid ${glow}44`, boxShadow: `0 0 30px rgba(${glowRgb},0.2)` },
    heading: { fontSize: '14px', fontWeight: 700, color: glow, margin: '0 0 24px', textTransform: 'uppercase' as const, letterSpacing: '3px' },
    headingBar: { width: '40px', height: '2px', background: glow, marginBottom: '20px', boxShadow: `0 0 10px rgba(${glowRgb},0.3)` },
    badge: { padding: '8px 20px', background: surface, border: `1px solid ${border}`, borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#ccc', boxShadow: `0 0 15px rgba(${glowRgb},0.05)` },
    badgeGlow: { padding: '8px 20px', background: surface, border: `1px solid ${glow}44`, borderRadius: '8px', fontSize: '13px', fontWeight: 500, color: '#ffffff', boxShadow: `0 0 20px rgba(${glowRgb},0.1), 0 0 0 1px ${glow}22 inset` },
    projectCard: { background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '28px', transition: 'border-color 0.3s, box-shadow 0.3s' } as React.CSSProperties,
    projectTitle: { fontSize: '18px', fontWeight: 700, color: '#f1f1f1', margin: '0 0 6px' },
    toolTag: { fontSize: '11px', padding: '3px 10px', background: `${glow}15`, color: glow, borderRadius: '4px', fontWeight: 500, border: `1px solid ${glow}22` },
    eduCard: { background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '24px', transition: 'border-color 0.3s' } as React.CSSProperties,
    experienceCard: { background: surface, border: `1px solid ${border}`, borderRadius: '12px', padding: '24px', borderLeft: `3px solid ${glow}66` } as React.CSSProperties,
    timelineDot: { width: '14px', height: '14px', borderRadius: '50%', background: glow, boxShadow: `0 0 16px rgba(${glowRgb},0.4)`, flexShrink: 0 },
    timelineLine: { position: 'absolute' as const, left: '6px', top: '4px', bottom: '4px', width: '2px', background: border },
    achievementItem: { padding: '16px 20px', background: surface, border: `1px solid ${border}`, borderRadius: '8px', borderLeft: `3px solid ${glow}66` },
    hobbyTag: { padding: '8px 20px', background: surface, border: `1px solid ${border}`, borderRadius: '20px', fontSize: '13px', fontWeight: 500, color: textMuted },
    contact: { padding: '80px 24px', borderTop: `1px solid ${border}`, textAlign: 'center' as const, background: '#050505' },
    footerLink: { color: textMuted, textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' } as React.CSSProperties,
    starfield: { position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' } as React.CSSProperties,
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; color: #000 !important; }
          #portfolio-preview-content { background: #fff !important; color: #000 !important; }
          .void-star, .void-glow { display: none !important; }
        }
        @keyframes voidPulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes voidDrift { 0% { transform: translateY(0) translateX(0); } 25% { transform: translateY(-20px) translateX(10px); } 50% { transform: translateY(-10px) translateX(-10px); } 75% { transform: translateY(-30px) translateX(5px); } 100% { transform: translateY(0) translateX(0); } }
        @keyframes voidTwinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.8; } }
        @keyframes voidFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .void-star { position: absolute; border-radius: 50%; background: #fff; animation: voidTwinkle var(--duration, 3s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
        .void-card { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .void-card:hover { border-color: ${glow}66 !important; box-shadow: 0 0 30px rgba(${glowRgb},0.08), 0 0 0 1px ${glow}22 inset !important; }
        .void-edu:hover { border-color: ${glow}66 !important; }
        .void-link:hover { color: ${glow} !important; }
      `}</style>

      <div className="void-starfield" style={s.starfield} aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="void-star"
            style={{
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--duration': `${2 + Math.random() * 4}s`,
              '--delay': `${Math.random() * 5}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      <section style={{ ...s.hero, zIndex: 1 }}>
        <div className="void-glow" style={s.heroGlow} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', animation: 'voidFadeIn 1s ease' }}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {(userData.portfolioHero || userData.summary) && (
            <p style={s.heroTagline}>{userData.portfolioHero || userData.summary}</p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>About</h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: textMuted, margin: 0, maxWidth: '700px' }}>{userData.summary}</p>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={{ ...s.section, ...s.sectionBorder, zIndex: 1, background: '#080808' }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} className="void-card" style={i % 3 === 0 ? s.badgeGlow : s.badge}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '32px' }}>
              <div style={s.timelineLine} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {userData.experience.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={s.timelineDot} />
                    <div className="void-card" style={{ flex: 1, ...s.experienceCard }}>
                      <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f1f1f1', margin: '0 0 4px' }}>{exp.role}</h3>
                        <span style={{ fontSize: '12px', color: glow, fontWeight: 500 }}>{exp.duration}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: glow, fontWeight: 600, margin: '0 0 8px' }}>{exp.organization}</p>
                      <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={{ ...s.section, ...s.sectionBorder, zIndex: 1, background: '#080808' }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {userData.projects.map((proj, i) => (
                <article key={i} className="void-card" style={s.projectCard}>
                  {proj.images && proj.images[0] && (
                    <img src={proj.images[0]} alt={proj.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }} />
                  )}
                  <h3 style={s.projectTitle}>{proj.title}</h3>
                  {proj.tools && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                      {proj.tools.split(',').map((t, ti) => (
                        <span key={ti} style={s.toolTag}>{t.trim()}</span>
                      ))}
                    </div>
                  )}
                  <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Education</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} className="void-edu" style={s.eduCard}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f1f1f1', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: glow, fontWeight: 600, margin: '0 0 4px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: textMuted, margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={{ ...s.section, ...s.sectionBorder, zIndex: 1, background: '#080808' }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Achievements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} className="void-card" style={s.achievementItem}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#f1f1f1', margin: '0 0 4px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: textMuted, lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={{ ...s.section, ...s.sectionBorder, zIndex: 1 }}>
          <div style={s.inner}>
            <div style={s.headingBar} />
            <h2 style={s.heading}>Interests</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} className="void-card" style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={{ ...s.contact, zIndex: 1 }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: glow, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '3px' }}>Connect</h2>
          <p style={{ fontSize: '13px', color: textMuted, margin: '0 0 20px' }}>Let's build something</p>
          {userData.email && <p style={{ fontSize: '15px', margin: '0 0 4px', color: '#aaa' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '15px', margin: '0 0 4px', color: textMuted }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" className="void-link" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" className="void-link" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" className="void-link" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
