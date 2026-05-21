import { useBuilder } from "@/contexts/BuilderContext";
import { useRef, useEffect } from "react";

function Marquee({ text }: { text: string }) {
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
      <div style={{ display: 'inline-block', whiteSpace: 'nowrap', animation: 'marquee 20s linear infinite' }}>
        <span>{text}</span>
        <span style={{ marginLeft: '0' }}>{text}</span>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export function PortfolioStudio() {
  const { userData } = useBuilder();

  const accentColor = '#ff6b35';

  return (
    <div id="portfolio-preview-content" style={{ fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif", background: '#080808', color: '#fff', minHeight: '100vh' }}>
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
          <h1 style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1.05, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            {userData.fullName || "Your Name"}
          </h1>
          <p style={{ fontSize: '18px', color: '#999', fontStyle: 'italic', margin: '0 0 40px' }}>
            {userData.role || "Your Role"}
          </p>
          <p style={{ fontSize: '16px', color: '#ccc', maxWidth: '600px', lineHeight: 1.6, margin: 0 }}>
            {userData.portfolioHero || userData.summary || "Building exceptional digital experiences"}
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, color: accentColor, fontSize: '13px', letterSpacing: '0.1em' }}>
          <Marquee text="AVAILABLE FOR WORK · OPEN TO OPPORTUNITIES · LET'S BUILD SOMETHING · " />
        </div>
      </section>

      {userData.summary && (
        <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'flex-start' }}>
            {userData.profileImage && (
              <div style={{ width: '300px', flexShrink: 0 }}>
                <img
                  src={userData.profileImage}
                  alt={userData.fullName}
                  style={{ width: '100%', borderRadius: '4px', transform: 'rotate(-2deg)', transition: 'transform 0.3s ease', display: 'block' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.transform = 'rotate(0deg)'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.transform = 'rotate(-2deg)'; }}
                />
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 20px', color: accentColor }}>About</h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#bbb', margin: 0 }}>{userData.summary}</p>
            </div>
          </div>
        </section>
      )}

      {userData.projects && userData.projects.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 48px', color: accentColor }}>Work</h2>
            {userData.projects.map((p, i) => (
              <article key={i} style={{ display: 'flex', gap: '40px', marginBottom: '60px', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
                {p.images && p.images[0] && (
                  <div style={{ flex: 1 }}>
                    <img src={p.images[0]} alt={p.title} style={{ width: '100%', borderRadius: '4px', display: 'block' }} />
                  </div>
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 8px', color: '#fff' }}>{p.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {p.tools.split(',').map((t, ti) => (
                      <span key={ti} style={{ fontSize: '11px', color: accentColor, border: `1px solid ${accentColor}33`, padding: '2px 10px', borderRadius: '2px' }}>{t.trim()}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#bbb', margin: 0 }}>{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {userData.skills && userData.skills.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600, margin: '0 0 32px', color: accentColor }}>Skills</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
              {userData.skills.map((s, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: '1px solid #1a1a1a', fontSize: '14px', color: '#ccc' }}>{s}</div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '120px 48px', borderTop: '1px solid #1a1a1a', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '64px', fontWeight: 700, margin: '0 0 16px', color: '#fff' }}>Let's Talk</h2>
          {userData.email && (
            <a href={`mailto:${userData.email}`} style={{ fontSize: '20px', color: accentColor, textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
              {userData.email}
            </a>
          )}
          {userData.phone && <p style={{ fontSize: '16px', color: '#999', margin: 0 }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
            {userData.links?.github && <a href={userData.links.github} style={{ color: '#ccc', fontSize: '14px', textDecoration: 'none' }}>GitHub</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} style={{ color: '#ccc', fontSize: '14px', textDecoration: 'none' }}>LinkedIn</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
