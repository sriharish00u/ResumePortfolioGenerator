import { useBuilder } from "@/contexts/BuilderContext";
import { useEffect, useRef } from "react";

function GlitchText({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', animation: 'glitchAnim 3s infinite' }}>
      {text}
      <style>{`
        @keyframes glitchAnim {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(30% 0 50% 0); transform: translate(-4px, 2px); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(4px, -2px); }
          60% { clip-path: inset(10% 0 80% 0); transform: translate(-2px, 4px); }
          80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -4px); }
        }
      `}</style>
    </span>
  );
}

function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#00ff0044';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }} />;
}

export function PortfolioNeon() {
  const { userData } = useBuilder();

  const neonPink = '#ff00ff';
  const neonCyan = '#00ffff';

  return (
    <div id="portfolio-preview-content" style={{ fontFamily: "'Rajdhani', 'Orbitron', system-ui, sans-serif", background: '#0a0a0f', color: '#fff', minHeight: '100vh', position: 'relative' }}>
      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '48px', position: 'relative', overflow: 'hidden' }}>
        <MatrixCanvas />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 700, margin: '0 0 8px', letterSpacing: '0.05em' }}>
            <GlitchText text={userData.fullName || "Your Name"} />
          </h1>
          <p style={{
            fontSize: '22px',
            fontWeight: 600,
            margin: '0 0 24px',
            background: `linear-gradient(90deg, ${neonPink}, ${neonCyan}, ${neonPink})`,
            backgroundSize: '400% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'rainbowShift 4s linear infinite',
          }}>
            {userData.role || "Your Role"}
          </p>
          <p style={{ fontSize: '16px', color: '#888', maxWidth: '500px', lineHeight: 1.6, margin: '0 auto' }}>
            {userData.portfolioHero || userData.summary || "Full-stack developer & creative technologist"}
          </p>
        </div>
        <style>{`
          @keyframes rainbowShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 400% 50%; }
          }
        `}</style>
      </section>

      {/* Projects */}
      {userData.projects && userData.projects.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: `1px solid ${neonPink}22` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 40px', color: neonCyan, letterSpacing: '0.08em' }}>./projects</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px' }}>
              {userData.projects.map((p, i) => (
                <article key={i} style={{ border: `1px solid ${neonPink}33`, padding: '24px', borderRadius: '4px', background: 'rgba(255,0,255,0.03)', transition: 'box-shadow 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 20px ${neonPink}66`; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                >
                  <p style={{ fontSize: '12px', color: neonCyan, fontFamily: "'Courier New', monospace", margin: '0 0 12px' }}>
                    $ open project --name "{p.title}"
                  </p>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px', color: '#fff' }}>{p.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                    {p.tools.split(',').map((t, ti) => (
                      <span key={ti} style={{ fontSize: '11px', color: neonPink, border: `1px solid ${neonPink}44`, padding: '1px 8px', borderRadius: '2px', fontFamily: "'Courier New', monospace" }}>{t.trim()}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '13px', color: '#aaa', lineHeight: 1.5, margin: 0 }}>{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {userData.skills && userData.skills.length > 0 && (
        <section style={{ padding: '80px 48px', borderTop: `1px solid ${neonPink}22` }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 40px', color: neonCyan, letterSpacing: '0.08em' }}>./skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {userData.skills.map((s, i) => (
                <span key={i} style={{ fontSize: '13px', padding: '6px 16px', border: `1px solid ${i % 2 === 0 ? neonPink : neonCyan}44`, color: i % 2 === 0 ? neonPink : neonCyan, borderRadius: '2px', fontFamily: "'Courier New', monospace" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section style={{ padding: '80px 48px', borderTop: `1px solid ${neonPink}22`, position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
        <MatrixCanvas />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 600, margin: '0 0 24px', color: neonCyan, letterSpacing: '0.08em' }}>./contact</h2>
          {userData.email && (
            <p style={{ fontSize: '18px', color: neonPink, margin: '0 0 8px', fontFamily: "'Courier New', monospace" }}>
              $ echo "{userData.email}"
            </p>
          )}
          {userData.phone && <p style={{ fontSize: '16px', color: '#aaa', margin: '0 0 16px' }}>{userData.phone}</p>}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            {userData.links?.github && <a href={userData.links.github} style={{ color: neonCyan, fontSize: '14px', textDecoration: 'none' }}>[github]</a>}
            {userData.links?.linkedin && <a href={userData.links.linkedin} style={{ color: neonCyan, fontSize: '14px', textDecoration: 'none' }}>[linkedin]</a>}
          </div>
        </div>
      </section>
    </div>
  );
}
