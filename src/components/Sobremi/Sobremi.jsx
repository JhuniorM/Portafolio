import React, { useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target } from "lucide-react";
import SkillsCarousel from "./SkillsCarousel";

gsap.registerPlugin(ScrollTrigger);

const DESCRIPTION = [
  { description: "Sobremi.descripcion.1" },
  { description: "Sobremi.descripcion.2" },
  { description: "Sobremi.descripcion.3" },
];

const Sobremi = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(skillsRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: skillsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sobremi"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050a0f 0%, #0a1628 60%, #050a0f 100%)" }}
    >
      {/* Grid pattern de fondo */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,45,85,0.08)' stroke-width='1'%3E%3Cpath d='M0 0h40v40H0z'/%3E%3C/g%3E%3C/svg%3E\")",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-redteam/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terminal/5 rounded-full blur-3xl -z-0 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto sm:px-6 md:px-8 py-12">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <div className="inline-block mb-3">
            <span className="font-jetbrains text-xs text-terminal/70 tracking-widest uppercase">
              // about.sys loaded
            </span>
          </div>
          <h2 className="rt-section-title mb-3">
            {t("Sobremi.sobre")}
          </h2>
          <p className="rt-section-subtitle">
            {t("Sobremi.subsobre")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Izquierda — About content ── */}
          <div ref={contentRef} className="space-y-6">
            <h3 className="font-jetbrains text-xl text-terminal glow-green-text mb-6">
              {t("Sobremi.conoceme")}
            </h3>

            <div className="space-y-4">
              {DESCRIPTION.map((desc, index) => (
                <div key={index}
                  className="group relative p-5 rounded-sm transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(10, 22, 40, 0.6)",
                    border: "1px solid rgba(255, 45, 85, 0.12)",
                    borderLeft: "3px solid rgba(255, 45, 85, 0.6)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.4)"; e.currentTarget.style.borderLeftColor = "#ff2d55"; e.currentTarget.style.boxShadow = "0 0 20px rgba(255,45,85,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.12)"; e.currentTarget.style.borderLeftColor = "rgba(255,45,85,0.6)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <span className="font-jetbrains text-redteam/50 text-xs mr-2">[{String(index + 1).padStart(2, "0")}]</span>
                  <p className="text-[#94a3b8] leading-relaxed text-sm sm:text-base inline">
                    {t(desc.description)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href="#projects" aria-label={t("AriaLabels.projects_section")}>
                <button className="btn-rt-primary flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {t("Sobremi.boton_proyecto")}
                </button>
              </a>
            </div>
          </div>

          {/* ── Derecha — Skills ── */}
          <div className="space-y-6">
            <h3 className="font-jetbrains text-xl text-terminal glow-green-text mb-6">
              {t("Mishabilidades.habher")}
            </h3>
            <div ref={skillsRef}>
              <SkillsCarousel />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Sobremi;
