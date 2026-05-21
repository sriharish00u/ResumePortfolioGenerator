import { useBuilder } from "@/contexts/BuilderContext";

export function PortfolioSimple() {
  const { userData, sectionVisibility } = useBuilder();

  const s = {
    root: { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh', color: '#0f172a' },
    nav: { position: 'sticky', top: 0, zIndex: 50, background: 'rgba(248,250,252,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e2e8f0', padding: '0 24px' } as React.CSSProperties,
    navInner: { maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' } as React.CSSProperties,
    navName: { fontWeight: 700, fontSize: '18px', color: '#0d9488', letterSpacing: '-0.3px' },
    navLinks: { display: 'flex', gap: '24px', fontSize: '13px', fontWeight: 500 },
    navLink: { color: '#475569', textDecoration: 'none', transition: 'color 0.2s' } as React.CSSProperties,
    section: { padding: '80px 24px' },
    sectionAlt: { padding: '80px 24px', background: '#ffffff' },
    inner: { maxWidth: '1000px', margin: '0 auto', width: '100%' },
    hero: { padding: '120px 24px 80px', background: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)', textAlign: 'center' as const },
    heroName: { fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 800, color: '#0f172a', margin: '0 0 8px', letterSpacing: '-1.5px', lineHeight: 1.1 },
    heroRole: { fontSize: 'clamp(18px, 2.5vw, 24px)', color: '#0d9488', fontWeight: 600, margin: '0 0 16px' },
    heroTagline: { fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: '0 auto', maxWidth: '560px' },
    card: { background: '#ffffff', borderRadius: '16px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9' },
    heading: { fontSize: '24px', fontWeight: 700, color: '#0f172a', margin: '0 0 24px', letterSpacing: '-0.5px' },
    headingAccent: { display: 'inlineBlock', width: '40px', height: '3px', background: '#0d9488', borderRadius: '2px', marginBottom: '16px' },
    tag: { padding: '6px 16px', background: '#f0fdfa', color: '#0d9488', borderRadius: '8px', fontSize: '13px', fontWeight: 600, border: '1px solid #ccfbf1' },
    projectCard: { background: '#ffffff', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #0d9488', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } as React.CSSProperties,
    timelineDot: { width: '12px', height: '12px', borderRadius: '50%', background: '#0d9488', flexShrink: 0, marginTop: '4px' },
    contact: { padding: '80px 24px', background: '#0f172a', color: '#f8fafc', textAlign: 'center' as const },
    footerLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' } as React.CSSProperties,
    achievementItem: { padding: '16px 20px', background: '#f8fafc', borderRadius: '10px', borderLeft: '3px solid #0d9488' },
    hobbyTag: { padding: '8px 18px', background: '#ffffff', color: '#0d9488', borderRadius: '20px', fontSize: '13px', fontWeight: 500, border: '1.5px solid #ccfbf1' },
    eduCard: { background: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', border: '1px solid #f1f5f9' },
    experienceCard: { background: '#ffffff', borderRadius: '12px', padding: '24px', borderLeft: '4px solid #0d9488', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' } as React.CSSProperties,
    profileImg: { width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 20px', border: '4px solid #ccfbf1', boxShadow: '0 4px 20px rgba(13,148,136,0.15)' },
  };

  const navItems = [
    ...(sectionVisibility?.summary !== false && userData.summary ? [{ key: 'about', label: 'About' }] : []),
    ...(sectionVisibility?.skills !== false && userData.skills?.length ? [{ key: 'skills', label: 'Skills' }] : []),
    ...(sectionVisibility?.experience !== false && userData.experience?.length ? [{ key: 'experience', label: 'Experience' }] : []),
    ...(sectionVisibility?.projects !== false && userData.projects?.length ? [{ key: 'projects', label: 'Projects' }] : []),
    ...(sectionVisibility?.education !== false && userData.education?.length ? [{ key: 'education', label: 'Education' }] : []),
  ];

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          nav { display: none !important; }
          #portfolio-preview-content { padding: 0 !important; }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .coastal-fade { animation: fadeInUp 0.6s ease forwards; opacity: 0; }
        .coastal-fade:nth-child(2) { animation-delay: 0.1s; }
        .coastal-fade:nth-child(3) { animation-delay: 0.2s; }
        .coastal-fade:nth-child(4) { animation-delay: 0.3s; }
        a { transition: color 0.2s; }
        nav a:hover { color: #0d9488 !important; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>

      <nav style={s.nav}>
        <div style={s.navInner}>
          <span style={s.navName}>{userData.fullName || 'Portfolio'}</span>
          <div className="nav-links" style={s.navLinks}>
            {navItems.map(item => (
              <a key={item.key} href={`#${item.key}`} style={s.navLink}>{item.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <section style={s.hero}>
        <div style={{ maxWidth: '700px', margin: '0 auto', animation: 'fadeInUp 0.6s ease' }}>
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
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <div style={s.card}>
              <div style={s.headingAccent} />
              <h2 style={s.heading}>About</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && userData.skills && userData.skills.length > 0 && (
        <section id="skills" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
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
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userData.experience.map((exp, i) => (
                <div key={i} style={s.experienceCard}>
                  <div style={{ display: 'flex', alignItems: 'flexStart', gap: '12px' }}>
                    <div style={s.timelineDot} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{exp.role}</h3>
                        <span style={{ fontSize: '12px', color: '#0d9488', fontWeight: 500 }}>{exp.duration}</span>
                      </div>
                      <p style={{ fontSize: '14px', color: '#0d9488', fontWeight: 600, margin: '0 0 8px' }}>{exp.organization}</p>
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && userData.projects && userData.projects.length > 0 && (
        <section id="projects" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Projects</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {userData.projects.map((proj, i) => (
                <div key={i} style={s.projectCard}>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {proj.images && proj.images[0] && (
                      <img src={proj.images[0]} alt={proj.title} style={{ width: '180px', height: '120px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{proj.title}</h3>
                      {proj.tools && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                          {proj.tools.split(',').map((t, ti) => (
                            <span key={ti} style={{ fontSize: '11px', padding: '2px 10px', background: '#f0fdfa', color: '#0d9488', borderRadius: '4px', fontWeight: 500 }}>{t.trim()}</span>
                          ))}
                        </div>
                      )}
                      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.education !== false && userData.education && userData.education.length > 0 && (
        <section id="education" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Education</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {userData.education.map((edu, i) => (
                <div key={i} style={s.eduCard}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{edu.degree}</h3>
                  <p style={{ fontSize: '14px', color: '#0d9488', fontWeight: 600, margin: '0 0 4px' }}>{edu.institution}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 2px' }}>{edu.field}</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{edu.startYear} – {edu.endYear}{edu.grade ? ` | ${edu.grade}` : ''}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.achievements !== false && userData.achievements && userData.achievements.length > 0 && (
        <section id="achievements" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Achievements</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} style={s.achievementItem}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: '0 0 4px' }}>{a.title}</p>
                  {a.description && <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{a.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.hobbies !== false && userData.hobbies && userData.hobbies.length > 0 && (
        <section id="hobbies" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Interests & Hobbies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#f8fafc', margin: '0 0 8px' }}>Get in Touch</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 24px', lineHeight: 1.6 }}>Let's create something together</p>
          {userData.email && <p style={{ fontSize: '16px', margin: '0 0 6px', color: '#5eead4' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '16px', margin: '0 0 6px', color: '#94a3b8' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={s.footerLink}>Portfolio</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
