import React, { useEffect, useRef, useMemo } from "react";
import { Link } from "react-scroll";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2, Server, Settings, Shield, ShieldCheck, Target,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = { Code2, Server, Settings, Shield, ShieldCheck };

const Services = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const services = useMemo(() => {
    const data = t("Servicios.services", { returnObjects: true });
    if (!Array.isArray(data)) return [];
    return data;
  }, [t]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(gridRef.current, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.3,
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(ctaRef.current, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.5,
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%", toggleActions: "play none none reverse" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Índices de tarjetas cyber (las 2 primeras = Red Team y Blue Team)
  const cyberIds = [1, 2];

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#050a0f" }}
    >
      {/* Ambient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(255,45,85,0.04),transparent)]" />
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 4L56 19v26L30 48L4 45V19z' fill='none' stroke='rgba(255,45,85,0.07)' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "60px 52px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto sm:px-6 md:px-8 py-12">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-14">
          <span className="font-jetbrains text-xs text-redteam/60 tracking-widest uppercase">
            // services.list
          </span>
          <h2 className="rt-section-title mt-2 mb-3">{t("Servicios.title")}</h2>
          <p className="rt-section-subtitle">{t("Servicios.subtitle")}</p>
        </div>

        {/* Grid de servicios */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {services.map((service, idx) => {
            const IconComponent = ICON_MAP[service.icon] || Code2;
            const isCyber = cyberIds.includes(service.id);
            const isFirst = service.id === 1;

            return (
              <div
                key={service.id}
                className={`group relative p-6 rounded-sm transition-all duration-400 cursor-default ${
                  isFirst ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  background: isCyber
                    ? "rgba(255, 45, 85, 0.05)"
                    : "rgba(10, 22, 40, 0.6)",
                  border: isCyber
                    ? "1px solid rgba(255, 45, 85, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = isCyber ? "rgba(255,45,85,0.7)" : "rgba(0,255,159,0.4)";
                  e.currentTarget.style.boxShadow = isCyber
                    ? "0 0 30px rgba(255,45,85,0.15), inset 0 0 30px rgba(255,45,85,0.04)"
                    : "0 0 20px rgba(0,255,159,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = isCyber ? "rgba(255,45,85,0.3)" : "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Número de servicio */}
                <span className="absolute top-4 right-4 font-jetbrains text-xs opacity-30"
                  style={{ color: isCyber ? "#ff2d55" : "#00ff9f" }}>
                  [{String(idx + 1).padStart(2, "0")}]
                </span>

                {/* Ícono */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-sm mb-5 transition-all duration-300`}
                  style={{
                    background: isCyber ? "rgba(255,45,85,0.12)" : "rgba(0,255,159,0.08)",
                    border: isCyber ? "1px solid rgba(255,45,85,0.3)" : "1px solid rgba(0,255,159,0.2)",
                  }}>
                  <IconComponent className="w-6 h-6" style={{ color: isCyber ? "#ff2d55" : "#00ff9f" }} />
                </div>

                <h3 className="text-white font-SpaceMono font-bold text-base mb-3">
                  {service.title}
                </h3>
                <p className="text-[#94a3b8] text-sm leading-relaxed font-['Inter']">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <Link to="footer" smooth duration={500} className="inline-block" aria-label={t("Servicios.cta_aria")}>
            <button className="btn-rt-primary flex items-center gap-2 mx-auto">
              <Target className="w-4 h-4" />
              {t("Servicios.cta")}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
