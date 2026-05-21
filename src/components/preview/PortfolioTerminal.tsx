import { useBuilder } from "@/contexts/BuilderContext";
import { useState, useEffect, useRef } from "react";

interface Line {
  text: string;
  type: "system" | "command" | "output" | "input" | "prompt";
}

function buildAutoPlayLines(userData: ReturnType<typeof useBuilder>["userData"]): Line[] {
  const lines: Line[] = [];
  const name = userData.fullName || "Your Name";
  const role = userData.role || "Your Role";

  lines.push({ text: `whoami`, type: "command" });
  lines.push({ text: `${name} — ${role}`, type: "output" });

  if (userData.summary) {
    lines.push({ text: `cat about.txt`, type: "command" });
    lines.push({ text: userData.summary, type: "output" });
  }

  if (userData.skills && userData.skills.length > 0) {
    lines.push({ text: `ls skills/`, type: "command" });
    lines.push({ text: userData.skills.join("  "), type: "output" });
  }

  if (userData.experience && userData.experience.length > 0) {
    lines.push({ text: `cat experience.md`, type: "command" });
    userData.experience.forEach((e) => {
      lines.push({ text: `  ${e.role} @ ${e.organization} (${e.duration})`, type: "output" });
      lines.push({ text: `  ${e.description}`, type: "output" });
    });
  }

  if (userData.projects && userData.projects.length > 0) {
    lines.push({ text: `ls projects/`, type: "command" });
    userData.projects.forEach((p) => {
      lines.push({ text: `  ${p.title}/`, type: "output" });
    });
    lines.push({ text: `cat projects/README.md`, type: "command" });
    userData.projects.forEach((p) => {
      lines.push({ text: `${p.title} — ${p.tools}`, type: "output" });
      lines.push({ text: `  ${p.description}`, type: "output" });
    });
  }

  if (userData.email || userData.links) {
    lines.push({ text: `echo "Contact me:"`, type: "command" });
    const contact = [userData.email, userData.links?.github, userData.links?.linkedin].filter(Boolean).join(" | ");
    lines.push({ text: contact, type: "output" });
  }

  return lines;
}

const commandResponses: Record<string, (userData: ReturnType<typeof useBuilder>["userData"]) => Line[]> = {
  help: () => [
    { text: "Available commands:", type: "output" },
    { text: "  whoami      — Display name and role", type: "output" },
    { text: "  skills      — List technical skills", type: "output" },
    { text: "  projects    — List project titles", type: "output" },
    { text: "  contact     — Show contact info", type: "output" },
    { text: "  experience  — Show work experience", type: "output" },
    { text: "  clear       — Clear terminal", type: "output" },
    { text: "  help        — Show this message", type: "output" },
  ],
  whoami: (u) => [{ text: `${u.fullName || "Your Name"} — ${u.role || "Your Role"}`, type: "output" as const }],
  skills: (u) =>
    u.skills && u.skills.length > 0
      ? [{ text: u.skills.join(", "), type: "output" as const }]
      : [{ text: "No skills listed.", type: "output" as const }],
  projects: (u) =>
    u.projects && u.projects.length > 0
      ? u.projects.map((p) => ({ text: p.title, type: "output" as const }))
      : [{ text: "No projects listed.", type: "output" as const }],
  contact: (u) => {
    const parts = [u.email, u.links?.github, u.links?.linkedin].filter(Boolean);
    return parts.length > 0
      ? parts.map((p) => ({ text: p || "", type: "output" as const }))
      : [{ text: "No contact info.", type: "output" as const }];
  },
  experience: (u) =>
    u.experience && u.experience.length > 0
      ? u.experience.flatMap((e) => [
          { text: `${e.role} @ ${e.organization} (${e.duration})`, type: "output" as const },
          { text: `  ${e.description}`, type: "output" as const },
        ])
      : [{ text: "No experience listed.", type: "output" as const }],
  clear: () => [],
};

export function PortfolioTerminal() {
  const { userData } = useBuilder();
  const [displayedLines, setDisplayedLines] = useState<Line[]>([]);
  const [autoPlaying, setAutoPlaying] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const autoPlayLines = buildAutoPlayLines(userData);

  /* Show one full line at a time with a fixed delay — no character-by-character state churn */
  useEffect(() => {
    if (!autoPlaying) return;
    const timer = setTimeout(() => {
      if (lineIndex < autoPlayLines.length) {
        setDisplayedLines((prev) => [...prev, autoPlayLines[lineIndex]]);
        setLineIndex((i) => i + 1);
      } else {
        setAutoPlaying(false);
      }
    }, 120);
    return () => clearTimeout(timer);
  }, [autoPlaying, lineIndex, autoPlayLines]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedLines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const responseFn = commandResponses[trimmed];
    if (responseFn) {
      const output = responseFn(userData);
      if (trimmed === "clear") {
        setDisplayedLines([]);
      } else {
        setDisplayedLines((prev) => [...prev, { text: `$ ${cmd}`, type: "input" as const }, ...output]);
      }
    } else if (trimmed === "") {
      setDisplayedLines((prev) => [...prev, { text: `$`, type: "input" as const }]);
    } else {
      setDisplayedLines((prev) => [
        ...prev,
        { text: `$ ${cmd}`, type: "input" as const },
        { text: `Command not found: ${cmd}. Type 'help' for available commands.`, type: "output" as const },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = userInput;
      setHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setUserInput("");
      handleCommand(cmd);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setUserInput(history[newIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIdx = historyIndex + 1;
        if (newIdx >= history.length) {
          setHistoryIndex(-1);
          setUserInput("");
        } else {
          setHistoryIndex(newIdx);
          setUserInput(history[newIdx]);
        }
      }
    }
  };

  return (
    <div
      id="portfolio-preview-content"
      style={{
        background: "#1e1e1e",
        color: "#d4d4d4",
        fontFamily: "'Courier New', 'JetBrains Mono', monospace",
        minHeight: "100vh",
        fontSize: "14px",
        lineHeight: 1.6,
        overflowY: "auto",
      }}
    >
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .typing-cursor::after {
          content: '▊';
          animation: blink 1s step-end infinite;
          color: #d4d4d4;
        }
      `}</style>

      {/* Terminal window chrome */}
      <div
        style={{
          background: "#323233",
          padding: "8px 14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
        <span style={{ marginLeft: "12px", fontSize: "12px", color: "#999" }}>portfolio — bash</span>
      </div>

      {/* Terminal body */}
      <div style={{ padding: "16px 20px", minHeight: "calc(100vh - 38px)" }} onClick={() => inputRef.current?.focus()}>
        {displayedLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.type === "command" ? "#7ee787" : line.type === "output" ? "#d4d4d4" : line.type === "input" ? "#7ee787" : "#d4d4d4",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {line.type === "command" ? `$ ${line.text}` : line.type === "input" ? line.text : line.text}
          </div>
        ))}

        {/* Typing indicator when autoplaying */}
        {autoPlaying && lineIndex < autoPlayLines.length && (
          <div style={{ color: "#7ee787" }}>
            $ {autoPlayLines[lineIndex].type === "command" ? autoPlayLines[lineIndex].text : ""}
            <span className="typing-cursor" />
          </div>
        )}

        {/* User input area */}
        {!autoPlaying && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#7ee787" }}>$ </span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{
                background: "transparent",
                border: "none",
                color: "#d4d4d4",
                fontFamily: "'Courier New', 'JetBrains Mono', monospace",
                fontSize: "14px",
                outline: "none",
                flex: 1,
                caretColor: "#d4d4d4",
              }}
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
