import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeExecutive() {
  const { userData, sectionVisibility } = useBuilder();

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  const sectionTitle = (title: string) => ({
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '15px',
    fontWeight: 700,
    color: '#0f141e',
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
    margin: '0 0 12px',
  });

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Lato', 'Inter', Verdana, sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#ffffff',
        color: '#1e293b',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <header
        style={{
          background: '#0f141e',
          color: '#ffffff',
          padding: '44px 52px 36px',
        }}
      >
        <h1
          style={{
            fontFamily: "'Merriweather', Georgia, 'Times New Roman', serif",
            fontSize: '44px',
            fontWeight: 700,
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          {userData.fullName || 'Your Name'}
        </h1>
        <div
          style={{
            borderBottom: '2px solid #d4a843',
            width: '64px',
            marginTop: '14px',
          }}
        />
        <p
          style={{
            fontSize: '17px',
            color: '#94a3b8',
            marginTop: '12px',
            marginBottom: 0,
            fontWeight: 300,
          }}
        >
          {userData.role || 'Your Role'}
        </p>
        {contactItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '6px',
              fontSize: '12px',
              color: '#cbd5e1',
              marginTop: '18px',
              flexWrap: 'wrap',
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < contactItems.length - 1 && (
                  <span style={{ color: '#d4a843', margin: '0 8px' }}>|</span>
                )}
              </span>
            ))}
          </div>
        )}
      </header>

      <div style={{ padding: '32px 52px 44px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('IMPACT SUMMARY')}>IMPACT SUMMARY</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#475569', margin: 0 }}>
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('IMPACT DRIVEN EXPERIENCE')}>IMPACT DRIVEN EXPERIENCE</h2>
            {userData.experience.map((e, i) => (
              <div key={i} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0f141e', margin: 0 }}>
                    {e.role}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#64748b' }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 4px', fontWeight: 500 }}>
                  {e.organization}
                </p>
                <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#475569', margin: 0 }}>
                  {e.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('STRATEGIC SKILL SET')}>STRATEGIC SKILL SET</h2>
            <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.7 }}>
              {userData.skills.join('  \u00b7  ')}
            </p>
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('STRATEGIC PROJECTS')}>STRATEGIC PROJECTS</h2>
            {userData.projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f141e', margin: 0 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '12px', color: '#d4a843', margin: '1px 0 4px', fontWeight: 600 }}>
                  {p.tools}
                </p>
                <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('ACADEMIC EXCELLENCE')}>ACADEMIC EXCELLENCE</h2>
            {userData.education.map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0f141e', margin: 0 }}>
                    {e.degree} in {e.field}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: 0 }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: '11.5px', color: '#64748b', whiteSpace: 'nowrap' }}>
                  {e.startYear} – {e.endYear}
                </span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2 style={sectionTitle('CERTIFICATIONS & ACHIEVEMENTS')}>CERTIFICATIONS & ACHIEVEMENTS</h2>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', fontSize: '12.5px', color: '#475569', lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i} style={{ position: 'relative', paddingLeft: '20px', marginBottom: '4px' }}>
                  <span style={{ position: 'absolute', left: 0, top: '5px', width: '7px', height: '7px', borderRadius: '50%', background: '#d4a843' }} />
                  {a.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2 style={sectionTitle('INTERESTS & LEADERSHIP')}>INTERESTS & LEADERSHIP</h2>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0 }}>
              {userData.hobbies.join('  \u00b7  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
