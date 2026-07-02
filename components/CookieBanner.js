"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [bannerMounted, setBannerMounted] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const t = setTimeout(() => {
        setVisible(true);
        requestAnimationFrame(() => setBannerMounted(true));
      }, 2000);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (type) => {
    const value =
      type === "all"
        ? JSON.stringify({ essential: true, analytics: true, marketing: true })
        : type === "custom"
          ? JSON.stringify({ essential: true, ...prefs })
          : JSON.stringify({ essential: true, analytics: false, marketing: false });

    localStorage.setItem("cookie-consent", value);
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    // Animate out
    setBannerMounted(false);
    setTimeout(() => setVisible(false), 450);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cookie-banner {
          transform: translateY(120px);
          opacity: 0;
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease;
        }
        .cookie-banner.visible {
          transform: translateY(0);
          opacity: 1;
        }
        .cookie-details {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .cookie-details.open {
          max-height: 300px;
          opacity: 1;
        }
        .toggle-thumb {
          width: 1rem;
          height: 1rem;
          border-radius: 50%;
          background: #fff;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: left 0.25s cubic-bezier(0.22,1,0.36,1);
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        aria-live="polite"
        className={`cookie-banner fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9998] ${bannerMounted ? "visible" : ""}`}
      >
        <div
          className="rounded-2xl p-5 md:p-6 shadow-2xl"
          style={{
            background: "rgba(243,238,249,0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(115,44,124,0.20)",
            boxShadow: "0 8px 48px rgba(67,23,95,0.18), 0 2px 8px rgba(67,23,95,0.10)",
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(115,44,124,0.10)", border: "1px solid rgba(115,44,124,0.18)" }}
                aria-hidden="true"
              >
                <span className="material-symbols-outlined" style={{ color: "#732c7c", fontSize: "1.1rem" }}>
                  cookie
                </span>
              </div>
              <p className="font-headline font-black text-sm" style={{ color: "#1a0a2e" }}>
                We use cookies
              </p>
            </div>
            <button
              onClick={() => save("essential")}
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-[rgba(115,44,124,0.08)]"
              style={{ color: "#8a6fa0" }}
              aria-label="Dismiss cookie banner, accept essential only"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "1.1rem" }}>close</span>
            </button>
          </div>

          {/* Body */}
          <p className="text-xs leading-relaxed mb-4" style={{ color: "#4a3560" }}>
            We use cookies to improve your experience, analyse site traffic and personalise content.{" "}
            <Link href="/privacy-policy" className="underline font-bold" style={{ color: "#732c7c" }}>
              Privacy Policy
            </Link>
          </p>

          {/* Expandable preferences */}
          <div className={`cookie-details ${showDetails ? "open" : ""}`} aria-hidden={!showDetails}>
            <div className="mb-4 space-y-2.5 pt-1">
              {/* Essential — always on */}
              {[
                { key: "essential", label: "Essential", desc: "Required for the site to work", alwaysOn: true },
                { key: "analytics", label: "Analytics", desc: "Help us understand site usage", alwaysOn: false },
                { key: "marketing", label: "Marketing", desc: "Personalised ads & content", alwaysOn: false },
              ].map(({ key, label, desc, alwaysOn }) => {
                const isOn = alwaysOn || prefs[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background: "rgba(115,44,124,0.05)", border: "1px solid rgba(115,44,124,0.10)" }}
                  >
                    <div>
                      <p className="font-headline font-bold text-xs" style={{ color: "#1a0a2e" }}>{label}</p>
                      <p className="text-[11px]" style={{ color: "#8a6fa0" }}>{desc}</p>
                    </div>
                    {alwaysOn ? (
                      <div
                        className="w-9 h-5 rounded-full flex-shrink-0 relative"
                        style={{ background: "#732c7c" }}
                        aria-label="Essential cookies — always on"
                        role="switch"
                        aria-checked="true"
                      >
                        <span className="toggle-thumb" style={{ left: "calc(100% - 1.25rem)" }} />
                      </div>
                    ) : (
                      <button
                        onClick={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
                        className="w-9 h-5 rounded-full flex-shrink-0 relative transition-colors duration-300"
                        style={{ background: isOn ? "#732c7c" : "rgba(115,44,124,0.15)" }}
                        role="switch"
                        aria-checked={isOn}
                        aria-label={`${label} cookies`}
                      >
                        <span
                          className="toggle-thumb"
                          style={{ left: isOn ? "calc(100% - 1.25rem)" : "0.125rem" }}
                        />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => save("all")}
              className="w-full py-2.5 rounded-xl text-xs font-headline font-black uppercase tracking-widest transition-opacity hover:opacity-85"
              style={{
                background: "linear-gradient(135deg,#732c7c,#43175f)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(115,44,124,0.30)",
              }}
            >
              Accept All
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => showDetails ? save("custom") : setShowDetails(true)}
                className="flex-1 py-2.5 rounded-xl text-xs font-headline font-bold transition-all hover:bg-[rgba(115,44,124,0.07)]"
                style={{ border: "1.5px solid rgba(115,44,124,0.30)", color: "#732c7c", background: "transparent", cursor: "pointer" }}
                aria-expanded={showDetails}
              >
                {showDetails ? "Save Preferences" : "Manage"}
              </button>
              <button
                onClick={() => save("essential")}
                className="flex-1 py-2.5 rounded-xl text-xs font-headline font-bold transition-all hover:border-[rgba(115,44,124,0.35)] hover:text-[#4a3560]"
                style={{ border: "1.5px solid rgba(115,44,124,0.15)", color: "#8a6fa0", background: "transparent", cursor: "pointer" }}
              >
                Essential Only
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
