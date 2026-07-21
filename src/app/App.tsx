import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Menu, X, ArrowRight, Download, ExternalLink,
  Github, Linkedin, Instagram, Phone, Mail, MapPin,
  Code2, Smartphone, Server, Database, Cpu, Cloud,
  GitBranch, Terminal, Wifi, Zap, Shield, Layers,
  Globe, Brain, BarChart2, Activity, Send,
  ChevronLeft, ChevronRight, Star, CheckCircle,
  Rocket, Wrench, Play, Package, BookOpen, Heart,
  BrainCircuit,
  Globe2
} from "lucide-react";

// ─── Animation helpers ───────────────────────────────────────────────────────

const easeOut = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function useCountUp(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const dur = 1800;
    const id = setInterval(() => {
      const t = Math.min((Date.now() - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 4);
      setVal(Math.floor(ease * target));
      if (t === 1) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [active, target]);
  return val;
}

// ─── Section label pill ───────────────────────────────────────────────────────

function Pill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-100 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
      <span className="text-[11px] font-semibold tracking-widest uppercase text-sky-600">{label}</span>
    </div>
  );
}

// ─── Background orbs ──────────────────────────────────────────────────────────

function Background() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 40%, #38BDF8 0%, transparent 65%)",
          opacity: 0.12,
          filter: "blur(72px)",
        }}
      />
      <div
        className="absolute top-[40%] -left-64 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle at 60% 60%, #0EA5E9 0%, transparent 65%)",
          opacity: 0.10,
          filter: "blur(90px)",
        }}
      />
      <div
        className="absolute -bottom-32 right-[20%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle at 50% 50%, #7DD3FC 0%, transparent 65%)",
          opacity: 0.08,
          filter: "blur(72px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const items = ["Home", "About", "Projects", "Services", "Experience", "Contact"];

  function goto(id: string) {
    setActive(id.toLowerCase());
    setMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4"
      style={{ paddingTop: scrolled ? 12 : 20, paddingBottom: scrolled ? 12 : 0 }}
    >
      <div
        className="mx-auto max-w-7xl transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderRadius: scrolled ? 16 : 0,
          border: scrolled ? "1px solid #E2E8F0" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(15,23,42,0.07)" : "none",
          padding: "0 24px",
        }}
      >
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#38BDF8,#0EA5E9)" }}
            >
              SR
            </div>
            <span className="font-semibold text-slate-900 hidden sm:block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Saravanan Ravi
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => goto(item)}
                className="px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200"
                style={{
                  color: active === item.toLowerCase() ? "#0EA5E9" : "#475569",
                  background: active === item.toLowerCase() ? "#F0F9FF" : "transparent",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (active !== item.toLowerCase())
                    (e.currentTarget as HTMLButtonElement).style.color = "#0F172A";
                }}
                onMouseLeave={(e) => {
                  if (active !== item.toLowerCase())
                    (e.currentTarget as HTMLButtonElement).style.color = "#475569";
                }}
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/resume.pdf"
              download="Saravanan_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Download size={13} />
              Resume
            </a>
            <button
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg,#38BDF8,#0EA5E9)",
                boxShadow: "0 2px 12px rgba(56,189,248,0.35)",
                fontFamily: "'Inter', sans-serif",
              }}
              onClick={() => goto("contact")}
            >
              Book a Call
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-100 py-4 space-y-0.5">
            {items.map((item) => (
              <button
                key={item}
                onClick={() => goto(item)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors block"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {item}
              </button>
            ))}
            <div className="pt-3 space-y-2 border-t border-slate-100">
              <a
                href="/resume.pdf"
                download="Saravanan_Resume.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 border border-slate-200"
              >
                <Download size={14} />
                Resume
              </a>
              <button
                className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg,#38BDF8,#0EA5E9)" }}
                onClick={() => goto("contact")}
              >
                Book a Call
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

const TECH_PILLS = ["Python", "Flutter", "FastAPI", "Node.js", "Firebase", "MySQL", "ESP32", "Docker", "React", "OpenCV"];

const STATS = [
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 20, suffix: "+", label: "Technologies Used" },
  { value: 3, suffix: "+", label: "Years Learning" },
  // { value: 15, suffix: "+", label: "Happy Clients" },
];

function StatCounter({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className="text-center sm:text-left">
      <div
        className="text-3xl sm:text-4xl font-bold text-slate-900 leading-none"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {count}
        <span style={{ color: "#38BDF8" }}>{suffix}</span>
      </div>
      <div className="text-xs text-slate-500 mt-1 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

function HeroMockup() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Main code card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
          <span className="w-3 h-3 rounded-full bg-red-400/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
          <span className="w-3 h-3 rounded-full bg-green-400/80" />
          <span className="ml-auto text-slate-500 text-xs font-mono">saravanan.py</span>
        </div>
        {/* Code */}
        <div className="px-6 py-5 font-mono text-sm leading-relaxed">
          <div>
            <span className="text-sky-400">class</span>{" "}
            <span className="text-yellow-300">SaravananRavi</span>
            <span className="text-slate-400">:</span>
          </div>
          <div className="pl-6 mt-1">
            <span className="text-slate-500"># Full Stack Engineer & IoT Innovator</span>
          </div>
          <div className="pl-6 mt-3">
            <span className="text-purple-400">skills</span>
            <span className="text-slate-400"> = [</span>
          </div>
          <div className="pl-12">
            <span className="text-green-300">"Python"</span>
            <span className="text-slate-400">, </span>
            <span className="text-green-300">"Flutter"</span>
            <span className="text-slate-400">, </span>
            <span className="text-green-300">"FastAPI"</span>
            <span className="text-slate-400">,</span>
          </div>
          <div className="pl-12">
            <span className="text-green-300">"Node.js"</span>
            <span className="text-slate-400">, </span>
            <span className="text-green-300">"ESP32"</span>
            <span className="text-slate-400">, </span>
            <span className="text-green-300">"React"</span>
          </div>
          <div className="pl-6">
            <span className="text-slate-400">]</span>
          </div>
          <div className="pl-6 mt-3">
            <span className="text-sky-400">def</span>{" "}
            <span className="text-yellow-300">build_future</span>
            <span className="text-slate-400">(</span>
            <span className="text-orange-300">self, idea</span>
            <span className="text-slate-400">):</span>
          </div>
          <div className="pl-12">
            <span className="text-sky-400">return</span>{" "}
            <span className="text-green-300">ScalableProduct</span>
            <span className="text-slate-400">(</span>
          </div>
          <div className="pl-16 text-slate-400">
            idea<span className="text-slate-400">,</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-400">quality</span>
            <span className="text-slate-400">=</span>
            <span className="text-green-300">"premium"</span>
            <span className="text-slate-400">,</span>
          </div>
          <div className="pl-16">
            <span className="text-purple-400">delivery</span>
            <span className="text-slate-400">=</span>
            <span className="text-green-300">"on_time"</span>
          </div>
          <div className="pl-12">
            <span className="text-slate-400">)</span>
          </div>
          {/* Blinking cursor */}
          <div className="pl-6 mt-3 flex items-center gap-1">
            <span className="text-slate-500">{">>>"}</span>
            <span className="w-2 h-4 bg-sky-400 animate-pulse rounded-sm ml-1" />
          </div>
        </div>
      </motion.div>

      {/* Floating stat card */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: easeOut }}
        className="absolute -right-6 top-8 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden lg:block"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)" }}>
            <CheckCircle size={18} color="#0EA5E9" />
          </div>
          <div>
            <div className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>10+</div>
            <div className="text-xs text-slate-500">Projects Done</div>
          </div>
        </div>
      </motion.div>

      {/* Floating availability card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: easeOut }}
        className="absolute -left-6 bottom-10 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hidden lg:block"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-semibold text-slate-800">Available for hire</span>
        </div>
        <div className="text-xs text-slate-400 mt-0.5 pl-5">Open to freelance & full-time</div>
      </motion.div>
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="home" className="relative pt-32 pb-20 min-h-screen flex items-center" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/60 backdrop-blur-sm mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-600 tracking-wide">
                  Full Stack · Flutter · IoT · Python Developer
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
              className="text-5xl sm:text-6xl xl:text-[68px] font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Building{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg,#38BDF8,#0EA5E9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Scalable
              </span>{" "}
              Software, Smart Systems &{" "}
              <span style={{ color: "#0EA5E9" }}>Digital</span> Experiences.
            </motion.h1>

            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
              className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I design and develop modern web applications, mobile apps, IoT solutions, and intelligent
              systems that solve real-world problems — with precision, speed, and craft.
            </motion.p> */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <button
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                style={{
                  background: "linear-gradient(135deg,#38BDF8,#0EA5E9)",
                  boxShadow: "0 4px 20px rgba(56,189,248,0.4)",
                  fontFamily: "'Inter', sans-serif",
                }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Projects
                <ArrowRight size={14} />
              </button>
              <button
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 shadow-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Contact Me
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: easeOut }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100"
            >
              {STATS.map((s) => (
                <StatCounter key={s.label} {...s} active={inView} />
              ))}
            </motion.div>
          </div>

          {/* Right */}
          <div>
            <HeroMockup />

            {/* Tech pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.1, ease: easeOut }}
              className="flex flex-wrap gap-2 justify-center mt-8"
            >
              {TECH_PILLS.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-200 shadow-sm hover:border-sky-300 hover:text-sky-600 transition-all duration-200 cursor-default"
                  style={{ fontFamily: "'Geist Mono', monospace" }}
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ────────────────────────────────────────────────────────────

const TIMELINE_ITEMS = [

  {
    year: "2023",
    icon: <Code2 size={14} />,
    title: "Web Development Journey",
    desc: "Expanded into Full Stack Development, building responsive web applications using modern frontend and backend technologies."
  },
  {
    year: "2025",
    icon: <Package size={14} />,
    title: "B.Tech in AI & Data Science",
    desc: "Currently pursuing B.Tech in Artificial Intelligence and Data Science at :contentReference[oaicite:0]{index=0}, with graduation expected in 2027."
  },
  {
    year: "2025",
    icon: <Rocket size={14} />,
    title: "Freelancing & Client Projects",
    desc: "Started delivering professional software solutions, including web applications, IoT systems, dashboards, and custom client projects."
  },
];

const ACHIEVEMENTS = [
  { icon: <Code2 size={18} />, value: "5+", label: "Web Applications", color: "#38BDF8" },
  { icon: <Smartphone size={18} />, value: "3+", label: "Mobile Apps", color: "#10B981" },
  { icon: <Cpu size={18} />, value: "3+", label: "IoT Solutions", color: "#8B5CF6" },
  { icon: <Brain size={18} />, value: "2+", label: "AI-Based Systems", color: "#F59E0B" },
];

function AboutSection() {
  return (
    <section id="about" className="py-28 relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left — image + achievement cards */}
          <FadeUp>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-slate-100">
                <img
                  src="\myimage1.jpeg"
                  alt="Saravanan Ravi — Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 rounded-3xl"
                  style={{ background: "linear-gradient(to top, rgba(15,23,42,0.3) 0%, transparent 60%)" }} />
              </div>

              {/* Achievement cards floating */}
              <div className="absolute -bottom-8 -right-6 grid grid-cols-2 gap-3 hidden lg:grid">
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.label}
                    className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 hover:shadow-2xl transition-shadow duration-300"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                      style={{ background: `${a.color}18`, color: a.color }}
                    >
                      {a.icon}
                    </div>
                    <div className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {a.value}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">{a.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right — bio + timeline */}
          <div>
            <FadeUp>
              <Pill label="About Me" />
              <h2
                className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Crafting software that{" "}
                <span style={{ color: "#0EA5E9" }}>matters.</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
                I'm Saravanan Ravi, a passionate full-stack developer and AI engineer from India. I specialize in
                building scalable web applications, cross-platform mobile apps, intelligent systems, and connected
                IoT solutions that solve real-world problems.
              </p>
              <p className="text-slate-500 leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                My goal is to be the engineer who bridges the gap between great ideas and working products —
                combining clean architecture, thoughtful UI, and robust backend engineering to deliver software
                that people love to use.
              </p>
            </FadeUp>

            {/* Timeline */}
            <FadeUp delay={0.15}>
              <div className="space-y-6">
                {TIMELINE_ITEMS.map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: "linear-gradient(135deg,#38BDF8,#0EA5E9)",
                          color: "white",
                          boxShadow: "0 4px 12px rgba(56,189,248,0.3)",
                        }}
                      >
                        {item.icon}
                      </div>
                      {i < TIMELINE_ITEMS.length - 1 && (
                        <div className="w-px flex-1 mt-2" style={{ background: "linear-gradient(to bottom, #E2E8F0, transparent)", minHeight: 20 }} />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-md"
                          style={{ background: "#F0F9FF", color: "#0EA5E9", fontFamily: "'Geist Mono', monospace" }}
                        >
                          {item.year}
                        </span>
                        <span className="text-sm font-semibold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                          {item.title}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills Section ───────────────────────────────────────────────────────────

const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    icon: <Globe size={15} />,
    skills: [
      { name: "HTML5", level: 92 },
      { name: "CSS3", level: 90 },
      { name: "JavaScript", level: 88 },
      { name: "React", level: 85 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: <Server size={15} />,
    skills: [
      { name: "Python", level: 93 },
      { name: "FastAPI", level: 88 },
      { name: "Node.js", level: 82 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: <Smartphone size={15} />,
    skills: [
      { name: "Flutter", level: 88 },
      { name: "Dart", level: 85 },
      { name: "Firebase", level: 87 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: <Database size={15} />,
    skills: [
      { name: "MySQL", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "Firebase RTDB", level: 87 },
      { name: "PostgreSQL", level: 75 },
    ],
  },
  {
    id: "iot",
    label: "IoT",
    icon: <Wifi size={15} />,
    skills: [
      { name: "ESP32", level: 90 },
      { name: "Arduino", level: 88 },
      { name: "Raspberry Pi", level: 80 },
      { name: "MQTT", level: 85 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Wrench size={15} />,
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Docker", level: 78 },
      { name: "Linux", level: 85 },
      { name: "VS Code", level: 95 },
    ],
  },
  {
    id: "ai",
    label: "AI/ML",
    icon: <Brain size={15} />,
    skills: [
      { name: "OpenCV", level: 85 },
      { name: "OCR", level: 82 },
      { name: "Machine Learning", level: 75 },
      { name: "NumPy / Pandas", level: 88 },
    ],
  },
];

function SkillBar({ name, level }: { name: string; level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-slate-700" style={{ fontFamily: "'Inter', sans-serif" }}>
          {name}
        </span>
        <span className="text-xs font-semibold text-sky-600" style={{ fontFamily: "'Geist Mono', monospace" }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: 0.2, ease: easeOut }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg,#38BDF8,#0EA5E9)" }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  const [active, setActive] = useState("frontend");
  const current = SKILL_CATEGORIES.find((c) => c.id === active)!;

  return (
    <section
      id="skills"
      className="py-28 relative"
      style={{ zIndex: 1, background: "#F8FAFC" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <Pill label="Technical Expertise" />
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Skills & Technologies
          </h2>
          {/* <p
            className="mt-4 text-slate-500 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            A battle-tested toolkit built through real projects, late nights, and genuine curiosity.
          </p> */}
        </FadeUp>

        {/* Category tabs */}
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: active === cat.id ? "linear-gradient(135deg,#38BDF8,#0EA5E9)" : "white",
                  color: active === cat.id ? "white" : "#475569",
                  border: active === cat.id ? "none" : "1px solid #E2E8F0",
                  boxShadow: active === cat.id ? "0 4px 16px rgba(56,189,248,0.3)" : "none",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Skill bars */}
        <FadeUp delay={0.15}>
          <div
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#38BDF8,#0EA5E9)", color: "white" }}
              >
                {current.icon}
              </div>
              <div>
                <div className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {current.label}
                </div>
                <div className="text-xs text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {current.skills.length} technologies
                </div>
              </div>
            </div>
            {current.skills.map((s) => (
              <SkillBar key={s.name} {...s} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: "Aquagaurd-Smart Water Tank Monitoring",
    category: "IoT",
    categoryColor: "#38BDF8",
    desc: "Real-time water level monitoring with automated pump control, mobile alerts, and usage analytics.",
    tech: ["ESP32", "HTML5", "Node.js", "MSSQL"],
    image: "\aquagaurd.jpeg",
    icon: <Wifi size={14} />,
    gradient: "from-sky-400 to-blue-500",
    demoLink: "https://youtu.be/2JNXGBdbfS0?si=LK14_vaJ4UxW_0O7"
  },
  {
    id: 2,
    title: "Sim Vital-ECG Monitor Simulation System",
    category: "Healthcare",
    categoryColor: "#10B981",
    desc: "Python-based ECG signal simulation and visualization with ML anomaly detection for medical training.",
    tech: ["Python", "Iot", "ML", "Pyqt6"],
    image: "\sim vital.jpeg",
    icon: <Activity size={14} />,
    gradient: "from-emerald-400 to-teal-500",
    demoLink: "https://youtu.be/ijOAYXuQsQc?si=WzBHQBNHiWzyFYNx",
  },
  {
    id: 3,
    title: "Bus Number Detection System",
    category: "AI/ML",
    categoryColor: "#8B5CF6",
    desc: "Computer vision pipeline that reads bus numbers from camera feeds and provides audio feedback for visually impaired users.",
    tech: ["Python", "OpenCV", "YOLO", "OCR"],
    image: "\image.png",
    icon: <Brain size={14} />,
    gradient: "from-violet-400 to-purple-500",
    comingSoon : true ,
  },
  {
    id: 4,
    title: "Step Assist - Smart IoT Crutch",
    category: "Mobile",
    categoryColor: "#EF4444",
    desc: "Designed a smart crutch with sensors for fall detection, step counting, and gait analysis. Built a mobile app with real-time data visualization and voice assistance for elderly users.",
    tech: ["Flutter", "Firebase", "Dart","IOT"],
    image: "\sih.jpeg",
    icon: <Heart size={14} />,
    gradient: "from-red-400 to-rose-500",
    comingSoon :true 
  },
  {
    id: 5,
    title: "Thinkbit-symposium website",
    category: "Web ",
    categoryColor: "#F59E0B",
    desc: "a college symposium website with department details, event information, and online registration features.",
    tech: ["HTML5", "Node.js", "Mssql", "nginx"],
    image:"\ thinkbit.jpeg",
    icon: <Globe2 size={14} />,
    gradient: "from-amber-400 to-orange-500",
    demolink: "https://thinkbit.mzcet.in",
  },
  {
    id: 6,
    title: "MZ MarkDigitizer",
    category: "AI/ML & WEB",
    categoryColor: "#0EA5E9",
    desc: "Built an OCR-based marksheet scanner that extracts marks and student information from scanned documents.The system automatically sends the scanned image to a server and converts the data into a digital format.",
    tech: ["python", "FastAPI", "GLM_ocr", "mssql"],
    image: "\ocr.jpeg",
    icon: <BrainCircuit size={14} />,
    gradient: "from-sky-400 to-cyan-500",
    comingSoon : true ,
  },
  {
    id: 7,
    title: "AC Monitoring IoT Platform",
    category: "IoT",
    categoryColor: "#06B6D4",
    desc: "Smart AC monitoring dashboard tracking power consumption, temperature patterns, and predictive maintenance alerts.",
    tech: ["ESP32", "FastAPI", "React", "MySQL", "Docker"],
    image: "\ac.jpeg",
    icon: <Cpu size={14} />,
    gradient: "from-cyan-400 to-sky-500",
    comingSoon : true ,
  },
  {
    id: 8,
    title: "Eval AI",
    category: "AI/ML",
    categoryColor: "#06B6D4",
    desc: "Developed an AI-powered answer sheet evaluation platform using the Claude API to automate batch assessment and generate structured results through a centralized web system for college examinations.",
    tech: ["Claude API", "FastAPI", "React", "MSSQL"],
    image: "\EvalAI.png",
    icon: <Cpu size={14} />,
    gradient: "from-cyan-400 to-sky-500",
    comingSoon : true ,
  },
];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-52 bg-slate-100">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />
        {/* Category badge */}
        <div
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
          style={{ background: project.categoryColor, boxShadow: `0 4px 12px ${project.categoryColor}60` }}
        >
          {project.icon}
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="font-bold text-slate-900 text-lg mb-2 leading-snug"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
          {project.desc}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-600 border border-slate-100 bg-slate-50"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-slate-50">
          {project.comingSoon ? (
            <span
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Rocket size={12} />
              Coming Soon
            </span>
          ) : (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <Play size={12} />
              Live Demo
              <ExternalLink size={11} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "IoT", "Web", "Mobile", "AI/ML", "Healthcare"];
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-28 relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-6">
          <Pill label="Featured Projects" />
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Things I've Built
          </h2>
          <p
            className="mt-4 text-slate-500 max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            From IoT sensors to production web apps — each project is a case study in problem-solving.
          </p>
        </FadeUp>

        <FadeUp delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: filter === cat ? "#0F172A" : "white",
                color: filter === cat ? "white" : "#475569",
                border: "1px solid",
                borderColor: filter === cat ? "#0F172A" : "#E2E8F0",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {cat}
            </button>
          ))}
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.07}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience Timeline ──────────────────────────────────────────────────────

const EXPERIENCE = [
  {
    period: "2025 – 2025",
    role: "Flutter Developer",
    company: "Gateway Software Solutions",
    type: "Internship ",
    color: "#38BDF8",
    achievements: [
      "Developing cross-platform mobile applications using Flutter and Dart",
      "Building responsive UI components and integrating REST APIs",
      "Collaborating with backend developers to deliver scalable applications",
      "Enhancing application performance and user experience"
    ],
  },

  {
    period: "2025 – Present",
    role: "Web Developer",
    company: "Magnion technology factory",
    type: "Internship ",
    color: "#10B981",
    achievements: [
      "Developed and maintained responsive web applications using React, HTML, CSS, and JavaScript",
      "Implemented frontend features and resolved production issues",
      "Integrated APIs and optimized website performance",
      "Collaborated with development teams to improve user experience"
    ],
  },

  {
    period: "2025 – 2026",
    role: "Java Developer",
    company: "ZF Group of Institute, Singapore",
    type: "Internship ",
    color: "#8B5CF6",
    achievements: [
      "Contributed to the development of the UPI Language platform",
      "Worked on direct hardware execution of mathematical operations",
      "Supported multilingual programming language concepts",
      "Participated in AI and systems research initiatives"
    ],
  },

  // {
  //   period: "2024 – Present",
  //   role: "IoT & Embedded Systems Developer",
  //   company: "Personal & Academic Projects",
  //   type: "Engineering",
  //   color: "#F59E0B",
  //   achievements: [
  //     "Built AquaGuard Smart Water Tank Monitoring System using NodeMCU and Node.js",
  //     "Developed AC Monitor Kit with ZPEM sensors and remote relay control",
  //     "Created Sim-Vital medical monitoring simulator using ESP32",
  //     "Integrated hardware devices with cloud dashboards and real-time monitoring systems"
  //   ],
  // },

  {
    period: "2023 – Present",
    role: "Full Stack Developer",
    company: "Personal Projects & Freelance",
    type: "Development",
    color: "#EF4444",
    achievements: [
      "Developed full-stack applications using React, FastAPI, Node.js, Firebase, and SQL",
      "Built symposium websites, dashboards, and automation tools",
      "Designed modern UI/UX interfaces for web and mobile applications",
      "Accumulated 2+ years of experience in software development"
    ],
  },
];
function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-28 relative"
      style={{ zIndex: 1, background: "#F8FAFC" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <Pill label="Experience" />
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Career Journey
          </h2>
          {/* <p className="mt-4 text-slate-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            A continuous path of learning, shipping, and improving.
          </p> */}
        </FadeUp>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-sky-200 via-slate-200 to-transparent hidden sm:block" />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="flex gap-6">
                  {/* Dot */}
                  <div className="flex-shrink-0 hidden sm:block mt-1">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ background: exp.color, boxShadow: `0 4px 16px ${exp.color}40` }}
                    >
                      <CheckCircle size={18} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="text-lg font-bold text-slate-900"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {exp.role}
                        </h3>
                        <div className="text-sm text-slate-500 mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className="px-3 py-1 rounded-lg text-xs font-bold"
                          style={{
                            background: `${exp.color}15`,
                            color: exp.color,
                            fontFamily: "'Geist Mono', monospace",
                          }}
                        >
                          {exp.type}
                        </span>
                        <span
                          className="text-xs text-slate-400 font-medium"
                          style={{ fontFamily: "'Geist Mono', monospace" }}
                        >
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                          <span className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {a}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <Globe size={22} />,
    title: "Full Stack Web Development",
    desc: "End-to-end web applications built with React, Node.js, FastAPI, and PostgreSQL — designed for scale.",
    color: "#38BDF8",
    features: ["React / Next.js frontends", "RESTful & GraphQL APIs", "Database architecture", "CI/CD deployment"],
  },
  {
    icon: <Smartphone size={22} />,
    title: "Mobile App Development",
    desc: "Beautiful, performant cross-platform mobile apps using Flutter that feel native on both iOS and Android.",
    color: "#10B981",
    features: ["Flutter & Dart", "Firebase integration", "Push notifications", "Offline-first design"],
  },
  {
    icon: <Terminal size={22} />,
    title: "Python Development",
    desc: "Automation scripts, data pipelines, web scrapers, and CLI tools built with Python best practices.",
    color: "#8B5CF6",
    features: ["Automation & scripting", "Data processing", "Web scraping", "API development"],
  },
  {
    icon: <Layers size={22} />,
    title: "API Development",
    desc: "Fast, secure, and well-documented REST APIs and microservices using FastAPI, Node.js, and Django.",
    color: "#F59E0B",
    features: ["FastAPI / Django REST", "JWT authentication", "Rate limiting", "OpenAPI docs"],
  },
  {
    icon: <Wifi size={22} />,
    title: "IoT Solution Development",
    desc: "End-to-end IoT systems from hardware (ESP32/Arduino) to cloud dashboard — fully connected.",
    color: "#06B6D4",
    features: ["ESP32 / Arduino firmware", "MQTT & WebSockets", "Sensor integration", "Real-time dashboards"],
  },
  {
    icon: <Cloud size={22} />,
    title: "Cloud Deployment",
    desc: "Production-ready deployments on AWS, GCP, or DigitalOcean with Docker, CI/CD, and monitoring.",
    color: "#0EA5E9",
    features: ["Docker & Kubernetes", "AWS / GCP / DO", "SSL & security", "Performance monitoring"],
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Dashboard Development",
    desc: "Data-rich analytics dashboards with real-time charts, KPIs, and custom filtering — beautiful and fast.",
    color: "#EF4444",
    features: ["Recharts / D3.js", "Real-time updates", "Exportable reports", "Custom KPI widgets"],
  },
  {
    icon: <Database size={22} />,
    title: "Database Design",
    desc: "Efficient, normalized database schemas with indexing, migrations, and query optimization.",
    color: "#F97316",
    features: ["MySQL / PostgreSQL", "MongoDB schemas", "Query optimization", "Data migrations"],
  },
];

function ServiceCard({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <FadeUp delay={index * 0.06}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: easeOut }}
        className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all duration-300 h-full cursor-pointer relative overflow-hidden"
        style={{
          boxShadow: hovered ? `0 16px 48px ${svc.color}20` : "0 1px 4px rgba(15,23,42,0.05)",
          borderColor: hovered ? `${svc.color}40` : "#E2E8F0",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Gradient glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(ellipse at 20% 20%, ${svc.color}08 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
          }}
        />

        <div
          className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
          style={{
            background: hovered ? svc.color : `${svc.color}15`,
            color: hovered ? "white" : svc.color,
            boxShadow: hovered ? `0 8px 20px ${svc.color}40` : "none",
          }}
        >
          {svc.icon}
        </div>
        <h3
          className="relative font-bold text-slate-900 mb-2"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {svc.title}
        </h3>
        <p
          className="relative text-sm text-slate-500 leading-relaxed mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {svc.desc}
        </p>
        <ul className="relative space-y-1.5">
          {svc.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-xs text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: svc.color }} />
              {f}
            </li>
          ))}
        </ul>
      </motion.div>
    </FadeUp>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-28 relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <Pill label="Services" />
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            What I Offer
          </h2>
          {/* <p className="mt-4 text-slate-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Full-spectrum engineering services — from idea to production, solo or as a team extension.
          </p> */}
        </FadeUp>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────────

// const PROCESS_STEPS = [
//   { n: "01", icon: <BookOpen size={20} />, title: "Discovery", desc: "Deep-dive into your goals, users, and technical constraints. Define scope and success metrics." },
//   { n: "02", icon: <BarChart2 size={20} />, title: "Planning", desc: "Architecture decisions, tech stack selection, sprint planning, and milestone roadmap." },
//   { n: "03", icon: <Layers size={20} />, title: "UI/UX Design", desc: "Wireframes, component design, design system setup. Beautiful before a line of code." },
//   { n: "04", icon: <Code2 size={20} />, title: "Development", desc: "Clean, tested, documented code. Daily commits, transparent progress, zero black boxes." },
//   { n: "05", icon: <CheckCircle size={20} />, title: "Testing", desc: "Unit tests, integration tests, QA cycles. Every edge case caught before deployment." },
//   { n: "06", icon: <Rocket size={20} />, title: "Deployment", desc: "Production launch with CI/CD, monitoring, SSL, performance tuning, and rollback plans." },
//   { n: "07", icon: <Wrench size={20} />, title: "Maintenance", desc: "Ongoing support, bug fixes, feature iterations. Long-term partnership, not one-and-done." },
// ];

// function ProcessSection() {
//   return (
//     <section
//       className="py-28 relative overflow-hidden"
//       style={{ zIndex: 1, background: "#F8FAFC" }}
//     >
//       <div className="max-w-7xl mx-auto px-6">
//         <FadeUp className="text-center mb-16">
//           <Pill label="How I Work" />
//           <h2
//             className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             Development Process
//           </h2>
//           <p className="mt-4 text-slate-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
//             Seven phases. Zero surprises. Consistent delivery.
//           </p>
//         </FadeUp>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {PROCESS_STEPS.map((step, i) => (
//             <FadeUp key={step.n} delay={i * 0.07}>
//               <div className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full group hover:border-sky-200 transition-all duration-300">
//                 <div
//                   className="text-[60px] font-black leading-none mb-4 select-none"
//                   style={{
//                     fontFamily: "'Plus Jakarta Sans', sans-serif",
//                     color: "#F1F5F9",
//                     letterSpacing: "-2px",
//                   }}
//                 >
//                   {step.n}
//                 </div>
//                 <div
//                   className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white"
//                   style={{ background: "linear-gradient(135deg,#38BDF8,#0EA5E9)", boxShadow: "0 4px 14px rgba(56,189,248,0.3)" }}
//                 >
//                   {step.icon}
//                 </div>
//                 <h3
//                   className="font-bold text-slate-900 mb-2"
//                   style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//                 >
//                   {step.title}
//                 </h3>
//                 <p className="text-sm text-slate-500 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
//                   {step.desc}
//                 </p>

//                 {/* Connector line */}
//                 {i < PROCESS_STEPS.length - 1 && i !== 3 && (
//                   <div className="absolute top-10 -right-2.5 w-5 h-px hidden lg:block" style={{ background: "#E2E8F0" }} />
//                 )}
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Tech Stack Section ───────────────────────────────────────────────────────

const TECH_STACK = [
  { name: "Python", color: "#3776AB", bg: "#EBF3FB" },
  { name: "Flutter", color: "#02569B", bg: "#E8F2FC" },
  { name: "FastAPI", color: "#009688", bg: "#E0F4F1" },
  { name: "Node.js", color: "#339933", bg: "#E8F5E9" },
  { name: "React", color: "#61DAFB", bg: "#E3F8FD" },
  { name: "Firebase", color: "#FFCA28", bg: "#FFFDE7" },
  { name: "MySQL", color: "#4479A1", bg: "#E9F1F8" },
  { name: "MongoDB", color: "#47A248", bg: "#E8F5E9" },
  { name: "Docker", color: "#2496ED", bg: "#E8F4FD" },
  { name: "ESP32", color: "#E7352C", bg: "#FEECEB" },
  { name: "Arduino", color: "#00979D", bg: "#E0F5F5" },
  { name: "OpenCV", color: "#5C3EE8", bg: "#EFECFD" },
  { name: "Git", color: "#F05032", bg: "#FEF0ED" },
  { name: "Linux", color: "#FCC624", bg: "#FFFDE5" },
  { name: "Raspberry Pi", color: "#C51A4A", bg: "#FCE8EE" },
  { name: "Tailwind", color: "#06B6D4", bg: "#E0F7FA" },
];

function TechStackSection() {
  return (
    <section className="py-28 relative" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <Pill label="Tech Stack" />
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Tools of the Trade
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            A curated stack built for reliability, speed, and modern developer experience.
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {TECH_STACK.map((tech, i) => (
            <FadeUp key={tech.name} delay={i * 0.04}>
              <motion.div
                whileHover={{ y: -4, scale: 1.04 }}
                transition={{ duration: 0.2, ease: easeOut }}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-white shadow-sm cursor-default hover:shadow-lg transition-shadow duration-300"
                style={{ minHeight: 80 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2 text-xs font-black"
                  style={{ background: tech.bg, color: tech.color, fontFamily: "'Geist Mono', monospace" }}
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
                <span
                  className="text-[11px] font-semibold text-slate-600 text-center leading-tight"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {tech.name}
                </span>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

// const TESTIMONIALS = [
//   {
//     name: "Arjun Mehta",
//     role: "Startup Founder",
//     company: "TechVentures India",
//     review: "Saravanan delivered our entire SaaS platform in 6 weeks — clean code, great communication, and zero surprises. Rare combination in a freelancer.",
//     rating: 5,
//     avatar: "AM",
//     color: "#38BDF8",
//   },
//   {
//     name: "Priya Nair",
//     role: "Product Manager",
//     company: "HealthFirst Solutions",
//     review: "The Blood Donor app he built has saved lives — literally. His technical skills are matched by genuine care for the problem he's solving.",
//     rating: 5,
//     avatar: "PN",
//     color: "#10B981",
//   },
//   {
//     name: "Ravi Shankar",
//     role: "IoT Engineer",
//     company: "SmartFactory Labs",
//     review: "Our AC monitoring project needed someone who understood both hardware and cloud. Saravanan handled ESP32 firmware, FastAPI backend, and React dashboard — all of it.",
//     rating: 5,
//     avatar: "RS",
//     color: "#8B5CF6",
//   },
//   {
//     name: "Keerthi Reddy",
//     role: "Small Business Owner",
//     company: "KR Textiles",
//     review: "He built our inventory management system from scratch, trained our team, and follows up regularly. This is what great freelancing looks like.",
//     rating: 5,
//     avatar: "KR",
//     color: "#F59E0B",
//   },
// ];

// function TestimonialsSection() {
//   const [idx, setIdx] = useState(0);

//   function prev() { setIdx((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1)); }
//   function next() { setIdx((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1)); }

//   const t = TESTIMONIALS[idx];

//   return (
//     <section
//       className="py-28 relative"
//       style={{ zIndex: 1, background: "#F8FAFC" }}
//     >
//       <div className="max-w-4xl mx-auto px-6">
//         <FadeUp className="text-center mb-16">
//           <Pill label="Testimonials" />
//           <h2
//             className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             What Clients Say
//           </h2>
//         </FadeUp>

//         <FadeUp delay={0.1}>
//           <div className="relative bg-white rounded-3xl p-10 border border-slate-100 shadow-lg overflow-hidden">
//             {/* Big quote */}
//             <div
//               className="absolute -top-4 -left-4 text-[120px] font-black leading-none select-none"
//               style={{ color: "#F1F5F9", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//             >
//               "
//             </div>

//             <div className="relative">
//               {/* Stars */}
//               <div className="flex gap-1 mb-6">
//                 {Array.from({ length: t.rating }).map((_, i) => (
//                   <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
//                 ))}
//               </div>

//               <p
//                 className="text-xl text-slate-700 leading-relaxed mb-8 font-medium"
//                 style={{ fontFamily: "'Inter', sans-serif" }}
//               >
//                 "{t.review}"
//               </p>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                   <div
//                     className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
//                     style={{ background: t.color }}
//                   >
//                     {t.avatar}
//                   </div>
//                   <div>
//                     <div className="font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
//                       {t.name}
//                     </div>
//                     <div className="text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
//                       {t.role}, {t.company}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={prev}
//                     className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all"
//                   >
//                     <ChevronLeft size={16} />
//                   </button>
//                   <button
//                     onClick={next}
//                     className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all"
//                   >
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Dots */}
//           <div className="flex justify-center gap-2 mt-6">
//             {TESTIMONIALS.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setIdx(i)}
//                 className="rounded-full transition-all duration-300"
//                 style={{
//                   width: i === idx ? 24 : 8,
//                   height: 8,
//                   background: i === idx ? "#0EA5E9" : "#E2E8F0",
//                 }}
//               />
//             ))}
//           </div>
//         </FadeUp>
//       </div>
//     </section>
//   );
// }

// // ─── Currently Building ───────────────────────────────────────────────────────

// const BUILDING = [
//   {
//     title: "Smart Wallet v2",
//     desc: "Next-gen anti-theft wallet with ultra-wideband positioning, solar charging, and AI-powered loss prediction.",
//     progress: 65,
//     status: "In Development",
//     color: "#F59E0B",
//     eta: "Q3 2026",
//   },
//   {
//     title: "AC Monitor Platform",
//     desc: "Multi-unit AC management SaaS for commercial buildings with predictive maintenance and energy optimization.",
//     progress: 45,
//     status: "Alpha",
//     color: "#06B6D4",
//     eta: "Q4 2026",
//   },
//   {
//     title: "AI Document Assistant",
//     desc: "Intelligent document processing pipeline using OCR + LLM for automated data extraction and classification.",
//     progress: 30,
//     status: "Research",
//     color: "#8B5CF6",
//     eta: "Q1 2027",
//   },
//   {
//     title: "IoT Research Hub",
//     desc: "Open-source knowledge base and project templates for ESP32 / Arduino developers with real-world examples.",
//     progress: 55,
//     status: "Beta",
//     color: "#10B981",
//     eta: "Q3 2026",
//   },
// ];

// function CurrentlyBuildingSection() {
//   return (
//     <section className="py-28 relative" style={{ zIndex: 1 }}>
//       <div className="max-w-7xl mx-auto px-6">
//         <FadeUp className="text-center mb-16">
//           <Pill label="Live Work" />
//           <h2
//             className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
//             style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//           >
//             Currently Building
//           </h2>
//           <p className="mt-4 text-slate-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
//             What's on my workbench right now — active projects in various stages.
//           </p>
//         </FadeUp>

//         <div className="grid sm:grid-cols-2 gap-6">
//           {BUILDING.map((b, i) => (
//             <FadeUp key={b.title} delay={i * 0.08}>
//               <div className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow duration-300 group">
//                 <div className="flex items-start justify-between mb-5">
//                   <div>
//                     <h3
//                       className="font-bold text-slate-900 text-lg"
//                       style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
//                     >
//                       {b.title}
//                     </h3>
//                     <span
//                       className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold"
//                       style={{ background: `${b.color}15`, color: b.color, fontFamily: "'Geist Mono', monospace" }}
//                     >
//                       <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: b.color }} />
//                       {b.status}
//                     </span>
//                   </div>
//                   <span
//                     className="text-xs font-semibold text-slate-400 border border-slate-100 px-3 py-1 rounded-lg"
//                     style={{ fontFamily: "'Geist Mono', monospace" }}
//                   >
//                     ETA {b.eta}
//                   </span>
//                 </div>

//                 <p className="text-sm text-slate-500 leading-relaxed mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
//                   {b.desc}
//                 </p>

//                 {/* Progress bar */}
//                 <div>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-xs font-medium text-slate-400" style={{ fontFamily: "'Inter', sans-serif" }}>
//                       Progress
//                     </span>
//                     <span className="text-xs font-bold" style={{ color: b.color, fontFamily: "'Geist Mono', monospace" }}>
//                       {b.progress}%
//                     </span>
//                   </div>
//                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
//                     <div
//                       className="h-full rounded-full transition-all duration-1000"
//                       style={{
//                         width: `${b.progress}%`,
//                         background: `linear-gradient(90deg, ${b.color}, ${b.color}90)`,
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </FadeUp>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({
    name: "", email: "", company: "", type: "", budget: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await fetch(
          "https://formcarry.com/s/0L5WtXMlcBI",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(form),
          }
        );

        if (response.ok) {
          setSent(true);

          setForm({
            name: "",
            email: "",
            company: "",
            type: "",
            budget: "",
            message: "",
          });
        } else {
          alert("Failed to send message.");
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong.");
      }
    };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all duration-200 bg-white";

  return (
    <section
      id="contact"
      className="py-28 relative"
      style={{ zIndex: 1, background: "#F8FAFC" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <Pill label="Get In Touch" />
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Let's Build Something{" "}
            <span style={{ color: "#0EA5E9" }}>Amazing</span> Together
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            Have a project in mind? I'm currently accepting new clients. Drop a message and I'll reply within 24 hours.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left info */}
          <FadeUp className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h3
                  className="text-lg font-bold text-slate-900 mb-5"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: <Mail size={18} />, label: "Gmail", value: "r.saravanan1282005@gmail.com", color: "#38BDF8" },
                    { icon: <Phone size={18} />, label: "Phone", value: "+91 9360899117", color: "#10B981" },
                    { icon: <MapPin size={18} />, label: "Location", value: "Karaikudi,Tamil Nadu, India", color: "#8B5CF6" },
                  ].map((info) => (
                    <div key={info.label} className="flex items-center gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${info.color}15`, color: info.color }}
                      >
                        {info.icon}
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {info.label}
                        </div>
                        <div className="text-sm font-semibold text-slate-700" style={{ fontFamily: "'Inter', sans-serif" }}>
                          {info.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-sm font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Find Me Online
                </h3>
                <div className="flex gap-3">
                  {[
                    { icon: <Github size={18} />, label: "GitHub", color: "#0F172A",href: "https://github.com/Saravanan-codex/" },
                    { icon: <Linkedin size={18} />, label: "LinkedIn", color: "#0A66C2" ,href: "https://www.linkedin.com/in/saravanan-r-b1955437a/" },
                    // { icon: <Instagram size={18} />, label: "Instagram", color: "#E1306C" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      className="w-11 h-11 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                      style={{ ["--hover-bg" as string]: s.color }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = s.color;
                        (e.currentTarget as HTMLButtonElement).style.borderColor = s.color;
                        (e.currentTarget as HTMLButtonElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "";
                        (e.currentTarget as HTMLButtonElement).style.color = "";
                      }}
                    >
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* <div
                className="rounded-2xl p-6"
                style={{ background: "linear-gradient(135deg,#F0F9FF,#E0F2FE)", border: "1px solid #BAE6FD" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Available for new projects
                  </span>
                </div>
                <p className="text-sm text-slate-600" style={{ fontFamily: "'Inter', sans-serif" }}>
                  I'm open to freelance contracts, part-time roles, and full-time opportunities. Typical response time: &lt;24 hours.
                </p>
              </div> */}
            </div>
          </FadeUp>

          {/* Right — form */}
          <FadeUp delay={0.15} className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              {sent ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: "linear-gradient(135deg,#38BDF8,#0EA5E9)" }}
                  >
                    <CheckCircle size={28} color="white" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-slate-900 mb-2"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Company name (optional)"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputCls}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Project Type
                      </label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className={inputCls}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Select type</option>
                        <option>Web Application</option>
                        <option>Mobile App</option>
                        <option>IoT System</option>
                        <option>API Development</option>
                        <option>Dashboard</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Budget Range
                      </label>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className={inputCls}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        <option value="">Select budget</option>
                        <option>{"< 2000"}</option>
                        <option>3000 - 5000</option>
                        <option>5000 – 8000</option>
                        <option>8000 – 10,000</option>
                        <option>{"10,000+"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Project Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell me about your project, goals, timeline, and any specific requirements..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputCls} resize-none`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-xl"
                    style={{
                      background: "linear-gradient(135deg,#38BDF8,#0EA5E9)",
                      boxShadow: "0 4px 20px rgba(56,189,248,0.35)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <Send size={15} />
                    Send Message
                    <ArrowRight size={15} />
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="relative py-14 border-t border-slate-100" style={{ zIndex: 1, background: "#0F172A" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg,#38BDF8,#0EA5E9)" }}
            >
              SR
            </div>
            <span className="font-semibold text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Saravanan Ravi
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-sm text-slate-400 hover:text-white transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />, href: "https://github.com/Saravanan-codex/" },
              { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/saravanan-r-b1955437a/" },
              // { icon: <Instagram size={16} />, href: "#" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="w-9 h-9 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
            © 2026 Saravanan R. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="relative min-h-screen bg-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Background />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        {/* <ProcessSection /> */}
        <TechStackSection />
        {/* <TestimonialsSection /> */}
        {/* <CurrentlyBuildingSection /> */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
