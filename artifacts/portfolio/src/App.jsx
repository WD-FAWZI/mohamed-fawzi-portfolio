import { Suspense, lazy, Component, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Code2, Cpu, Globe, Download, Youtube } from "lucide-react";

const HeroScene = lazy(() => import("./components/HeroScene"));

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const TYPEWRITER_PHRASES = [
  "Creative Developer",
  "AI Architect",
  "Neurotech Enthusiast",
];

function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPEWRITER_PHRASES[phraseIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setPhraseIndex((i) => (i + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, phraseIndex]);

  return (
    <span className="text-[#00ffcc]">
      {displayed}
      <span className="animate-pulse text-[#00ffcc]/70">|</span>
    </span>
  );
}


const skills = [
  { icon: <Code2 size={20} />, label: "Frontend", items: ["React", "Next.js", "Three.js", "Framer Motion"] },
  { icon: <Cpu size={20} />, label: "AI & ML", items: ["PyTorch", "LangChain", "OpenAI", "HuggingFace"] },
  { icon: <Globe size={20} />, label: "Backend", items: ["Node.js", "Rust", "PostgreSQL", "Redis"] },
];

function NavBar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/20 backdrop-blur-md border-b border-[#00ffcc]/10"
    >
      <span className="text-[#00ffcc] font-bold text-lg tracking-tight font-mono">MF</span>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        {["About", "Projects", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-[#00ffcc] transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>
      <a
        href="mailto:hello@mfawzi.dev"
        className="text-sm px-4 py-2 rounded-full border border-[#00ffcc]/30 text-[#00ffcc] hover:bg-[#00ffcc]/10 transition-colors duration-200 font-mono"
      >
        Hire Me
      </a>
    </motion.nav>
  );
}

function HeroSection() {
  return (
    <section id="about" className="relative w-full h-screen overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0">
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </SceneErrorBoundary>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-center px-4"
        >
          <p className="mb-4 text-xs md:text-sm text-[#00ffcc]/70 tracking-[0.4em] uppercase font-mono">
            &lt; Neural Portfolio /&gt;
          </p>

          <h1 className="glitch text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(0,255,204,0.3)]">
            Mohamed Fawzi
          </h1>

          <p className="mt-5 text-base md:text-lg font-mono tracking-wider text-gray-400 h-7">
            <Typewriter />
          </p>

          <div className="mt-8 flex justify-center pointer-events-auto">
            <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 font-mono hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(0,255,204,0.4)] transition-all uppercase tracking-widest opacity-50 cursor-not-allowed"><Download size={18} /> Download Résumé</a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-6 flex items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-[#00ffcc] hover:bg-[#00e6b8] text-black text-sm font-semibold font-mono transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,255,204,0.4)]"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-[#00ffcc]/30 text-[#00ffcc] text-sm font-mono hover:bg-[#00ffcc]/10 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#00ffcc]/40 animate-bounce"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

const projectCards = [
  {
    title: "Etme'nan",
    desc: "AI Health-tech & Diabetes Monitoring Platform.",
    buttons: [
      { label: "Live Demo", icon: <ExternalLink size={15} />, href: "https://itminan.vercel.app" },
      { label: "Source", icon: <Github size={15} />, href: "#" },
    ],
  },
  {
    title: "H.I.M",
    desc: "The First Sudanese Regional Dialect Voice-Interactive AI Agent.",
    buttons: [
      { label: "Live Agent", icon: <ExternalLink size={15} />, href: "https://the-first-sudanese-ai-voice-agent.vercel.app" },
      { label: "Demo", icon: <Youtube size={15} />, href: "https://youtube.com/shorts/MZHNml5zLJY?si=IBndVxtR1JmiUBNq" },
    ],
  },
  {
    title: "ER Zero Latency",
    desc: "Mistral AI Hackathon - Computer Vision for Hospital Triage.",
    buttons: [
      { label: "Demo", icon: <Youtube size={15} />, href: "https://youtu.be/gyr2oWzzMWU?si=IBETu429eibqfwZd" },
      { label: "Source", icon: <Github size={15} />, href: "https://github.com/WD-FAWZI/ER-Zero-Latency" },
    ],
  },
  {
    title: "Medxam AI",
    desc: "AI Assistant for Student & Teacher Educational Question Generation.",
    buttons: [
      { label: "Live App", icon: <ExternalLink size={15} />, href: "https://medxam-ai.vercel.app/" },
      { label: "Source", icon: <Github size={15} />, href: "#" },
    ],
  },
];

function FeaturedProjectsSection() {
  return (
    <section id="projects" className="min-h-screen bg-[#050505] py-24 px-4 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[#00ffcc]/70 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
            &lt; Featured Work /&gt;
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCards.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,255,204,0.07) 0%, transparent 70%)" }}
              />
              <div className="relative z-10">
                <h3 className="text-white font-bold text-2xl tracking-tight mb-3">{project.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                <div className="flex items-center gap-4 mt-6">
                  {project.buttons.map((btn) => {
                    const isDisabled = btn.href === "#";
                    return isDisabled ? (
                      <span
                        key={btn.label}
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-gray-500 text-sm font-mono opacity-40 cursor-not-allowed select-none"
                      >
                        {btn.icon}
                        {btn.label}
                      </span>
                    ) : (
                      <a
                        key={btn.label}
                        href={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/40 text-cyan-300 text-sm font-mono hover:bg-cyan-400/10 hover:border-cyan-400/70 hover:shadow-[0_0_14px_rgba(0,255,204,0.25)] transition-all"
                      >
                        {btn.icon}
                        {btn.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="bg-[#050505] py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-[#00ffcc]/70 text-xs tracking-[0.4em] uppercase mb-3 font-mono">&lt; Expertise /&gt;</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#00ffcc]/20 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#00ffcc]">{skill.icon}</span>
                <h3 className="text-white font-semibold">{skill.label}</h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-1 h-1 rounded-full bg-[#00ffcc]/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="bg-[#050505] py-24 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-[#00ffcc]/70 text-xs tracking-[0.4em] uppercase mb-3 font-mono">&lt; Initiate Contact /&gt;</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Get in Touch</h2>
          <p className="text-gray-500 text-base max-w-md mx-auto mb-10">
            Open to exciting opportunities, collaborations, or a conversation about the future of AI and human-computer interaction.
          </p>
          <a
            href="mailto:hello@mfawzi.dev"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00ffcc] hover:bg-[#00e6b8] text-black font-semibold font-mono transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.35)]"
          >
            <Mail size={18} />
            Say Hello
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-8 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-gray-600 text-sm font-mono">© 2026 Mohamed Fawzi. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#" className="text-gray-600 hover:text-[#00ffcc] transition-colors duration-200">
            <Github size={18} />
          </a>
          <a href="#" className="text-gray-600 hover:text-[#00ffcc] transition-colors duration-200">
            <Linkedin size={18} />
          </a>
          <a href="mailto:hello@mfawzi.dev" className="text-gray-600 hover:text-[#00ffcc] transition-colors duration-200">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-[#050505] min-h-screen">
      <NavBar />
      <HeroSection />
      <FeaturedProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
