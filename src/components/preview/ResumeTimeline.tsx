import { useBuilder } from "@/contexts/BuilderContext";

function TimelineSection({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section style={{ marginBottom: '36px' }}>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          fontSize: '16px',
          fontWeight: 700,
          color: '#1e1b4b',
          margin: '0 0 20px',
          letterSpacing: '0.02em',
          textAlign: 'center',
        }}
      >
        {title}
      </h2>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 'calc(50% - 1.5px)',
            top: 0,
            bottom: 0,
            width: '3px',
            background: 'linear-gradient(to bottom, #4f46e5, #7c3aed)',
            zIndex: 0,
          }}
        />
        {children}
      </div>
    </section>
  );
}

function TimelineItem({ index, children }: { index: number; children: React.ReactNode }) {
  const isLeft = index % 2 === 0;
  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        marginBottom: '28px',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 'calc(50% - 32px)',
          paddingRight: isLeft ? '0' : '32px',
          paddingLeft: isLeft ? '0' : '0',
          order: isLeft ? 0 : 2,
        }}
      >
        {isLeft && children}
      </div>
      <div
        style={{
          width: '64px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '16px',
          order: 1,
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            border: '3px solid #ffffff',
            boxShadow: '0 0 0 2px #4f46e5',
          }}
        />
      </div>
      <div
        style={{
          width: 'calc(50% - 32px)',
          paddingLeft: isLeft ? '32px' : '0',
          paddingRight: isLeft ? '0' : '0',
          order: isLeft ? 2 : 0,
        }}
      >
        {!isLeft && children}
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '10px',
        padding: '16px 18px',
        border: '1px solid #ede9fe',
        boxShadow: '0 2px 8px rgba(79, 70, 229, 0.06)',
      }}
    >
      {children}
    </div>
  );
}

export function ResumeTimeline() {
  const { userData, sectionVisibility } = useBuilder();

  const contactItems = [
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
        fontFamily: "'Lato', 'Inter', system-ui, sans-serif",
        width: '816px',
        minHeight: '1056px',
        background: '#faf9ff',
        color: '#334155',
        fontSize: '13px',
        lineHeight: 1.5,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <header
        style={{
          padding: '40px 48px 28px',
          background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 100%)',
          borderBottom: '1px solid #e0e7ff',
        }}
      >
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            fontSize: '36px',
            fontWeight: 700,
            color: '#1e1b4b',
            margin: 0,
            letterSpacing: '-0.3px',
          }}
        >
          {userData.fullName || 'Your Name'}
        </h1>
        <p
          style={{
            fontSize: '16px',
            color: '#6b7280',
            marginTop: '4px',
            marginBottom: 0,
          }}
        >
          {userData.role || 'Your Role'}
        </p>
        {contactItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '16px',
              fontSize: '12.5px',
              color: '#6b7280',
              marginTop: '12px',
              flexWrap: 'wrap',
            }}
          >
            {contactItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        )}
      </header>

      <div style={{ padding: '28px 44px 40px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                margin: '0 0 10px',
              }}
            >
              Origin Story
            </h2>
            <p
              style={{
                fontSize: '13px',
                lineHeight: 1.6,
                color: '#475569',
                margin: 0,
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
          <section style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                margin: '0 0 10px',
              }}
            >
              Core Competencies
            </h2>
            <p
              style={{
                fontSize: '13px',
                color: '#475569',
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              {userData.skills.join('  \u00b7  ')}
            </p>
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <TimelineSection title="Career Arc">
            {userData.experience.map((e, i) => (
              <TimelineItem key={i} index={i}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>
                      {e.role}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: 600 }}>{e.duration}</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#8b5cf6', fontWeight: 500, margin: '2px 0 4px' }}>
                    {e.organization}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                    {e.description}
                  </p>
                </Card>
              </TimelineItem>
            ))}
          </TimelineSection>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <TimelineSection title="Project Portfolio">
            {userData.projects.map((p, i) => (
              <TimelineItem key={i} index={i}>
                <Card>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: '13.5px', fontWeight: 700, color: '#1e1b4b', margin: '0 0 2px' }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#8b5cf6', fontStyle: 'italic', margin: '0 0 4px' }}>
                    {p.tools}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                    {p.description}
                  </p>
                </Card>
              </TimelineItem>
            ))}
          </TimelineSection>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <TimelineSection title="Education Foundation">
            {userData.education.map((e, i) => (
              <TimelineItem key={i} index={i}>
                <Card>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: '#1e1b4b', margin: 0 }}>
                      {e.degree} in {e.field}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#8b5cf6', whiteSpace: 'nowrap' }}>
                      {e.startYear} – {e.endYear}
                    </span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: '#475569', margin: '4px 0 0' }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </Card>
              </TimelineItem>
            ))}
          </TimelineSection>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '28px' }}>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                textAlign: 'center',
                margin: '0 0 12px',
              }}
            >
              Milestones
            </h2>
            <ul style={{ margin: 0, paddingLeft: '24px', fontSize: '12.5px', color: '#475569', lineHeight: 1.7 }}>
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 700,
                color: '#1e1b4b',
                textAlign: 'center',
                margin: '0 0 8px',
              }}
            >
              Personal Dimension
            </h2>
            <p style={{ fontSize: '12.5px', color: '#475569', margin: 0, textAlign: 'center' }}>
              {userData.hobbies.join('  \u00b7  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
