import { useBuilder } from "@/contexts/BuilderContext";

const CHARCOAL = '#2d3748';
const CREAM = '#faf5eb';
const WARM_BROWN = '#7b5e4a';
const DARK = '#1a202c';

export function ResumeExperience() {
  const { userData, sectionVisibility } = useBuilder();

  const timelineDot: React.CSSProperties = {
    position: 'absolute',
    left: '-10px',
    top: '5px',
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: CHARCOAL,
    border: '3px solid #fff',
    zIndex: 1,
  };

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Source Serif 4', 'Lato', 'Georgia', serif", width: '816px', minHeight: '1056px', background: '#fff', color: DARK, borderLeft: `4px solid ${CHARCOAL}` }}>
      <style>{`@media print{body{color:#1a202c!important}.cream-bg{background:#faf5eb!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.timeline-line{border-color:#d4c5b0!important}}`}</style>

      <header style={{ padding: '38px 44px 16px 40px', borderBottom: '1px solid #e8ddd0' }}>
        <h1 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '32px', fontWeight: 700, color: CHARCOAL, margin: 0, letterSpacing: '-0.01em' }}>{userData.fullName || "Your Name"}</h1>
        <p style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '15px', color: WARM_BROWN, fontWeight: 500, margin: '2px 0 8px' }}>{userData.role || "Your Role"}</p>
        <div style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '11.5px', color: '#6b7280', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {userData.email && <span>{userData.email}</span>}
          {userData.phone && <span>{userData.phone}</span>}
          {userData.links?.linkedin && <span>{userData.links.linkedin}</span>}
          {userData.links?.github && <span>{userData.links.github}</span>}
          {userData.links?.portfolio && <span>{userData.links.portfolio}</span>}
        </div>
      </header>

      <div style={{ padding: '22px 44px 36px 40px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '24px', padding: '16px 20px', background: CREAM, borderRadius: '6px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: WARM_BROWN, margin: '0 0 6px' }}>Summary</h2>
            <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4a5568', margin: 0 }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '26px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 12px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Experience</h2>
            <div style={{ position: 'relative', paddingLeft: '22px' }}>
              <div style={{ position: 'absolute', left: '0', top: '8px', bottom: '8px', width: '2px', background: '#d4c5b0' }} />
              {userData.experience.map((e, i) => (
                <article key={i} style={{ position: 'relative', marginBottom: '18px', paddingLeft: '8px' }}>
                  <div style={timelineDot} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '15px', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{e.role}</h3>
                  </div>
                  <p style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '12px', color: WARM_BROWN, fontWeight: 600, margin: '1px 0 2px' }}>{e.organization}</p>
                  <p style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '11px', color: '#9ca3af', margin: '0 0 4px', fontWeight: 500 }}>{e.duration}</p>
                  <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: '#4a5568', margin: 0 }}>{e.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '24px', padding: '16px 20px', background: CREAM, borderRadius: '6px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: WARM_BROWN, margin: '0 0 10px' }}>Education</h2>
            {userData.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '13px', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '1px 0 0' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                </div>
                <span style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '11px', color: '#9ca3af', whiteSpace: 'nowrap' }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 8px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {userData.skills.map((s, i) => (
                <span key={i} style={{ background: CREAM, color: CHARCOAL, padding: '3px 10px', fontSize: '12px', borderRadius: '4px', fontWeight: 500 }}>{s}</span>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '24px', padding: '16px 20px', background: CREAM, borderRadius: '6px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: WARM_BROWN, margin: '0 0 10px' }}>Projects</h2>
            <div style={{ position: 'relative', paddingLeft: '16px' }}>
              <div style={{ position: 'absolute', left: '0', top: '6px', bottom: '6px', width: '1.5px', background: '#d4c5b0' }} />
              {userData.projects.map((p, i) => (
                <article key={i} style={{ position: 'relative', marginBottom: '12px', paddingLeft: '6px' }}>
                  <div style={{ ...timelineDot, width: '10px', height: '10px', left: '-8px', top: '4px', background: WARM_BROWN, border: '2px solid #fff' }} />
                  <h3 style={{ fontFamily: "'Source Serif 4', 'Georgia', serif", fontSize: '13.5px', fontWeight: 700, color: CHARCOAL, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: '11.5px', color: WARM_BROWN, fontWeight: 500, margin: '1px 0 3px' }}>{p.tools}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.45, color: '#4a5568', margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 8px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Achievements</h2>
            {userData.achievements.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
                <span style={{ color: WARM_BROWN, fontSize: '14px' }}>▸</span>
                <p style={{ fontSize: '12px', color: '#4a5568', margin: 0 }}>{a.title}</p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2 style={{ fontFamily: "'Lato', 'Arial', sans-serif", fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: CHARCOAL, margin: '0 0 6px', padding: '0 0 4px', borderBottom: '2px solid #e8ddd0' }}>Interests</h2>
            <p style={{ fontSize: '12px', color: '#4a5568', margin: 0, lineHeight: 1.6 }}>{userData.hobbies.join('  ·  ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
