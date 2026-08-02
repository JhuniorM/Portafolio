import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Github } from "./Icons/github.jsx";
import { Linkedin } from "./Icons/Linkedim.jsx";
import { useTranslation } from "react-i18next";
import { Gmail } from "./Icons/gmail.jsx";
import { gsap } from "gsap";
import FloatingIcons from "./FloatingIcons";
import OrbitingIcons from "./OrbitingIcons";

const Presentacion = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const leftContentRef = useRef(null);
  const typewriterRef = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const [nameText, setNameText] = useState("");
  const rightImageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-title",  { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.fromTo(".hero-subtitle", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3 });
      gsap.fromTo(".hero-description", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.6 });
      gsap.fromTo(".social-links a", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.9 });
      gsap.fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 1.2 });
      gsap.fromTo(".hero-image", { x: 100, opacity: 0, scale: 0.85 }, { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.5 });
      gsap.fromTo(".hero-badges", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setDisplayText(t("Presentacion.greeting"));
  }, [t]);

  useEffect(() => {
    const name = "Jhunior";
    setNameText("");
    let currentTimeline = null;

    const animateTypewriter = () => {
      if (currentTimeline) currentTimeline.kill();
      currentTimeline = gsap.timeline();
      currentTimeline.to({}, {
        duration: 0.5, ease: "none",
        onUpdate: function () {
          setNameText(name.substring(0, Math.floor(this.progress() * name.length)));
        },
      });
      currentTimeline.to({}, { duration: 2.5 });
      currentTimeline.to({}, {
        duration: 0.3, ease: "none",
        onUpdate: function () {
          setNameText(name.substring(0, Math.floor((1 - this.progress()) * name.length)));
        },
      });
      currentTimeline.to({}, { duration: 1.5 });
      currentTimeline.call(animateTypewriter);
    };

    const startDelay = gsap.delayedCall(1.5, animateTypewriter);
    return () => {
      startDelay.kill();
      if (currentTimeline) currentTimeline.kill();
      gsap.killTweensOf({});
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 lg:py-8 bg-matrix-900"
    >
      {/* Fondo oscuro con hex grid */}
      <div className="absolute inset-0 -z-10 bg-hex-grid" />
      {/* Glow ambiental */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(255,45,85,0.06),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_40%_60%_at_15%_50%,rgba(0,255,159,0.04),transparent)]" />

      {/* Línea de scan decorativa */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-redteam/30 to-transparent top-1/2 -z-5 pointer-events-none" />

      {/* Íconos flotantes */}
      <FloatingIcons />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">

          {/* ── Lado Izquierdo ── */}
          <div ref={leftContentRef} className="space-y-5 sm:space-y-6 lg:space-y-7 order-last lg:order-first mt-4 lg:mt-0">

            {/* Badges Red Team */}
            <div className="hero-badges flex gap-3 justify-center lg:justify-start">
              <span className="badge-redteam">● Red Team</span>
              <span className="badge-dev">&#60; Dev /&#62;</span>
            </div>

            {/* Título con efecto glitch */}
            <div className="text-white text-center lg:text-left">
              <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold py-1 font-SpaceMono tracking-tight">
                <span ref={typewriterRef}>
                  <span className="text-[#94a3b8]">{displayText}</span>
                  <span className="glitch-anim glow-red-text" style={{ color: "#ff2d55" }}>
                    {nameText}
                  </span>
                  {(nameText.length > 0 || displayText.length > 0) && (
                    <span
                      className="animate-blink-cursor"
                      style={{ color: "#ff2d55", animation: "blink-cursor 1s step-end infinite" }}
                    >
                      |
                    </span>
                  )}
                </span>
              </h1>

              {/* Subtítulo estilo terminal */}
              <div className="hero-subtitle mt-3">
                <span className="font-jetbrains text-base sm:text-lg text-[#94a3b8]">
                  <span className="text-terminal glow-green-text">$</span>{" "}
                  <span className="text-white/80">{t("Presentacion.subtitle")}</span>
                </span>
              </div>
            </div>

            {/* Descripción */}
            <div className="hero-description font-['Inter'] text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left px-4 sm:px-0 border-l-2 border-redteam/30 pl-4">
              {t("Presentacion.description")}
            </div>

            {/* Botones móvil */}
            <div className="hero-buttons flex flex-row gap-3 justify-center lg:hidden flex-wrap">
              <a href="#sobremi" aria-label={t("AriaLabels.about_section")}>
                <button className="btn-rt-primary">[&gt;_ {t("Presentacion.boton1")}]</button>
              </a>
              <a href={t("Presentacion.link-cv")} target="_blank" rel="noopener noreferrer" aria-label="Descargar CV" className="inline-block">
                <button className="btn-rt-secondary">[↓ {t("Presentacion.boton2")}]</button>
              </a>
            </div>

            {/* Social links */}
            <div className="social-links flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
              <a href="https://github.com/JhuniorM" aria-label="GitHub" target="_blank" rel="noopener noreferrer"
                className="group rounded-sm border border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 sm:py-2.5 sm:px-5 bg-white/5 hover:bg-redteam/10 hover:border-redteam/50 hover:scale-105 hover:shadow-glow-red transition-all duration-300">
                <Github className="text-[#94a3b8] group-hover:text-redteam h-4 w-4 sm:h-5 sm:w-5 transition-colors" />
                <span className="text-[#94a3b8] group-hover:text-redteam font-jetbrains font-medium transition-colors text-sm">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/jhunior-mendoza-conqui/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="group rounded-sm border border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 sm:py-2.5 sm:px-5 bg-white/5 hover:bg-cyber/10 hover:border-cyber/50 hover:scale-105 transition-all duration-300">
                <Linkedin className="text-[#94a3b8] group-hover:text-cyber h-4 w-4 sm:h-5 sm:w-5 transition-colors" />
                <span className="text-[#94a3b8] group-hover:text-cyber font-jetbrains font-medium transition-colors text-sm">LinkedIn</span>
              </a>
              <a href="mailto:mendozajhunior90@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email"
                className="group rounded-sm border border-white/10 flex justify-center items-center gap-x-2 py-2 px-4 sm:py-2.5 sm:px-5 bg-white/5 hover:bg-terminal/10 hover:border-terminal/50 hover:scale-105 transition-all duration-300">
                <Gmail className="text-[#94a3b8] group-hover:text-terminal h-4 w-4 sm:h-5 sm:w-5 transition-colors" />
                <span className="text-[#94a3b8] group-hover:text-terminal font-jetbrains font-medium transition-colors text-xs sm:text-sm">mendozajhunior90@gmail.com</span>
              </a>
            </div>

            {/* Botones desktop */}
            <div className="hero-buttons hidden lg:flex gap-4 justify-center lg:justify-start">
              <a href="#sobremi" aria-label={t("AriaLabels.about_section")}>
                <button className="btn-rt-primary">[&gt;_ {t("Presentacion.boton1")}]</button>
              </a>
              <a href={t("Presentacion.link-cv")} target="_blank" rel="noopener noreferrer" aria-label="Descargar CV" className="inline-block">
                <button className="btn-rt-secondary">[↓ {t("Presentacion.boton2")}]</button>
              </a>
            </div>
          </div>

          {/* ── Lado Derecho — Imagen ── */}
          <div ref={rightImageRef} className="flex justify-center order-first lg:order-last mt-24 sm:mt-24 lg:mt-0">
            <div className="hero-image relative group">
              {/* Foto con borde rojo pulsante */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden pulse-red-border transition-transform duration-500 lg:group-hover:scale-105">
                <img
                  src="/User/jhunior_photo.png"
                  alt="Jhunior Mendoza"
                  fetchpriority="high"
                  loading="eager"
                  className="w-full h-full object-cover object-top rounded-full"
                />
                {/* Overlay sutil rojo */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-redteam/10 rounded-full" />
              </div>

              {/* Glow rojo ambiental */}
              <div className="absolute inset-0 bg-gradient-to-br from-redteam/30 to-redteam/10 rounded-full blur-3xl -z-10 lg:group-hover:blur-2xl transition-all duration-500" />

              {/* Íconos orbitando */}
              <OrbitingIcons />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Presentacion;
