import { useBuilder } from "@/contexts/BuilderContext";

const coral = '#e85d4f';
const terracotta = '#f4a261';
const cream = '#fff8f0';
const dark = '#2d1b14';

export function PortfolioBrand() {
  const { userData, sectionVisibility } = useBuilder();

  const s = {
    root: { fontFamily: "'Nunito', system-ui, sans-serif", background: cream, minHeight: '100vh', color: dark, overflowX: 'hidden' as const },
    inner: { maxWidth: '960px', margin: '0 auto', width: '100%' },
    section: { padding: '100px 24px' } as React.CSSProperties,
    sectionAlt: { padding: '100px 24px', background: '#ffffff' } as React.CSSProperties,
    hero: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${coral} 0%, ${terracotta} 100%)`, position: 'relative' as const, overflow: 'hidden', padding: '48px 24px' },
    heroOverlay: { position: 'absolute' as const, inset: 0, opacity: 0.08, background: 'radial-gradient(circle at 30% 50%, #fff 0%, transparent 60%), radial-gradient(circle at 70% 50%, #fff 0%, transparent 60%)' },
    heroContent: { position: 'relative' as const, zIndex: 1, textAlign: 'center' as const, maxWidth: '600px', animation: 'brandFadeIn 1s ease' },
    heroName: { fontSize: 'clamp(42px, 7vw, 72px)', fontWeight: 800, color: '#ffffff', margin: '0 0 8px', letterSpacing: '-1px', lineHeight: 1.05 },
    heroRole: { fontSize: 'clamp(18px, 2.5vw, 24px)', color: 'rgba(255,255,255,0.9)', fontWeight: 600, margin: '0 0 12px' },
    heroTagline: { fontSize: '16px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, margin: '0 auto', maxWidth: '480px' },
    profileImg: { width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 24px', border: '5px solid rgba(255,255,255,0.3)', boxShadow: `0 0 0 8px rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.15)` },
    heading: { fontSize: '28px', fontWeight: 800, color: dark, margin: '0 0 8px', letterSpacing: '-0.5px' },
    headingDecorated: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' },
    headingLine: { flex: 1, height: '2px', background: `linear-gradient(90deg, ${coral}, ${terracotta})`, maxWidth: '60px' },
    storyText: { fontSize: '16px', lineHeight: 1.8, color: '#5c4033', margin: 0, maxWidth: '700px', fontStyle: 'italic' } as React.CSSProperties,
    tag: { padding: '8px 20px', background: '#ffffff', color: coral, borderRadius: '24px', fontSize: '14px', fontWeight: 600, border: `2px solid ${coral}22` },
    projectCard: { background: '#ffffff', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(232,93,79,0.08)', border: '1px solid rgba(232,93,79,0.1)', transition: 'transform 0.3s, box-shadow 0.3s' } as React.CSSProperties,
    projectTitle: { fontSize: '20px', fontWeight: 700, color: dark, margin: '0 0 6px' },
    toolTag: { fontSize: '12px', padding: '4px 12px', background: `${coral}11`, color: coral, borderRadius: '12px', fontWeight: 600 },
    eduCard: { padding: '24px', background: '#ffffff', borderRadius: '16px', border: '1px solid rgba(232,93,79,0.08)', boxShadow: '0 2px 12px rgba(232,93,79,0.06)' },
    experienceCard: { padding: '24px', background: '#ffffff', borderRadius: '16px', borderLeft: `4px solid ${coral}`, boxShadow: '0 2px 12px rgba(232,93,79,0.06)' } as React.CSSProperties,
    achievementItem: { padding: '16px 24px', background: '#ffffff', borderRadius: '12px', border: `1px solid rgba(232,93,79,0.1)`, boxShadow: '0 1px 6px rgba(232,93,79,0.04)' },
    hobbyTag: { padding: '10px 24px', background: '#ffffff', color: coral, borderRadius: '24px', fontSize: '14px', fontWeight: 600, border: `2px solid ${coral}22`, boxShadow: '0 2px 8px rgba(232,93,79,0.06)' },
    contact: { padding: '80px 24px', background: dark, color: '#ffffff', textAlign: 'center' as const },
    footerLink: { color: terracotta, textDecoration: 'none', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' } as React.CSSProperties,
    circleDeco: { position: 'absolute', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' } as React.CSSProperties,
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          section { page-break-inside: avoid; }
        }
        @keyframes brandFadeIn { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes heroGlow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes brandShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .brand-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .brand-card:hover { transform: translateY(-8px); box-shadow: 0 20px 48px -12px rgba(232,93,79,0.2); }
        .brand-tag { transition: all 0.2s; }
        .brand-tag:hover { background: ${coral} !important; color: #fff !important; border-color: ${coral} !important; }
        .brand-hobby { transition: all 0.2s; }
        .brand-hobby:hover { background: ${coral} !important; color: #fff !important; }
        footer a:hover { color: #ffffff !important; }
      `}</style>

      <section style={s.hero}>
        <div style={s.heroOverlay} />
        <div style={{ ...s.circleDeco, width: '400px', height: '400px', top: '-100px', right: '-100px', animation: 'float 8s ease-in-out infinite' }} />
        <div style={{ ...s.circleDeco, width: '300px', height: '300px', bottom: '-80px', left: '-80px', animation: 'float 10s ease-in-out infinite reverse' }} />
        <div style={s.heroContent}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {userData.portfolioHero && (
            <p style={s.heroTagline}>{userData.portfolioHero}</p>
          )}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>My Story</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={s.storyText}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Work</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.experience.map((exp, i) => (
                <div key={i} className="brand-card" style={s.experienceCard}>
                  <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: dark, margin: 0 }}>{exp.role}</h3>
                    <span style={{ fontSize: '13px', color: coral, fontWeight: 600 }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: '14px', color: coral, fontWeight: 700, margin: '2px 0 8px' }}>{exp.organization}</p>
                  <p style={{ fontSize: '14px', color: '#5c4033', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Projects</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.projects.map((proj, i) => (
                <div key={i} className="brand-card" style={s.projectCard}>
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {proj.images && proj.images[0] && (
                      <img src={proj.images[0]} alt={proj.title} style={{ width: '160px', height: '120px', objectFit: 'cover', borderRadius: '12px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={s.projectTitle}>{proj.title}</h3>
                      {proj.tools && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
                          {proj.tools.split(',').map((t, ti) => (
                            <span key={ti} style={s.toolTag}>{t.trim()}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: '14px', color: '#5c4033', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Expertise</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.skills.map((skill, i) => (
                <span key={i} className="brand-tag" style={s.tag}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Education</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', maxWidth: '700px', margin: '0 auto' }}>
              {userData.education.map((edu, i) => (
                <div key={i} className="brand-card" style={s.eduCard}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: dark, margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: coral, fontWeight: 700, margin: '0 0 4px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: '#5c4033', margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#a08070', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` · ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Achievements</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} className="brand-card" style={s.achievementItem}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: dark, margin: '0 0 4px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#5c4033', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingDecorated}>
              <div style={s.headingLine} />
              <h2 style={s.heading}>Beyond the Code</h2>
              <div style={s.headingLine} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} className="brand-hobby" style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 800, margin: '0 0 6px' }}>Let's Connect</h2>
          <p style={{ fontSize: '15px', color: terracotta, margin: '0 0 24px', opacity: 0.8 }}>I'd love to hear from you</p>
          {userData.email && <p style={{ fontSize: '16px', margin: '0 0 6px', color: terracotta }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '16px', margin: '0 0 6px', color: '#a08070' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '28px', marginTop: '24px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
