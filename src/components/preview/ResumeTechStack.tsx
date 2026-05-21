import { useBuilder } from "@/contexts/BuilderContext";

const frontendKW = ['react', 'vue', 'angular', 'html', 'css', 'tailwind', 'next', 'svelte', 'typescript', 'javascript', 'jquery', 'bootstrap', 'redux', 'webpack', 'vite'];
const backendKW = ['node', 'express', 'django', 'flask', 'fastapi', 'spring', 'rust', 'go', 'graphql', 'rest', 'api', 'python', 'java', 'c#', '.net', 'php', 'laravel', 'ruby', 'rails'];
const databaseKW = ['sql', 'mysql', 'postgres', 'mongodb', 'redis', 'firebase', 'supabase', 'dynamodb', 'couchdb', 'mariadb', 'sqlite', 'prisma', 'orm'];
const devopsKW = ['docker', 'git', 'aws', 'azure', 'ci/cd', 'linux', 'kubernetes', 'gcp', 'jenkins', 'terraform', 'ansible', 'github actions', 'gitlab ci'];

function categorizeSkill(skill: string): string {
  const lower = skill.toLowerCase();
  if (frontendKW.some(k => lower.includes(k))) return 'Frontend';
  if (backendKW.some(k => lower.includes(k))) return 'Backend';
  if (databaseKW.some(k => lower.includes(k))) return 'Database';
  if (devopsKW.some(k => lower.includes(k))) return 'DevOps';
  return 'General';
}

export function ResumeTechStack() {
  const { userData, sectionVisibility } = useBuilder();

  const categorized: Record<string, string[]> = {};
  (userData.skills || []).forEach(s => {
    const cat = categorizeSkill(s);
    if (!categorized[cat]) categorized[cat] = [];
    categorized[cat].push(s);
  });

  const contactItems = [
    userData.email,
    userData.phone,
    userData.links?.github,
    userData.links?.linkedin,
  ].filter(Boolean);

  const commentHead = (text: string) => (
    <h2 style={{ color: '#8b949e', fontSize: '12px', fontWeight: 400, margin: '0 0 10px' }}>
      <span style={{ color: '#3fb950' }}>//</span> {text}
    </h2>
  );

  return (
    <div
      id="resume-preview-content"
      role="document"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        width: '816px',
        minHeight: '1056px',
        background: '#0d1117',
        color: '#c9d1d9',
        fontSize: '12.5px',
        lineHeight: 1.5,
      }}
    >
      <style>{`@media print{@page{margin:0;}*{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}`}</style>
      <header style={{ padding: '36px 44px 28px', borderBottom: '1px solid #21262d' }}>
        <div style={{ color: '#8b949e', fontSize: '13px', marginBottom: '6px' }}>{'{'}</div>
        <div style={{ paddingLeft: '20px' }}>
          <span style={{ color: '#7ee787' }}>"name"</span>
          <span style={{ color: '#8b949e' }}>: </span>
          <span style={{ color: '#ffa657' }}>"{userData.fullName || 'Your Name'}"</span>
        </div>
        <div style={{ paddingLeft: '20px', marginTop: '2px' }}>
          <span style={{ color: '#7ee787' }}>"role"</span>
          <span style={{ color: '#8b949e' }}>: </span>
          <span style={{ color: '#ffa657' }}>"{userData.role || 'Your Role'}"</span>
        </div>
        {contactItems.length > 0 && (
          <div style={{ paddingLeft: '20px', marginTop: '2px' }}>
            <span style={{ color: '#7ee787' }}>"contact"</span>
            <span style={{ color: '#8b949e' }}>: </span>
            <span style={{ color: '#ffa657' }}>"{contactItems.join(' | ')}"</span>
          </div>
        )}
        <div style={{ color: '#8b949e', marginTop: '6px' }}>{'}'}</div>
      </header>

      <div style={{ padding: '28px 44px' }}>
        {sectionVisibility.summary && userData.summary && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Summary')}
            <p style={{ color: '#c9d1d9', margin: 0, lineHeight: 1.6 }}>
              {userData.summary}
            </p>
          </section>
        )}

        {sectionVisibility.skills && Object.keys(categorized).length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Skills')}
            {Object.entries(categorized).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '8px', fontSize: '12px' }}>
                <span style={{ color: '#8b949e' }}>{cat}: </span>
                {skills.map((s, i) => (
                  <span key={i}>
                    <span
                      style={{
                        color: '#c9d1d9',
                        background: '#161b22',
                        padding: '1px 8px',
                        borderRadius: '4px',
                        fontSize: '11.5px',
                        border: '1px solid #30363d',
                      }}
                    >
                      {s}
                    </span>
                    {i < skills.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.experience && userData.experience && userData.experience.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Experience')}
            {userData.experience.map((e, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '14px',
                  padding: '14px 16px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <span style={{ color: '#ffa657', fontWeight: 700 }}>{e.role}</span>
                  <span style={{ color: '#8b949e', fontSize: '11px' }}>{e.duration}</span>
                </div>
                <p style={{ color: '#7ee787', margin: '0 0 4px', fontSize: '12px' }}>
                  {e.organization}
                </p>
                <p style={{ color: '#c9d1d9', margin: 0, lineHeight: 1.5, fontSize: '12px' }}>
                  {e.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.projects && userData.projects && userData.projects.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Projects')}
            {userData.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '14px',
                  padding: '14px 16px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                }}
              >
                <h3 style={{ color: '#ffa657', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>
                  {p.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                  {p.tools.split(',').filter(Boolean).map((t, ti) => (
                    <span
                      key={ti}
                      style={{
                        fontSize: '10.5px',
                        background: '#0d1117',
                        color: '#58a6ff',
                        padding: '1px 8px',
                        borderRadius: '4px',
                        border: '1px solid #30363d',
                      }}
                    >
                      {t.trim()}
                    </span>
                  ))}
                </div>
                <p style={{ color: '#c9d1d9', margin: 0, lineHeight: 1.5, fontSize: '12px' }}>
                  {p.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.education && userData.education && userData.education.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Education')}
            {userData.education.map((e, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  padding: '12px 16px',
                  background: '#161b22',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                }}
              >
                <div>
                  <span style={{ color: '#ffa657', fontWeight: 700, fontSize: '12.5px' }}>
                    {e.degree} in {e.field}
                  </span>
                  <p style={{ color: '#8b949e', margin: '2px 0 0', fontSize: '12px' }}>
                    {e.institution}{e.grade ? ` \u2014 ${e.grade}` : ''}
                  </p>
                </div>
                <span style={{ color: '#8b949e', fontSize: '11px', whiteSpace: 'nowrap' }}>
                  {e.startYear} – {e.endYear}
                </span>
              </div>
            ))}
          </section>
        )}

        {sectionVisibility.achievements && userData.achievements && userData.achievements.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            {commentHead('Achievements')}
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#c9d1d9', lineHeight: 1.7, fontSize: '12px' }}>
              {userData.achievements.map((a, i) => (
                <li key={i}>{a.title}</li>
              ))}
            </ul>
          </section>
        )}

        {sectionVisibility.hobbies && userData.hobbies && userData.hobbies.length > 0 && (
          <section>
            {commentHead('Interests')}
            <p style={{ color: '#c9d1d9', margin: 0, fontSize: '12px' }}>
              {userData.hobbies.join('  \u00b7  ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
