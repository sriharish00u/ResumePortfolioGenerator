import { useBuilder } from "@/contexts/BuilderContext";

const PURPLE_1 = '#7c3aed';
const PURPLE_2 = '#a855f7';
const DARK = '#1e1b4b';

export function ResumeCreative() {
  const { userData, sectionVisibility } = useBuilder();

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Nunito', 'system-ui', sans-serif", width: '816px', minHeight: '1056px', background: '#fff', color: '#374151' }}>
      <style>{`@media print{.gradient-header{background:linear-gradient(135deg,#7c3aed,#a855f7)!important;color:#fff!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}.card-bg{background:#faf5ff!important}.accent-dot{color:#7c3aed!important}}`}</style>

      <header className="gradient-header" style={{ background: `linear-gradient(135deg, ${PURPLE_1}, ${PURPLE_2})`, padding: '34px 44px 28px', textAlign: 'center', color: '#fff' }}>
        {userData.profileImage && (
          <img src={userData.profileImage} alt={userData.fullName} style={{ width: '82px', height: '82px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.4)', marginBottom: '6px' }} />
        )}
        <h1 style={{ fontSize: '30px', fontWeight: 800, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>{userData.fullName || "Your Name"}</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, margin: '2px 0 10px' }}>{userData.role || "Your Role"}</p>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {[userData.email, userData.phone, userData.links?.linkedin, userData.links?.github, userData.links?.portfolio].filter(Boolean).map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>{item}</span>
          ))}
        </div>
      </header>

      {sectionVisibility.summary && userData.summary && (
        <div style={{ padding: '22px 44px 6px' }}>
          <section style={{ background: '#faf5ff', borderRadius: '12px', padding: '16px 20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: DARK, margin: '0 0 4px' }}>About Me</h2>
            <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#4b5563', margin: 0 }}>{userData.summary}</p>
          </section>
        </div>
      )}

      <div style={{ padding: '16px 44px 32px', display: 'flex', gap: '28px' }}>
        <div style={{ flex: 1 }}>
          {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {userData.skills.map((s, i) => (
                  <span key={i} style={{ background: '#ede9fe', color: PURPLE_1, borderRadius: '9999px', padding: '3px 12px', fontSize: '12px', fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </section>
          )}

          {sectionVisibility.education && userData.education && userData.education.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Education</h2>
              {userData.education.map((e, i) => (
                <div key={i} style={{ marginBottom: '8px', padding: '12px 14px', background: '#faf5ff', borderRadius: '10px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '1px 0 2px' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                  <span style={{ fontSize: '11px', color: PURPLE_1, fontWeight: 600 }}>{e.startYear} – {e.endYear}</span>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Achievements</h2>
              {userData.achievements.map((a, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: PURPLE_2, display: 'inline-block', flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>{a.title}</p>
                </div>
              ))}
            </section>
          )}

          {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
            <section>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 6px' }}>Interests</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {userData.hobbies.map((h, i) => (
                  <span key={i} style={{ background: '#fef3c7', color: '#92400e', borderRadius: '8px', padding: '2px 10px', fontSize: '11.5px', fontWeight: 500 }}>{h}</span>
                ))}
              </div>
            </section>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
            <section style={{ marginBottom: '22px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Experience</h2>
              {userData.experience.map((e, i) => (
                <article key={i} style={{ marginBottom: '10px', padding: '12px 14px', background: '#faf5ff', borderRadius: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0 }}>{e.role}</h3>
                    <span style={{ fontSize: '11px', color: PURPLE_1, fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: PURPLE_2, fontWeight: 500, margin: '1px 0 3px' }}>{e.organization}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#4b5563', margin: 0 }}>{e.description}</p>
                </article>
              ))}
            </section>
          )}

          {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK, margin: '0 0 8px' }}>Projects</h2>
              {userData.projects.map((p, i) => (
                <article key={i} style={{ marginBottom: '10px', padding: '12px 14px', background: '#f0fdf4', borderRadius: '10px', border: '1px solid #bbf7d0' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: DARK, margin: 0 }}>{p.title}</h3>
                  <p style={{ fontSize: '11px', color: '#16a34a', fontWeight: 500, margin: '1px 0 3px' }}>{p.tools}</p>
                  <p style={{ fontSize: '12px', lineHeight: 1.45, color: '#4b5563', margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
