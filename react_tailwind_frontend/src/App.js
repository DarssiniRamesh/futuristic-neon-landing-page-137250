import React, { useEffect, useMemo, useState } from "react";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import "./App.css";

/**
 * Neon Cyber theme tokens used across the app
 */
const THEME = {
  primary: "#10B981",
  secondary: "#F59E0B",
  error: "#EF4444",
  bg: "#0F172A",
  surface: "#1F2937",
};

/**
 * Utility: className combiner
 */
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Navbar component with sticky position and smooth scroll
 */
// PUBLIC_INTERFACE
function Navbar() {
  /** Neon-glow border on scroll */
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkCls =
    "cursor-pointer px-3 py-2 rounded-lg text-sm md:text-base font-semibold text-white/80 hover:text-white transition-colors";

  return (
    <nav
      className={cx(
        "fixed top-0 left-0 right-0 z-50 backdrop-blur-md",
        "bg-[rgba(15,23,42,0.7)] border-b",
        elevated ? "border-emerald-400/40 shadow-neon" : "border-white/10"
      )}
      role="navigation"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-neon-sm" />
          <span className="font-display text-lg md:text-2xl neon-text">
            Neon<span className="text-emerald-400">Cyber</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <ScrollLink to="home" smooth duration={500} offset={-80} className={linkCls}>
            Home
          </ScrollLink>
          <ScrollLink to="about" smooth duration={600} offset={-80} className={linkCls}>
            About
          </ScrollLink>
          <ScrollLink to="features" smooth duration={700} offset={-80} className={linkCls}>
            Features
          </ScrollLink>
          <ScrollLink to="contact" smooth duration={800} offset={-80} className={linkCls}>
            Contact
          </ScrollLink>
        </div>
        <div className="flex md:hidden">
          <ScrollLink
            to="contact"
            smooth
            duration={700}
            offset={-80}
            className="px-3 py-2 rounded-md border border-emerald-500/40 text-emerald-300 hover:text-white hover:border-emerald-400 transition-colors"
          >
            Get in touch
          </ScrollLink>
        </div>
      </div>
    </nav>
  );
}

/**
 * Hero section with animated background
 */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center hero-animate overflow-hidden"
      aria-label="Home"
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(16,185,129,0.15) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
        style={{ background: THEME.primary }}
      />
      <div
        className="absolute -bottom-32 -left-24 w-[380px] h-[380px] rounded-full blur-3xl opacity-20"
        style={{ background: THEME.secondary }}
      />
      <div className="relative z-10 max-w-5xl w-full px-6 pt-24 md:pt-28 text-center">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight neon-text">
          Futuristic Interfaces, Bold Performance.
        </h1>
        <p className="mt-5 text-base md:text-lg text-white/70 max-w-3xl mx-auto">
          Experience the Neon Cyber design system — a sleek, high-contrast aesthetic with glowing accents,
          fluid animations, and crisp typography. Built with React and Tailwind for speed and clarity.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <ScrollLink
            to="features"
            smooth
            duration={700}
            offset={-80}
            className="glow-hover inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:text-white hover:border-emerald-400"
          >
            <i className="fa-solid fa-bolt"></i> Explore Features
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth
            duration={700}
            offset={-80}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-white/80 hover:text-white border border-white/10 hover:border-white/20"
          >
            <i className="fa-solid fa-circle-info"></i> Learn More
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}

/**
 * About section
 */
function About() {
  return (
    <section id="about" className="relative py-24 md:py-28 bg-[var(--bg)]" aria-label="About">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mb-4">
              Built for speed. Designed for impact.
            </h2>
            <p className="text-white/70">
              This landing page template showcases a bold neon theme, smooth scrolling, and interactive UI elements.
              It’s beginner-friendly and lightweight, relying only on React and Tailwind CSS. No backend required.
            </p>
            <ul className="mt-6 space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-emerald-400 mt-1"></i>
                Neon glow accents and animated hero
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-emerald-400 mt-1"></i>
                Sticky navbar with smooth section navigation
              </li>
              <li className="flex items-start gap-3">
                <i className="fa-solid fa-check text-emerald-400 mt-1"></i>
                Modular components and responsive layout
              </li>
            </ul>
          </div>
          <div className="relative p-6 rounded-2xl bg-[var(--surface)] border border-white/10 scanline">
            <div
              className="absolute -inset-0.5 rounded-2xl opacity-20 blur-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(245,158,11,0.25))",
              }}
            />
            <div className="relative rounded-lg border border-emerald-500/30 p-5 neon-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center neon-ring">
                  <i className="fa-solid fa-shield text-emerald-300"></i>
                </div>
                <div>
                  <p className="font-semibold">Clean Architecture</p>
                  <p className="text-sm text-white/60">Simple, readable, scalable code.</p>
                </div>
              </div>
              <div className="mt-4 text-white/70 text-sm">
                Designed with maintainability in mind, this template is a solid starting point for any modern landing page.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Single Feature Card
 */
function FeatureCard({ icon, title, description }) {
  return (
    <div className="group relative p-6 rounded-2xl bg-[var(--surface)] border border-white/10 overflow-hidden glow-hover">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(245,158,11,0.10))",
        }}
      />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center neon-ring">
          <i className={cx(icon, "text-emerald-300 text-xl")}></i>
        </div>
        <h3 className="mt-4 font-semibold text-xl">{title}</h3>
        <p className="mt-2 text-white/65">{description}</p>
        <button className="mt-5 inline-flex items-center gap-2 text-emerald-300 hover:text-white transition-colors">
          Learn more <i className="fa-solid fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  );
}

/**
 * Features grid section
 */
function Features() {
  const items = useMemo(
    () => [
      {
        icon: "fa-solid fa-wand-magic-sparkles",
        title: "Animated Hero",
        description:
          "Make an entrance with subtle glow, gradients, and dynamic background elements.",
      },
      {
        icon: "fa-solid fa-compass-drafting",
        title: "Sticky Navbar",
        description: "Navigate sections with smooth scrolling and a persistent neon glow bar.",
      },
      {
        icon: "fa-solid fa-cube",
        title: "Interactive Cards",
        description:
          "Hover effects, neon borders, and tactile feedback encourage exploration.",
      },
      {
        icon: "fa-solid fa-envelope-circle-check",
        title: "Contact Form",
        description:
          "Lightweight validation and accessible form controls. No backend required.",
      },
    ],
    []
  );

  return (
    <section id="features" className="relative py-24 md:py-28" aria-label="Features">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold">Features</h2>
          <p className="mt-3 text-white/70">
            A curated set of UI interactions that emphasize clarity and responsiveness.
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <FeatureCard key={it.title} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Contact form with simple validation
 */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", message: "" });
      }, 2000);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-28 bg-[var(--surface)]" aria-label="Contact">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold">Contact</h2>
          <p className="mt-3 text-white/70">Questions or feedback? Send a message.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-5 bg-black/10 p-6 md:p-8 rounded-2xl border border-white/10"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="contact-name" className="block text-sm mb-1 text-white/80">Name</label>
              <input
                id="contact-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={cx(
                  "w-full px-4 py-3 rounded-lg bg-black/30 border outline-none",
                  errors.name ? "border-red-400/60" : "border-white/10 focus:border-emerald-400/50"
                )}
                placeholder="Jane Doe"
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-sm text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm mb-1 text-white/80">Email</label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={cx(
                  "w-full px-4 py-3 rounded-lg bg-black/30 border outline-none",
                  errors.email ? "border-red-400/60" : "border-white/10 focus:border-emerald-400/50"
                )}
                placeholder="jane@example.com"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm mb-1 text-white/80">Message</label>
            <textarea
              id="contact-message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={cx(
                "w-full h-32 px-4 py-3 rounded-lg bg-black/30 border outline-none resize-y",
                errors.message ? "border-red-400/60" : "border-white/10 focus:border-emerald-400/50"
              )}
              placeholder="Tell us more..."
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="text-sm text-red-400 mt-1">{errors.message}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="glow-hover px-6 py-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:text-white hover:border-emerald-400 inline-flex items-center gap-2"
              aria-label="Send message"
            >
              <i className="fa-solid fa-paper-plane"></i> Send
            </button>
            {sent && (
              <span className="text-emerald-300 flex items-center gap-2">
                <i className="fa-solid fa-circle-check"></i> Message sent!
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

/**
 * Footer
 */
function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-white/60 text-sm">
      <div className="max-w-6xl mx-auto px-6">
        <p>© {new Date().getFullYear()} NeonCyber UI. Built with React and Tailwind CSS.</p>
      </div>
    </footer>
  );
}

/**
 * Scroll to top button
 */
function ScrollTopBtn() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      onClick={() => scroll.scrollToTop({ duration: 600 })}
      className={cx(
        "fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center",
        "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 glow-hover",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        "transition-all"
      )}
      aria-label="Scroll to top"
      title="Back to Top"
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
}

/**
 * The App entry containing all sections
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Contact />
      </main>
      <Footer />
      <ScrollTopBtn />
    </div>
  );
}

export default App;
