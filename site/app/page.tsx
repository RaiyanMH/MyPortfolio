"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useRef } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  image: string;
  visibility: "Public" | "Private";
};

const placeholderProjects: Project[] = [
  {
    title: "Autoplayr",
    description:
      "Desktop app to record and replay keyboard/mouse actions with configurable hotkeys and macro management.",
    tech: [
      "Electron",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "lucide-react",
      "@nut-tree-fork/nut-js",
      "Global key listener",
    ],
    github: "https://github.com/RaiyanMH/Autoplayr",
    image: "/projects/Autoplayr.png",
    visibility: "Public",
  },
  {
    title: "RemindMail",
    description: "Not added yet",
    tech: ["Not added yet"],
    github: "#",
    image: "/window.svg",
    visibility: "Public",
  },
  {
    title: "HalalScanner",
    description: "Not added yet",
    tech: ["Not added yet"],
    github: "#",
    image: "/globe.svg",
    visibility: "Private",
  },
  {
    title: "ScanToBook",
    description: "Not added yet",
    tech: ["Not added yet"],
    github: "#",
    image: "/next.svg",
    visibility: "Public",
  },
  {
    title: "SkinCancerAlgorithms",
    description:
      "Machine learning project for classifying skin lesion images using various classification algorithms. Implements a complete ML pipeline from data preprocessing to model training and evaluation.",
    tech: [
      "Python",
      "scikit-learn",
      "numpy",
      "pandas",
      "matplotlib",
      "Pillow",
      "joblib",
      "KNN",
      "Logistic Regression",
      "SVM",
      "Decision Tree",
    ],
    github: "https://github.com/RaiyanMH/SkinCancerAlgorithms",
    image: "/projects/SkinCancerClassifier.png",
    visibility: "Private",
  },
  {
    title: "MobiletechApp",
    description: "Not added yet",
    tech: ["Not added yet"],
    github: "#",
    image: "/vercel.svg",
    visibility: "Private",
  },
];

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="font-sans">
      {/* Home */}
      <section id="home" className="relative overflow-hidden" ref={heroRef} onMouseMove={handleMouseMove}>
        {/* particles background */}
        <ParticlesBackground className="absolute inset-0 -z-10" color="#8b5cf6" linkColor="#7e22ce" />

        <div className="container-section min-h-[80vh] flex items-center">
          <div className="w-full text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              Hello 👋
              <br />
              I&apos;m <span className="text-[color:var(--accent)]">Raiyan</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto md:mx-0"
            >
              Software Engineering & Business Informatics Graduate.
              <br />I build clean, functional, and creative software solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
            >
              <a href="#about" className="btn-primary">Learn more about me</a>
              <Link
                href="https://www.linkedin.com/in/raiyan-m-haque/"
                target="_blank"
                className="btn-secondary"
              >
                Connect on LinkedIn
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* divider between home and content */}
      <div className="divider-grad my-10" />

      {/* About */}
      <section id="about" className="py-24 relative overflow-hidden bg-section-pattern">
        <div className="container-section">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-white/80 max-w-3xl">
            Hi, I’m a Software Engineering and Business Informatics graduate who loves turning ideas into working code. I’m driven by solving problems, meeting goals, and continuously learning new ways to build better software. I’m currently looking for opportunities to grow as a developer and contribute to projects that make technology more useful and accessible.
          </p>
          {/* Contact card removed per request; consolidated at bottom "Let's connect" */}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 relative overflow-hidden bg-section-pattern">
        <div className="container-section">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderProjects.map((p, idx) => (
              <button
                key={`${p.title}-${idx}`}
                onClick={() => setSelected(p)}
                className="card text-left p-5 hover:-translate-y-0.5 transition-transform hover-light"
              >
                <div className="aspect-video w-full rounded-xl bg-white/5 overflow-hidden relative">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover object-left-top" />
                  <span
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      p.visibility === "Public"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    }`}
                  >
                    {p.visibility}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="text-white/70 text-sm mt-1">{p.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-12 card p-6">
            <h3 className="text-xl font-semibold mb-2">Other Achievements</h3>
            <p className="text-white/80">
              Alongside my main projects, I’ve broadened my skills through a variety of creative and technical pursuits. I’ve designed and developed custom webpages, tackled Python problem-solving challenges and built interactive games in Unity using C++. I also enjoy 3D modeling with Blender to bring ideas to life visually.
            </p>
            <p className="text-white/80 mt-4">
              Beyond coding, I’m proficient with the Microsoft 365 suite — including Word, Excel, PowerPoint, and OneDrive — which helps me stay organised, communicate ideas clearly, and manage projects effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Resume */}
      <section id="resume" className="py-24 relative overflow-hidden bg-section-pattern">
        <div className="container-section">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Resume</h2>
          <p className="text-white/80 max-w-2xl">Download my CV using the button below.</p>
          <div className="mt-6">
            <a
              className="btn-primary hover-light"
              href="/cv/Raiyan_Haque_CV.pdf"
              download
            >
              Download My CV (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Let's Connect */}
      <section id="connect" className="py-20 relative overflow-hidden">
        <div className="container-section text-center">
          <div className="mb-8 divider-grad" />
          <h2 className="text-3xl sm:text-4xl font-bold">Let&apos;s connect</h2>
          <p className="text-white/75 mt-3 max-w-2xl mx-auto">
            I&apos;m open to opportunities and collaborations. Feel free to reach out.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:raiyanmhaque@gmail.com" className="btn-secondary hover-light">Email</a>
            <Link href="https://www.linkedin.com/in/raiyan-m-haque/" target="_blank" className="btn-secondary hover-light">LinkedIn</Link>
            <Link href="https://github.com/RaiyanMH" target="_blank" className="btn-primary hover-light">GitHub</Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4" onClick={() => setSelected(null)}>
          <div className="card w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold">{selected.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selected.visibility === "Public"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                    }`}
                  >
                    {selected.visibility}
                  </span>
                </div>
                <p className="text-white/75 mt-1">{selected.description}</p>
              </div>
              <button onClick={() => setSelected(null)} className="btn-secondary">Close</button>
            </div>
            <div className="aspect-video w-full rounded-xl bg-white/5 overflow-hidden mt-4">
              <img src={selected.image} alt={selected.title} className="w-full h-full object-cover object-left-top" />
            </div>
            <div className="mt-5">
              <h4 className="font-semibold">Tech Stack</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.tech.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm">{t}</span>
                ))}
              </div>
              <div className="mt-5">
                <Link href={selected.github} target="_blank" className="btn-primary hover-light">View on GitHub</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
