import { useTranslation } from "react-i18next";
import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Zap, ArrowRight } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="footer"
      className="relative border-t overflow-hidden"
      style={{
        background: "#050a0f",
        borderColor: "rgba(255, 45, 85, 0.2)",
      }}
    >
      {/* Glows ambientales */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_100%,rgba(255,45,85,0.04),transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-redteam/40 to-transparent" />

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-sm transition-all duration-300 hover:scale-110"
          style={{
            background: "rgba(255,45,85,0.1)",
            border: "1px solid rgba(255,45,85,0.5)",
            color: "#ff2d55",
            boxShadow: "0 0 15px rgba(255,45,85,0.25)",
          }}
          aria-label="Volver arriba"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-10">

          {/* Brand */}
          <div className="text-center lg:text-left">
            <div className="mb-4 flex items-center gap-3 justify-center lg:justify-start">
              <Terminal className="w-5 h-5 text-redteam" />
              <h3 className="font-SpaceMono text-2xl font-bold text-white">
                JHUNIORM<span className="text-redteam">.DEV</span>
              </h3>
            </div>
            <p className="font-jetbrains text-xs text-terminal/60 mb-3 tracking-wider">
              // status: online | systems: operational
            </p>
            <p className="text-[#94a3b8] text-sm leading-relaxed max-w-md mx-auto lg:mx-0 font-['Inter']">
              {t("Footer.description")}
            </p>
          </div>

          {/* Contacto y sociales */}
          <div className="text-center sm:text-right">
            <h4 className="font-SpaceMono text-base font-bold text-white mb-5">
              {t("Footer.connect")}
            </h4>
            <div className="flex justify-center sm:justify-end gap-3 mb-6">
              <a href="https://github.com/JhuniorM" aria-label="GitHub" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.5)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(255,45,85,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                <Github className="w-5 h-5 text-[#94a3b8] group-hover:text-redteam transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/jhunior-mendoza-conqui/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,200,255,0.5)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,200,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                <Linkedin className="w-5 h-5 text-[#94a3b8] group-hover:text-cyber transition-colors" />
              </a>
              <a href="mailto:mendozajhunior90@gmail.com" rel="noopener" aria-label="Email"
                className="w-10 h-10 rounded-sm flex items-center justify-center transition-all duration-300 group"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,159,0.5)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(0,255,159,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                <Mail className="w-5 h-5 text-[#94a3b8] group-hover:text-terminal transition-colors" />
              </a>
            </div>

            {/* WhatsApp CTA */}
            <div className="flex justify-center sm:justify-end">
              <a
                href="https://wa.me/51946494623?text=¡Hola!%20Me%20interesa%20colaborar%20contigo%20en%20un%20proyecto.%20¿Podemos%20hablar?"
                target="_blank" rel="noopener noreferrer"
                aria-label={t("AriaLabels.whatsapp_contact")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-sm transition-all duration-300 font-jetbrains text-xs"
                style={{
                  background: "rgba(0,255,159,0.05)",
                  border: "1px solid rgba(0,255,159,0.3)",
                  color: "#00ff9f",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,159,0.1)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,255,159,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,255,159,0.05)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <Zap className="w-3 h-3" />
                <span>{t("Footer.collaborate")}</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: "linear-gradient(90deg, transparent, rgba(255,45,85,0.3), transparent)" }} />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-jetbrains text-xs text-[#94a3b8]/50">
            © 2026 JHUNIORM.DEV — {t("Footer.rights")}
          </p>
          <p className="font-jetbrains text-xs text-redteam/40">
            // all systems operational ●
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
