import { useBuilder } from "@/contexts/BuilderContext";
import { useState, useMemo } from "react";

export function PortfolioGrid() {
  const { userData, sectionVisibility } = useBuilder();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const allSkills = userData.skills || [];
  const allProjects = userData.projects || [];

  const filteredProjects = useMemo(() => {
    if (!activeSkill) return allProjects;
    return allProjects.filter(p =>
      p.tools.toLowerCase().includes(activeSkill.toLowerCase())
    );
  }, [activeSkill, allProjects]);

  const s = {
    root: { fontFamily: "'DM Sans', system-ui, sans-serif", background: '#ffffff', minHeight: '100vh', color: '#0f172a' },
    inner: { maxWidth: '1100px', margin: '0 auto', width: '100%' },
    section: { padding: '80px 24px' } as React.CSSProperties,
    sectionAlt: { padding: '80px 24px', background: '#f8faff' } as React.CSSProperties,
    hero: { padding: '100px 24px 60px', background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', textAlign: 'center' as const, position: 'relative' as const, overflow: 'hidden' },
    heroBg: { position: 'absolute' as const, inset: 0, background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)' },
    heroName: { fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#ffffff', margin: '0 0 6px', letterSpacing: '-1px', position: 'relative' as const, zIndex: 1 },
    heroRole: { fontSize: 'clamp(16px, 2vw, 20px)', color: '#bfdbfe', fontWeight: 500, margin: '0 0 12px', position: 'relative' as const, zIndex: 1 },
    heroTagline: { fontSize: '15px', color: '#93c5fd', lineHeight: 1.6, margin: '0 auto', maxWidth: '560px', position: 'relative' as const, zIndex: 1 },
    profileImg: { width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover' as const, margin: '0 auto 16px', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 32px rgba(37,99,235,0.3)', position: 'relative' as const, zIndex: 1 },
    heading: { fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 20px', letterSpacing: '-0.3px' },
    headingAccent: { display: 'inlineBlock', width: '36px', height: '4px', background: '#2563eb', borderRadius: '2px', marginBottom: '14px' },
    tag: { padding: '6px 14px', background: '#e0efff', color: '#2563eb', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' as const, transition: 'all 0.15s', border: `2px solid transparent` },
    tagActive: { padding: '6px 14px', background: '#2563eb', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' as const, transition: 'all 0.15s', border: '2px solid #2563eb' },
    projectCard: { background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)', border: '1px solid #eef2f6', transition: 'transform 0.2s, box-shadow 0.2s', breakInside: 'avoid' as any, marginBottom: '20px' },
    timelineLine: { position: 'absolute' as const, left: '8px', top: '4px', bottom: '4px', width: '2px', background: '#dbeafe' },
    timelineDot: { width: '18px', height: '18px', borderRadius: '50%', background: '#2563eb', border: '4px solid #dbeafe', flexShrink: 0 },
    eduCard: { padding: '20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #eef2f6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
    contact: { padding: '60px 24px', background: '#0f172a', color: '#ffffff', textAlign: 'center' as const },
    footerLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s' } as React.CSSProperties,
    toolTag: { fontSize: '11px', padding: '2px 8px', background: '#eff6ff', color: '#2563eb', borderRadius: '4px', fontWeight: 500 },
    achievementItem: { padding: '14px 18px', background: '#f8faff', borderRadius: '8px', borderLeft: '3px solid #2563eb' },
    hobbyTag: { padding: '6px 16px', background: '#eff6ff', color: '#2563eb', borderRadius: '16px', fontSize: '12px', fontWeight: 500 },
    experienceItem: { padding: '20px', background: '#ffffff', borderRadius: '10px', border: '1px solid #eef2f6', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
  };

  return (
    <div id="portfolio-preview-content" style={s.root}>
      <style>{`
        html { scroll-behavior: smooth; }
        @media print {
          body { background: #fff !important; }
          #portfolio-preview-content { padding: 0 !important; }
          section { page-break-inside: avoid; }
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .metro-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .metro-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px -8px rgba(37,99,235,0.12); }
        .metro-tag:hover { background: #2563eb !important; color: #fff !important; }
        .project-grid { columns: 2; column-gap: 20px; }
        @media (max-width: 768px) { .project-grid { columns: 1; } }
        a { transition: color 0.2s; }
        footer a:hover { color: #60a5fa !important; }
      `}</style>

      <section style={s.hero}>
        <div style={s.heroBg} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1, animation: 'fadeInUp 0.6s ease' }}>
          {userData.profileImage && (
            <img src={userData.profileImage} alt={userData.fullName} style={s.profileImg} />
          )}
          <h1 style={s.heroName}>{userData.fullName || 'Your Name'}</h1>
          <p style={s.heroRole}>{userData.role || 'Your Role'}</p>
          {userData.portfolioHero && <p style={s.heroTagline}>{userData.portfolioHero}</p>}
        </div>
      </section>

      {sectionVisibility?.summary !== false && userData.summary && (
        <section id="about" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>About</h2>
            <div style={{ maxWidth: '800px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#475569', margin: 0 }}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.skills !== false && allSkills.length > 0 && (
        <section id="skills" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: activeSkill ? '12px' : 0 }}>
              {allSkills.map((skill, i) => (
                <span
                  key={i}
                  className="metro-tag"
                  style={activeSkill === skill ? s.tagActive : s.tag}
                  onClick={() => setActiveSkill(activeSkill === skill ? null : skill)}
                >
                  {skill}
                </span>
              ))}
            </div>
            {activeSkill && (
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Showing projects using <strong style={{ color: '#2563eb' }}>{activeSkill}</strong> — <span style={{ cursor: 'pointer', color: '#2563eb', textDecoration: 'underline' }} onClick={() => setActiveSkill(null)}>Clear filter</span>
              </p>
            )}
          </div>
        </section>
      )}

      {sectionVisibility?.projects !== false && filteredProjects.length > 0 && (
        <section id="projects" style={s.section}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Projects</h2>
            <div className="project-grid">
              {filteredProjects.map((proj, i) => (
                <article key={i} className="metro-card" style={s.projectCard}>
                  {proj.images && proj.images[0] && (
                    <img src={proj.images[0]} alt={proj.title} style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                  )}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{proj.title}</h3>
                    {proj.tools && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                        {proj.tools.split(',').map((t, ti) => (
                          <span key={ti} style={s.toolTag}>{t.trim()}</span>
                        ))}
                      </div>
                    )}
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6, margin: 0 }}>{proj.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {sectionVisibility?.experience !== false && userData.experience && userData.experience.length > 0 && (
        <section id="experience" style={s.sectionAlt}>
          <div style={s.inner}>
            <div style={s.headingAccent} />
            <h2 style={s.heading}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '36px' }}>
              <div style={s.timelineLine} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {userData.experience.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flexStart' }}>
                    <div style={s.timelineDot} />
                    <div style={s.experienceItem}>
                      <div style={{ display: 'flex', justifyContent: 'spaceBetween', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0f172a', margin: '0 0 2px' }}>{exp.role}</h3>
                        <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 500 }}>{exp.duration}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, margin: '0 0 8px' }}>{exp.organization}</p>
                      <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                  <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: 600, margin: '0 0 2px' }}>{edu.institution}</p>
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {userData.achievements.map((a, i) => (
                <div key={i} style={s.achievementItem}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', margin: '0 0 2px' }}>{a.title}</p>
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
            <h2 style={s.heading}>Interests</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.hobbies.map((h, i) => (
                <span key={i} style={s.hobbyTag}>{h}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer style={s.contact}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 4px' }}>Let's Connect</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', margin: '0 0 20px' }}>Available for opportunities</p>
          {userData.email && <p style={{ fontSize: '15px', margin: '0 0 4px', color: '#93c5fd' }}>{userData.email}</p>}
          {userData.phone && <p style={{ fontSize: '15px', margin: '0 0 4px', color: '#94a3b8' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} target="_blank" rel="noopener noreferrer" style={s.footerLink}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} target="_blank" rel="noopener noreferrer" style={s.footerLink}>LinkedIn</a>}
            {userData.links?.portfolio && <a href={userData.links.portfolio} target="_blank" rel="noopener noreferrer" style={s.footerLink}>Website</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
