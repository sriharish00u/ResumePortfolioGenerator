import { useBuilder } from "@/contexts/BuilderContext";

const RED = '#e53e3e';
const DARK = '#171717';
const BODY = '#404040';
const MUTED = '#a3a3a3';

export function ResumeSingleColumn() {
  const { userData, sectionVisibility } = useBuilder();

  const sectionHeading = (title: string) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: RED, flexShrink: 0 }} />
      <h2 style={{ fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif", fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: MUTED, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
    </div>
  );

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif", width: '816px', minHeight: '1056px', background: '#fff', color: BODY }}>
      <style>{`@media print{body{color:#404040!important}.swiss-dot{background:#e53e3e!important;-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}`}</style>
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 20px' }}>
        <header style={{ marginBottom: '32px' }}>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif", fontSize: '32px', fontWeight: 700, color: DARK, margin: '0 0 1px', letterSpacing: '-0.03em' }}>{userData.fullName || "Your Name"}</h1>
          <p style={{ fontSize: '15px', color: MUTED, fontWeight: 500, margin: '0 0 12px', fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif" }}>{userData.role || "Your Role"}</p>
          <div style={{ fontSize: '12px', color: MUTED, display: 'flex', gap: '8px', flexWrap: 'wrap', fontFamily: "'Plus Jakarta Sans', 'system-ui', sans-serif" }}>
            {[userData.email, userData.phone, userData.links?.linkedin, userData.links?.github, userData.links?.portfolio].filter(Boolean).map((item, i, arr) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {item}
                {i < arr.length - 1 && <span style={{ color: RED, opacity: 0.5, marginLeft: '4px' }}>|</span>}
              </span>
            ))}
          </div>
        </header>

        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Summary')}
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: BODY, margin: 0 }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Experience')}
            {userData.experience.map((e, i) => (
              <article key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: DARK, margin: 0 }}>{e.role}</h3>
                  <span style={{ fontSize: '11px', color: MUTED, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.01em' }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: '12px', color: RED, fontWeight: 500, margin: '1px 0 3px' }}>{e.organization}</p>
                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: BODY, margin: 0 }}>{e.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Education')}
            {userData.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 600, color: DARK, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: MUTED, margin: '1px 0 0' }}>{e.institution}{e.grade ? ` – ${e.grade}` : ''}</p>
                </div>
                <span style={{ fontSize: '11px', color: MUTED, whiteSpace: 'nowrap', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Skills')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
              {(userData.skills ?? []).map((s, i) => (
                <span key={i} style={{ fontSize: '12.5px', color: BODY, lineHeight: 1.8 }}>{s}{i < (userData.skills?.length ?? 0) - 1 ? <span style={{ color: RED, opacity: 0.4, marginLeft: '8px' }}>/</span> : ''}</span>
              ))}
            </div>
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            {sectionHeading('Projects')}
            {userData.projects.map((p, i) => (
              <article key={i} style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: DARK, margin: '0 0 1px' }}>{p.title}</h3>
                <p style={{ fontSize: '11.5px', color: MUTED, margin: '0 0 3px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.tools}</p>
                <p style={{ fontSize: '12.5px', lineHeight: 1.5, color: BODY, margin: 0 }}>{p.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {sectionHeading('Achievements')}
            <ul style={{ margin: 0, paddingLeft: '0', listStyle: 'none', fontSize: '12.5px', color: BODY, lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ color: RED, fontSize: '10px' }}>●</span>
                  {a.title}
                </li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            {sectionHeading('Interests')}
            <p style={{ fontSize: '12.5px', color: BODY, margin: 0, lineHeight: 1.6 }}>{userData.hobbies.join('  ·  ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
