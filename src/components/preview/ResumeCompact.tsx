import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeCompact() {
  const { userData, sectionVisibility } = useBuilder();

  const contactParts = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Arial', 'Helvetica', sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#ffffff',
        color: '#000000',
        fontSize: '10.5px',
        lineHeight: 1.3,
      }}
    >
      <style>{`@media print{@page{margin:0;}}`}</style>
      <div style={{ padding: '20px 28px 16px' }}>
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{ fontSize: '16px', fontWeight: 700, margin: 0, textAlign: 'center' }}>
            {userData.fullName || 'Your Name'}
          </h1>
          <p style={{ fontSize: '11px', margin: '0 0 2px', textAlign: 'center' }}>
            {userData.role || 'Your Role'}
          </p>
          {contactParts.length > 0 && (
            <p style={{ margin: 0, textAlign: 'center' }}>
              {contactParts.join(' | ')}
            </p>
          )}
        </div>

        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Summary</h2>
            <p style={{ margin: '1px 0 0' }}>{userData.summary}</p>
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Skills</h2>
            <p style={{ margin: '1px 0 0' }}>{userData.skills.join(' | ')}</p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Experience</h2>
            {userData.experience.map((e, i) => (
              <div key={i} style={{ marginTop: '3px' }}>
                <p style={{ margin: 0 }}>
                  <strong>{e.role}</strong>, {e.organization} | {e.duration}
                </p>
                <p style={{ margin: '1px 0 0' }}>{e.description}</p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Projects</h2>
            {userData.projects.map((p, i) => (
              <div key={i} style={{ marginTop: '3px' }}>
                <p style={{ margin: 0 }}>
                  <strong>{p.title}</strong> | {p.tools}
                </p>
                <p style={{ margin: '1px 0 0' }}>{p.description}</p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Education</h2>
            {userData.education.map((e, i) => (
              <p key={i} style={{ margin: '2px 0 0' }}>
                <strong>{e.degree}</strong> in {e.field}, {e.institution}
                {e.grade ? ` - ${e.grade}` : ''} | {e.startYear} – {e.endYear}
              </p>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '6px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Achievements</h2>
            <p style={{ margin: '1px 0 0' }}>
              {userData.achievements.map(a => a.title).join(' | ')}
            </p>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2 style={{ fontSize: '11px', fontWeight: 700, margin: 0 }}>Interests</h2>
            <p style={{ margin: '1px 0 0' }}>{userData.hobbies.join(', ')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
