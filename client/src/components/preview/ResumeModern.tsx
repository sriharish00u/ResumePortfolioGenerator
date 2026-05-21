import { useBuilder } from "@/contexts/BuilderContext";

const NAVY = '#1a2744';
const SKY = '#7dd3fc';
const DARK_TEXT = '#1e293b';

export function ResumeModern() {
  const { userData, sectionVisibility } = useBuilder();

  const sidebarItem = (label: string, value: string | undefined | null) => (
    value ? <div style={{ marginBottom: '8px' }}>
      <p style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#94a3b8', margin: '0 0 1px' }}>{label}</p>
      <p style={{ fontSize: '12px', color: '#f1f5f9', margin: 0, lineHeight: 1.4 }}>{value}</p>
    </div> : null
  );

  return (
    <div id="resume-preview-content" role="document" style={{ fontFamily: "'DM Sans', 'Lato', 'system-ui', sans-serif", width: '816px', minHeight: '1056px', display: 'flex' }}>
      <style>{`@media print{.sidebar-bg{background:#1a2744!important}.sidebar-text{color:#f1f5f9!important}.accent-sky{color:#7dd3fc!important}}`}</style>

      <aside style={{ width: '30%', background: NAVY, color: '#e2e8f0', padding: '36px 22px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {userData.profileImage && (
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <img src={userData.profileImage} alt={userData.fullName} style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(125, 211, 252, 0.3)' }} />
          </div>
        )}

        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', margin: '0 0 1px', lineHeight: 1.2 }}>{userData.fullName || "Your Name"}</h1>
        <p style={{ fontSize: '13px', color: SKY, fontWeight: 500, margin: '0 0 18px' }}>{userData.role || "Your Role"}</p>

        <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: SKY, borderBottom: '1px solid rgba(125, 211, 252, 0.2)', paddingBottom: '5px', margin: '0 0 8px' }}>Contact</h2>
        {sidebarItem('Email', userData.email)}
        {sidebarItem('Phone', userData.phone)}
        {sidebarItem('LinkedIn', userData.links?.linkedin)}
        {sidebarItem('GitHub', userData.links?.github)}
        {sidebarItem('Portfolio', userData.links?.portfolio)}

        <div style={{ flex: 1 }} />

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <div>
            <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: SKY, borderBottom: '1px solid rgba(125, 211, 252, 0.2)', paddingBottom: '5px', margin: '0 0 8px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {userData.skills.map((s, i) => (
                <span key={i} style={{ background: 'rgba(125, 211, 252, 0.12)', color: '#e0f2fe', borderRadius: '3px', padding: '2px 8px', fontSize: '11px', fontWeight: 400 }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: SKY, borderBottom: '1px solid rgba(125, 211, 252, 0.2)', paddingBottom: '5px', margin: '0 0 8px' }}>Interests</h2>
            <p style={{ fontSize: '11.5px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>{userData.hobbies.join(', ')}</p>
          </div>
        )}
      </aside>

      <main style={{ width: '70%', padding: '36px 32px', background: '#fff' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>About</h2>
            </div>
            <p style={{ fontSize: '12.5px', lineHeight: 1.55, color: '#475569', margin: '6px 0 0' }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Experience</h2>
            </div>
            {userData.experience.map((e, i) => (
              <article key={i} style={{ marginBottom: '14px', padding: '12px 14px', background: '#f8fafc', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ fontSize: '13.5px', fontWeight: 600, color: DARK_TEXT, margin: 0 }}>{e.role}</h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: "'Lato', sans-serif" }}>{e.duration}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, margin: '1px 0 4px' }}>{e.organization}</p>
                <p style={{ fontSize: '12px', lineHeight: 1.5, color: '#475569', margin: 0 }}>{e.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Education</h2>
            </div>
            {userData.education.map((e, i) => (
              <div key={i} style={{ marginBottom: '8px', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '12.5px', fontWeight: 600, color: DARK_TEXT, margin: 0 }}>{e.degree} in {e.field}</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: '1px 0 0' }}>{e.institution}{e.grade ? ` — ${e.grade}` : ''}</p>
                </div>
                <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', fontFamily: "'Lato', sans-serif" }}>{e.startYear} – {e.endYear}</span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Projects</h2>
            </div>
            {userData.projects.map((p, i) => (
              <article key={i} style={{ marginBottom: '10px', padding: '10px 14px', background: '#f8fafc', borderRadius: '6px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: DARK_TEXT, margin: '0 0 1px' }}>{p.title}</h3>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 3px' }}>{p.tools}</p>
                <p style={{ fontSize: '12px', lineHeight: 1.45, color: '#475569', margin: 0 }}>{p.description}</p>
              </article>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span style={{ width: '4px', height: '18px', background: SKY, borderRadius: '2px', display: 'inline-block' }} />
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: DARK_TEXT, margin: 0, letterSpacing: '0.01em' }}>Achievements</h2>
            </div>
            <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '12px', color: '#475569', lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
