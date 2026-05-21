import { useBuilder } from "@/contexts/BuilderContext";

export function ResumeElegant() {
  const { userData, sectionVisibility } = useBuilder();

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.linkedin,
    userData.links?.github,
  ].filter(Boolean);

  const sectionHeading = (title: string) => (
    <div style={{ marginBottom: '14px' }}>
      <h2
        style={{
          fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
          fontSize: '18px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#5c3d0e',
          margin: '0 0 4px',
          textAlign: 'center',
        }}
      >
        {title}
      </h2>
      <div
        style={{
          width: '50px',
          borderBottom: '1px solid #b8860b',
          margin: '0 auto',
        }}
      />
    </div>
  );

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'Lato', 'Inter', system-ui, sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#fdf8f0',
        color: '#3d3d3a',
        fontSize: '13px',
        lineHeight: 1.55,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <div style={{ padding: '48px 56px 40px' }}>
        <header style={{ textAlign: 'center', marginBottom: '36px' }}>
          {userData.profileImage && (
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 18px',
                border: '2px solid #b8860b',
                padding: '3px',
              }}
            >
              <img
                src={userData.profileImage}
                alt={userData.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </div>
          )}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
              fontSize: '44px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#2d2d28',
              margin: 0,
              letterSpacing: '-0.3px',
            }}
          >
            {userData.fullName || 'Your Name'}
          </h1>
          <p
            style={{
              fontSize: '12px',
              fontVariant: 'small-caps',
              color: '#b8860b',
              letterSpacing: '0.18em',
              marginTop: '6px',
              marginBottom: 0,
              fontWeight: 500,
            }}
          >
            {userData.role || 'Your Role'}
          </p>
          {contactItems.length > 0 && (
            <div
              style={{
                fontSize: '12px',
                color: '#6b6863',
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'center',
                gap: '14px',
                flexWrap: 'wrap',
              }}
            >
              {contactItems.map((item, i) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          )}
        </header>

        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Professional Summary')}
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#5a5853',
                margin: 0,
                textAlign: 'center',
                maxWidth: '620px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.skills && userData.skills && userData.skills.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Technical Skills')}
            <p
              style={{
                fontSize: '13px',
                color: '#5a5853',
                margin: 0,
                lineHeight: 1.7,
                textAlign: 'center',
              }}
            >
              {userData.skills.join('  \u2022  ')}
            </p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Work Experience')}
            {userData.experience.map((e, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '16px',
                  padding: '16px 20px',
                  background: '#ffffff',
                  border: '1px solid #e8e4da',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2d2d28',
                      margin: 0,
                    }}
                  >
                    {e.role}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#b8860b', fontStyle: 'italic' }}>
                    {e.duration}
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: '#b8860b', fontWeight: 500, margin: '2px 0 0' }}>
                  {e.organization}
                </p>
                <p style={{ fontSize: '12.5px', color: '#5a5853', marginTop: '6px', marginBottom: 0, lineHeight: 1.55 }}>
                  {e.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Projects')}
            {userData.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '14px',
                  padding: '14px 18px',
                  background: '#ffffff',
                  border: '1px solid #e8e4da',
                  borderRadius: '2px',
                }}
              >
                {p.images && p.images[0] && (
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      flexShrink: 0,
                      overflow: 'hidden',
                      borderRadius: '2px',
                    }}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#2d2d28',
                      margin: '0 0 2px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '11.5px', color: '#b8860b', fontStyle: 'italic', margin: '0 0 4px' }}>
                    {p.tools}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#5a5853', margin: 0, lineHeight: 1.55 }}>
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Education')}
            {userData.education.map((e, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 18px',
                  background: '#ffffff',
                  border: '1px solid #e8e4da',
                  borderRadius: '2px',
                  marginBottom: '8px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#2d2d28',
                      margin: 0,
                    }}
                  >
                    {e.degree} in {e.field}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#5a5853', margin: '2px 0 0' }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </div>
                <span style={{ fontSize: '11px', color: '#b8860b', fontStyle: 'italic', whiteSpace: 'nowrap' }}>
                  {e.startYear} – {e.endYear}
                </span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            {sectionHeading('Certifications & Achievements')}
            <ul
              style={{
                margin: 0,
                paddingLeft: '24px',
                fontSize: '12.5px',
                color: '#5a5853',
                lineHeight: 1.7,
              }}
            >
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            {sectionHeading('Interests')}
            <p
              style={{
                fontSize: '12.5px',
                color: '#5a5853',
                margin: 0,
                textAlign: 'center',
              }}
            >
              {userData.hobbies.join('  \u2022  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
