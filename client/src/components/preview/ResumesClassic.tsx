import { useBuilder } from "@/contexts/BuilderContext";

const GOLD = '#c9a84c';
const GOLD_LIGHT = '#f5edd6';
const DARK = '#1e1e1e';
const BODY = '#3c3c3c';

export function ResumeClassic() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Merriweather', 'Georgia', 'Times New Roman', serif", width: '816px', minHeight: '1056px', background: '#fff', color: BODY, lineHeight: 1.6 }}>
      <style>{`@media print{body{color:#3c3c3c!important}.gold-color{color:#c9a84c!important}.gold-border{border-color:#c9a84c!important}}`}</style>
      <div style={{ borderTop: `4px solid ${GOLD}` }}>
        <header style={{ padding: '44px 52px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '30px', fontWeight: 700, color: DARK, margin: '0 0 2px', letterSpacing: '0.01em' }}>{userData.fullName || "Your Name"}</h1>
          <div style={{ width: '48px', height: '2px', background: GOLD, margin: '8px auto' }} />
          <p style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '15px', color: GOLD, fontWeight: 600, margin: '0 0 12px', fontStyle: 'italic' }}>{userData.role || "Your Role"}</p>
          <div style={{ fontSize: '11.5px', color: '#6b7280', display: 'flex', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {[userData.email, userData.phone, userData.links?.linkedin, userData.links?.github].filter(Boolean).map((item, i, arr) => (
              <span key={i}>{item}{i < arr.length - 1 ? <span style={{ margin: '0 6px', color: GOLD }}>•</span> : null}</span>
            ))}
          </div>
        </header>

        <div style={{ padding: '0 52px 40px' }}>
          {sectionVisibility.summary && userData.summary && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Professional Summary</h2>
              <p style={{ fontSize: '12.5px', lineHeight: 1.65, color: BODY, margin: 0 }}>{userData.summary}</p>
            </section>
          )}

          {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 10px' }}>Experience</h2>
              {userData.experience.map((e, i) => (
                <article key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '13.5px', fontWeight: 700, color: DARK, margin: 0 }}>{e.role}</h3>
                    <span style={{ fontSize: '11px', color: '#9ca3af', fontFamily: "'Lato', 'Arial', sans-serif" }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: GOLD, fontWeight: 600, margin: '1px 0 4px' }}>{e.organization}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.55, color: BODY, margin: 0 }}>{e.description}</p>
                </article>
              ))}
            </section>
          )}

          {sectionVisibility.education && userData.education && userData.education.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 10px' }}>Education</h2>
              {userData.education.map((e, i) => (
                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '12.5px', fontWeight: 700, color: DARK, margin: 0 }}>{e.degree} in {e.field}</h3>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '1px 0 0' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap', fontFamily: "'Lato', 'Arial', sans-serif" }}>{e.startYear} – {e.endYear}</span>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Skills</h2>
              <p style={{ fontSize: '12.5px', lineHeight: 1.7, color: BODY, margin: 0 }}>{userData.skills.join('  •  ')}</p>
            </section>
          )}

          {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
            <section style={{ marginBottom: '22px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 10px' }}>Projects</h2>
              {userData.projects.map((p, i) => (
                <article key={i} style={{ marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: '0 0 2px' }}>{p.title}</h3>
                  <p style={{ fontSize: '11.5px', color: GOLD, fontWeight: 500, margin: '0 0 3px' }}>{p.tools}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: BODY, margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </section>
          )}

          {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
            <section style={{ marginBottom: '20px', paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Achievements</h2>
              {userData.achievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '3px' }}>
                  <span style={{ color: GOLD, fontSize: '14px' }}>✦</span>
                  <p style={{ fontSize: '12px', color: BODY, margin: 0, lineHeight: 1.5 }}>{a.title}</p>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
            <section style={{ paddingLeft: '14px', borderLeft: `3px solid ${GOLD}` }}>
              <h2 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '17px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Interests</h2>
              <p style={{ fontSize: '12px', color: BODY, margin: 0, lineHeight: 1.6 }}>{userData.hobbies.join('  •  ')}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
