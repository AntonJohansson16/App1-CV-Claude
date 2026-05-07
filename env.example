"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./page.module.css";

type Section = {
  id: string;
  label: string;
  icon: string;
  content: string;
};

function parseResult(raw: string): Section[] {
  const sections: Section[] = [
    { id: "match", label: "Match Report", icon: "◈", content: "" },
    { id: "cv", label: "Optimized CV", icon: "◉", content: "" },
    { id: "linkedin", label: "LinkedIn", icon: "◎", content: "" },
    { id: "cover", label: "Cover Letter", icon: "◇", content: "" },
    { id: "interview", label: "Interview Prep", icon: "◆", content: "" },
    { id: "plan", label: "Career Plan", icon: "◈", content: "" },
  ];

  const patterns = [
    { id: "match", start: "## A) MATCH REPORT", end: "## B)" },
    { id: "cv", start: "## B) OPTIMIZED CV", end: "## C)" },
    { id: "linkedin", start: "## C) LINKEDIN OPTIMIZATION", end: "## D)" },
    { id: "cover", start: "## D) COVER LETTER", end: "## E)" },
    { id: "interview", start: "## E) INTERVIEW SIMULATION", end: "## F)" },
    { id: "plan", start: "## F) CAREER IMPROVEMENT PLAN", end: null },
  ];

  patterns.forEach(({ id, start, end }) => {
    const startIdx = raw.indexOf(start);
    if (startIdx === -1) return;
    const endIdx = end ? raw.indexOf(end, startIdx + start.length) : raw.length;
    const content = raw.slice(startIdx + start.length, endIdx === -1 ? raw.length : endIdx).trim();
    const sec = sections.find((s) => s.id === id);
    if (sec) sec.content = content;
  });

  return sections;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^---$/gm, '<hr>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul]|<li|<hr|<p)(.+)$/gm, '<p>$1</p>');
}

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 75 ? '#00ff88' : score >= 50 ? '#ff6b35' : '#ef4444';

  return (
    <div className={styles.scoreRing}>
      <svg viewBox="0 0 120 120" width="120" height="120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e1e2e" strokeWidth="8" />
        <circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 8px ${color})` }}
        />
        <text x="60" y="55" textAnchor="middle" fill={color} fontSize="22" fontWeight="800" fontFamily="Syne, sans-serif">{score}</text>
        <text x="60" y="72" textAnchor="middle" fill="#6b6b80" fontSize="10" fontFamily="DM Mono, monospace">/100</text>
      </svg>
    </div>
  );
}

export default function Home() {
  const [cv, setCv] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [activeSection, setActiveSection] = useState("match");
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [step, setStep] = useState<"input" | "result">("input");
  const [loadingMsg, setLoadingMsg] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const loadingMsgs = [
    "Scanning ATS compatibility...",
    "Analyzing keyword alignment...",
    "Engineering your CV...",
    "Crafting interview simulations...",
    "Optimizing LinkedIn profile...",
    "Generating career strategy...",
    "Finalizing your Career OS report...",
  ];

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMsg((p) => (p + 1) % loadingMsgs.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [loading]);

  async function handleAnalyze() {
    if (!cv.trim() || !jobDesc.trim()) {
      setError("Please provide both your CV and the job description.");
      return;
    }
    setError("");
    setLoading(true);
    setLoadingMsg(0);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cv, jobDescription: jobDesc, goals }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      const parsed = parseResult(data.result);
      setSections(parsed);

      // Extract score
      const scoreMatch = data.result.match(/\*\*Score:\*\*\s*(\d+)/i) || data.result.match(/Score[:\s]+(\d+)/i);
      if (scoreMatch) setScore(parseInt(scoreMatch[1]));

      setStep("result");
      setActiveSection("match");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setStep("input");
    setSections([]);
    setScore(null);
    setError("");
  }

  const activeContent = sections.find((s) => s.id === activeSection)?.content || "";

  return (
    <main className={styles.main}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⬡</span>
          <div>
            <div className={styles.logoTitle}>CAREER OS</div>
            <div className={styles.logoSub}>AI CAREER STRATEGIST v2.0</div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.statusDot} />
          <span className={styles.statusText}>SYSTEM ONLINE</span>
        </div>
      </header>

      {step === "input" && (
        <div className={styles.inputSection}>
          {/* Hero */}
          <div className={styles.hero}>
            <div className={styles.heroTag}>MAXIMIZE INTERVIEW PROBABILITY</div>
            <h1 className={styles.heroTitle}>
              Engineer Your<br />
              <span className={styles.heroAccent}>Employability</span>
            </h1>
            <p className={styles.heroDesc}>
              Paste your CV + job description. Get a full ATS report, rewritten CV,
              LinkedIn optimization, cover letter, interview prep & career plan — instantly.
            </p>
          </div>

          {/* Input grid */}
          <div className={styles.inputGrid}>
            <div className={styles.inputCard}>
              <label className={styles.inputLabel}>
                <span className={styles.labelDot} style={{ background: '#00ff88' }} />
                YOUR CV / RESUME
              </label>
              <textarea
                className={styles.textarea}
                value={cv}
                onChange={(e) => setCv(e.target.value)}
                placeholder="Paste your full CV here — all sections, experience, skills, education..."
                rows={14}
              />
              <div className={styles.charCount}>{cv.length} chars</div>
            </div>

            <div className={styles.inputCard}>
              <label className={styles.inputLabel}>
                <span className={styles.labelDot} style={{ background: '#7c3aed' }} />
                JOB DESCRIPTION
              </label>
              <textarea
                className={styles.textarea}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the full job description — requirements, responsibilities, must-haves..."
                rows={14}
              />
              <div className={styles.charCount}>{jobDesc.length} chars</div>
            </div>
          </div>

          <div className={styles.inputCard} style={{ maxWidth: 720, margin: '0 auto' }}>
            <label className={styles.inputLabel}>
              <span className={styles.labelDot} style={{ background: '#ff6b35' }} />
              GOALS (OPTIONAL)
            </label>
            <input
              className={styles.input}
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="e.g. Senior role, Stockholm, €80k+ salary, fintech industry..."
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            className={styles.analyzeBtn}
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.loadingInner}>
                <span className={styles.spinner} />
                {loadingMsgs[loadingMsg]}
              </span>
            ) : (
              <>
                <span className={styles.btnIcon}>⬡</span>
                RUN CAREER OS ANALYSIS
              </>
            )}
          </button>

          {loading && (
            <div className={styles.loadingBar}>
              <div className={styles.loadingBarFill} />
            </div>
          )}

          {/* Features */}
          <div className={styles.features}>
            {[
              { icon: "◈", label: "ATS Match Score", desc: "Keyword gap analysis" },
              { icon: "◉", label: "CV Rewrite", desc: "Impact-optimized bullets" },
              { icon: "◎", label: "LinkedIn", desc: "Headline + About section" },
              { icon: "◇", label: "Cover Letter", desc: "Tailored & human-toned" },
              { icon: "◆", label: "Interview Prep", desc: "10 questions + answers" },
              { icon: "◈", label: "Career Plan", desc: "5 actionable next steps" },
            ].map((f) => (
              <div key={f.label} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div className={styles.featureLabel}>{f.label}</div>
                <div className={styles.featureDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === "result" && (
        <div className={styles.resultSection} ref={resultRef}>
          {/* Result header */}
          <div className={styles.resultHeader}>
            <div className={styles.resultHeaderLeft}>
              {score !== null && <ScoreRing score={score} />}
              <div>
                <div className={styles.resultTitle}>ANALYSIS COMPLETE</div>
                <div className={styles.resultSub}>Your Career OS report is ready</div>
                {score !== null && (
                  <div className={styles.resultScoreLabel}>
                    ATS Match Score:{" "}
                    <strong style={{ color: score >= 75 ? '#00ff88' : score >= 50 ? '#ff6b35' : '#ef4444' }}>
                      {score >= 75 ? "Strong" : score >= 50 ? "Average" : "Weak"}
                    </strong>
                  </div>
                )}
              </div>
            </div>
            <button className={styles.resetBtn} onClick={handleReset}>
              ← New Analysis
            </button>
          </div>

          {/* Tab navigation */}
          <div className={styles.tabs}>
            {sections.map((s) => (
              <button
                key={s.id}
                className={`${styles.tab} ${activeSection === s.id ? styles.tabActive : ''}`}
                onClick={() => setActiveSection(s.id)}
              >
                <span className={styles.tabIcon}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.resultContent}>
            {activeContent ? (
              <div
                className={styles.markdown}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(activeContent) }}
              />
            ) : (
              <div className={styles.emptySection}>No content for this section.</div>
            )}
          </div>

          {/* Copy button */}
          <button
            className={styles.copyBtn}
            onClick={() => {
              const sec = sections.find((s) => s.id === activeSection);
              if (sec) navigator.clipboard.writeText(sec.content);
            }}
          >
            ⊕ Copy Section
          </button>
        </div>
      )}

      <footer className={styles.footer}>
        <span>CAREER OS AI</span>
        <span className={styles.footerDivider}>◈</span>
        <span>Built to maximize interview probability</span>
        <span className={styles.footerDivider}>◈</span>
        <span>Powered by Claude</span>
      </footer>
    </main>
  );
}
