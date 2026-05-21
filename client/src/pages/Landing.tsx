import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, FileText, Palette, Download, Sparkles } from "lucide-react";
import { templates } from "@/lib/templates";
import { useEffect, useRef, useState } from "react";

const professions = [
  "Developers", "Doctors", "Teachers", "Lawyers",
  "Designers", "Engineers", "Executives", "Students",
];

const professionCards = [
  { emoji: "💻", label: "Software Engineers", count: "4 Templates" },
  { emoji: "🩺", label: "Healthcare", count: "3 Templates" },
  { emoji: "📚", label: "Education", count: "3 Templates" },
  { emoji: "⚖️", label: "Legal", count: "2 Templates" },
  { emoji: "🎨", label: "Design & Creative", count: "5 Templates" },
  { emoji: "🏢", label: "Business & Mgmt", count: "4 Templates" },
  { emoji: "📡", label: "Media & Publishing", count: "2 Templates" },
  { emoji: "🏛️", label: "Architecture", count: "2 Templates" },
];

export default function Landing() {
  const [professionIndex, setProfessionIndex] = useState(0);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % professions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* simple horizontal-scroll marquee without extra deps */
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let pos = 0;
    const animate = () => {
      pos -= 0.5;
      if (pos <= -el.scrollWidth / 2) pos = 0;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(animate);
    };
    let raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px]" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              <span className="text-sm font-medium text-white/90">
                No Login • No AI • Completely Free
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight max-w-4xl font-sans">
              Build a Resume for
              <span className="ml-3 inline-block min-w-[2ch] text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                {professions[professionIndex]}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl">
              Choose from 20 professionally designed templates, fill in your details, and export as PDF — all in your browser, no account needed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/templates">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base h-12 px-10 bg-white text-indigo-900 hover:bg-white/90 font-semibold"
                >
                  Choose a Template
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base h-12 px-10 border-white/30 text-white hover:bg-white/10"
                >
                  View All 20
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-6">
              {[
                ["20", "Templates"],
                ["0", "Sign-ups"],
                ["100%", "Free"],
              ].map(([value, label]) => (
                <div key={label} className="text-center">
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-sm text-white/60">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── TEMPLATE MARQUEE ─── */}
      <section className="py-16 overflow-hidden bg-muted/30">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-sans">
            Templates for Every Career
          </h2>
          <p className="text-muted-foreground mt-2">
            10 resume + 10 portfolio layouts — scroll to explore
          </p>
        </div>
        <div className="relative">
          <div className="flex gap-6" ref={marqueeRef}>
            {[...templates, ...templates].map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="flex-shrink-0 w-64 rounded-lg border bg-card p-5 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.type}
                  </span>
                  {t.profession && (
                    <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                      {t.profession}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground text-sm truncate">{t.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{t.description}</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {t.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ALTERNATING FEATURES ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          {[
            {
              icon: FileText,
              title: "Answer Simple Questions",
              desc: "Our guided form walks you through every section — basic info, skills, experience, projects, and more. Add images, links, and achievements effortlessly.",
              reversed: false,
            },
            {
              icon: Palette,
              title: "20 Profession-Crafted Templates",
              desc: "Choose from 10 resume and 10 portfolio templates, each tailored to a specific profession. From legal to engineering, design to healthcare — we've got you.",
              reversed: true,
            },
            {
              icon: Download,
              title: "Export as PDF or Publish Live",
              desc: "Download a print-ready PDF resume or publish your portfolio as a standalone HTML page. No AI, no storage — your data stays in your browser.",
              reversed: false,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className={`flex flex-col ${feature.reversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12`}
            >
              <div className="flex-1 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
                  {feature.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
              <div className="flex-1 w-full max-w-lg aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <feature.icon className="h-16 w-16 mx-auto opacity-30" />
                  <p className="mt-2 text-sm">Preview</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BUILT FOR EVERY CAREER ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-sans">
              Built for Every Career Path
            </h2>
            <p className="text-muted-foreground mt-2">
              Profession-specific templates designed to highlight what matters most
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {professionCards.map((p) => (
              <Card
                key={p.label}
                className="p-6 text-center space-y-2 hover:border-primary/30 transition-colors"
              >
                <span className="text-3xl">{p.emoji}</span>
                <h4 className="font-semibold text-foreground text-sm">{p.label}</h4>
                <p className="text-xs text-muted-foreground">{p.count}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card
            className="p-12 space-y-6 border-primary/20"
            style={{
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-sans">
              Ready to Build Your Resume?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              20 templates, zero sign-ups, 100% free. Start building in under 3 minutes.
            </p>
            <Link href="/templates">
              <Button
                size="lg"
                className="h-12 px-10 text-base bg-white text-indigo-900 hover:bg-white/90 font-semibold"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
