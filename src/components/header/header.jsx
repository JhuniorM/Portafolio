import "../../styles/header.css";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme, getImageSource, LANGUAGES, useLanguage } from "./themeUtils.jsx";
import MyAge from "../Myage/myage.jsx";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";
import Tooltip from "./Tooltip";
import { Menu, X, Terminal } from "lucide-react";

const OVERLAY_DURATION_MS = 160;

function Header() {
  const { t } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const currentLanguage = LANGUAGES.find((lang) => lang.code === language);
  const imageSource = getImageSource(theme);
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [entered, setEntered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const exitTimeoutRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    setIsExiting(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overlayVisible = menuOpen || isExiting;
  useEffect(() => {
    document.body.style.overflow = overlayVisible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [overlayVisible]);

  useEffect(() => {
    if (menuOpen && !isExiting) {
      setEntered(false);
      const id = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(id);
    }
  }, [menuOpen, isExiting]);

  const closeMenu = () => {
    if (!menuOpen) return;
    setIsExiting(true);
    exitTimeoutRef.current = window.setTimeout(() => {
      setMenuOpen(false);
      setIsExiting(false);
      exitTimeoutRef.current = null;
    }, OVERLAY_DURATION_MS);
  };

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <nav
        style={{
          background: scrolled
            ? "rgba(5, 10, 15, 0.95)"
            : "rgba(5, 10, 15, 0.8)",
          borderBottom: "1px solid rgba(255, 45, 85, 0.15)",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s ease",
        }}
        className={menuOpen ? "fixed inset-x-0 top-0 z-[100]" : ""}
      >
        <div className="nav-content">
          {/* ── Izquierda ── */}
          <div className="flex gap-2 py-4 items-center">
            <MyAge />
            <Link
              to="/"
              className="hidden sm:flex items-center gap-2 group"
            >
              <Terminal className="w-4 h-4 text-redteam group-hover:text-redteam/80 transition-colors" />
              <span className="font-SpaceMono text-xl font-bold text-white group-hover:text-redteam transition-colors duration-300">
                JHUNIORM<span className="text-redteam">.DEV</span>
              </span>
            </Link>
            <Link
              to="/servicio"
              className="hidden sm:inline-flex ml-4 items-baseline gap-1.5 px-3 py-1.5 rounded-sm transition-all duration-300 font-jetbrains text-xs"
              style={{
                color: "#94a3b8",
                border: "1px solid transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#00ff9f";
                e.currentTarget.style.borderColor = "rgba(0,255,159,0.3)";
                e.currentTarget.style.background = "rgba(0,255,159,0.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {t("Menu.Servicios")}
              <span className="text-[10px] uppercase tracking-wider text-redteam/70 font-normal">
                freelance
              </span>
            </Link>
          </div>

          {/* ── Derecha ── */}
          <div className="flex items-center gap-1">
            {currentLanguage && (
              <Tooltip text={currentLanguage.code === "es" ? "Español" : "English"} position="bottom">
                <div className="relative group mx-1 p-1.5 rounded-sm cursor-pointer transition-all duration-300"
                  style={{ border: "1px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.3)"; e.currentTarget.style.background = "rgba(255,45,85,0.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
                  onClick={toggleLanguage}>
                  <img
                    src={currentLanguage.icon}
                    alt={currentLanguage.code}
                    className="w-5 h-5 rounded-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </Tooltip>
            )}
            <Tooltip text={theme === "light" ? "Modo Oscuro" : "Modo Claro"} position="bottom">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} imageSource={imageSource} />
            </Tooltip>
            <button
              className="sm:hidden ml-1 p-2 rounded-sm transition-all duration-300"
              style={{ color: "#94a3b8", border: "1px solid transparent" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.4)"; e.currentTarget.style.color = "#ff2d55"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
              onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay móvil */}
      {overlayVisible && (
        <div
          className={`sm:hidden fixed inset-0 z-[110] flex flex-col transition-transform duration-300 ease-out ${
            entered && !isExiting ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ background: "#050a0f", borderLeft: "1px solid rgba(255,45,85,0.2)" }}
          role="dialog" aria-modal="true" aria-label="Menú de navegación"
        >
          {/* Top bar */}
          <div className="h-16 flex items-center justify-between px-4 shrink-0"
            style={{ borderBottom: "1px solid rgba(255,45,85,0.15)" }}>
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={closeMenu}>
              <Terminal className="w-5 h-5 text-redteam" />
              <span className="font-SpaceMono text-lg font-bold text-white">
                JHUNIORM<span className="text-redteam">.DEV</span>
              </span>
            </Link>
            <button
              type="button"
              className="p-2 rounded-sm transition-all duration-300"
              style={{ color: "#94a3b8", border: "1px solid rgba(255,45,85,0.2)" }}
              onClick={closeMenu} aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
            <Link
              to="/servicio"
              className="w-full max-w-sm flex flex-col items-center py-4 px-6 rounded-sm transition-all duration-300"
              style={{
                background: "rgba(255,45,85,0.05)",
                border: "1px solid rgba(255,45,85,0.2)",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.5)"; e.currentTarget.style.background = "rgba(255,45,85,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,45,85,0.2)"; e.currentTarget.style.background = "rgba(255,45,85,0.05)"; }}
              onClick={closeMenu}
            >
              <span className="font-SpaceMono text-lg font-semibold text-white">
                {t("Menu.Servicios")}
              </span>
              <span className="font-jetbrains text-xs uppercase tracking-wider text-redteam/70 mt-1">
                freelance
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
