import { Suspense, lazy, Component } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Code2, Cpu, Globe, ChevronDown } from "lucide-react";

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

const projects = [
  {
    title: "Neural Interface",
    desc: "AI-powered brain-computer interface simulation using real-time signal processing and machine learning.",
    tags: ["Python", "TensorFlow", "WebGL"],
    link: "#",
  },
  {
    title: "Quantum Mesh",
    desc: "Distributed system for quantum error correction visualization with interactive 3D node graphs.",
    tags: ["Rust", "Three.js", "WASM"],
    link: "#",
  },
  {
    title: "AutoGen Studio",
    desc: "Multi-agent automation framework powered by LLMs for complex workflow orchestration.",
    tags: ["TypeScript", "LangChain", "React"],
    link: "#",
  },
  {
    title: "Void Protocol",
    desc: "Zero-knowledge authentication system with cryptographic proof generation and verification.",
    tags: ["Solidity", "ZK-SNARKs", "Next.js"],
    link: "#",
  },
];

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
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-black/10 backdrop-blur-md border-b border-white/5"
    >
      <span className="text-white font-bold text-lg tracking-tight">MF</span>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        {["About", "Projects", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-white transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </div>
      <a
        href="mailto:hello@example.com"
        className="text-sm px-4 py-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors duration-200"
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
          <p className="mb-4 text-xs md:text-sm text-red-400 tracking-[0.3em] uppercase font-medium">
            Welcome to my portfolio
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Mohamed Fawzi
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-400 tracking-widest uppercase">
            Creative Developer &amp; AI Architect
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-8 flex items-center justify-center gap-4 pointer-events-auto"
          >
            <a
              href="#projects"
              className="px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gray-500 animate-bounce"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#050505] py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Selected Work</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                <ExternalLink
                  size={16}
                  className="text-gray-600 group-hover:text-red-400 transition-colors duration-200 mt-1"
                />
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
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
          <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Expertise</p>
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
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-red-400">{skill.icon}</span>
                <h3 className="text-white font-semibold">{skill.label}</h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-1 h-1 rounded-full bg-red-400/60" />
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
          <p className="text-red-400 text-xs tracking-[0.3em] uppercase mb-3">Let's Talk</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Get in Touch</h2>
          <p className="text-gray-500 text-base max-w-md mx-auto mb-10">
            I'm open to exciting opportunities, collaborations, or just a conversation about the future of tech.
          </p>
          <a
            href="mailto:hello@mfawzi.dev"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200 hover:scale-105 active:scale-95"
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
        <span className="text-gray-600 text-sm">© 2026 Mohamed Fawzi. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a href="#" className="text-gray-600 hover:text-white transition-colors duration-200">
            <Github size={18} />
          </a>
          <a href="#" className="text-gray-600 hover:text-white transition-colors duration-200">
            <Linkedin size={18} />
          </a>
          <a href="mailto:hello@mfawzi.dev" className="text-gray-600 hover:text-white transition-colors duration-200">
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
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
