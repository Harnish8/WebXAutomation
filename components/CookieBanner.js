"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't pop immediately on load
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (type) => {
    const value =
      type === "all"
        ? JSON.stringify({ essential: true, analytics: true, marketing: true })
        : type === "custom"
          ? JSON.stringify({ essential: true, ...prefs })
          : JSON.stringify({
              essential: true,
              analytics: false,
              marketing: false,
            });

    localStorage.setItem("cookie-consent", value);
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[9998]"
        >
          <div
            className="rounded-2xl p-5 md:p-6 shadow-2xl"
            style={{
              background: "rgba(243,238,249,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(115,44,124,0.20)",
              boxShadow:
                "0 8px 48px rgba(67,23,95,0.18), 0 2px 8px rgba(67,23,95,0.10)",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(115,44,124,0.10)",
                    border: "1px solid rgba(115,44,124,0.18)",
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: "#732c7c", fontSize: "1.1rem" }}
                  >
                    cookie
                  </span>
                </div>
                <p
                  className="font-headline font-black text-sm"
                  style={{ color: "#1a0a2e" }}
                >
                  We use cookies
                </p>
              </div>
              <button
                onClick={() => save("essential")}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-colors"
                style={{ color: "#8a6fa0" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "#1a0a2e")}
                onMouseOut={(e) => (e.currentTarget.style.color = "#8a6fa0")}
                aria-label="Dismiss"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "1.1rem" }}
                >
                  close
                </span>
              </button>
            </div>

            {/* Body */}
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: "#4a3560" }}
            >
              We use cookies to improve your experience, analyse site traffic
              and personalise content. You can choose which cookies to accept.{" "}
              <Link
                href="/privacy-policy"
                className="underline font-bold"
                style={{ color: "#732c7c" }}
              >
                Privacy Policy
              </Link>
            </p>

            {/* Expandable preferences */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="mb-4 space-y-2.5 pt-1">
                    {/* Essential always on */}
                    <div
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{
                        background: "rgba(115,44,124,0.05)",
                        border: "1px solid rgba(115,44,124,0.10)",
                      }}
                    >
                      <div>
                        <p
                          className="font-headline font-bold text-xs"
                          style={{ color: "#1a0a2e" }}
                        >
                          Essential
                        </p>
                        <p className="text-[11px]" style={{ color: "#8a6fa0" }}>
                          Required for the site to work
                        </p>
                      </div>
                      {/* Always on toggle */}
                      <div
                        className="w-9 h-5 rounded-full flex items-center justify-end pr-0.5 flex-shrink-0"
                        style={{ background: "#732c7c" }}
                      >
                        <div className="w-4 h-4 rounded-full bg-white" />
                      </div>
                    </div>

                    {/* Analytics */}
                    <div
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{
                        background: "rgba(115,44,124,0.05)",
                        border: "1px solid rgba(115,44,124,0.10)",
                      }}
                    >
                      <div>
                        <p
                          className="font-headline font-bold text-xs"
                          style={{ color: "#1a0a2e" }}
                        >
                          Analytics
                        </p>
                        <p className="text-[11px]" style={{ color: "#8a6fa0" }}>
                          Help us understand site usage
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPrefs((p) => ({ ...p, analytics: !p.analytics }))
                        }
                        className="w-9 h-5 rounded-full flex items-center flex-shrink-0 transition-all duration-300 relative"
                        style={{
                          background: prefs.analytics
                            ? "#732c7c"
                            : "rgba(115,44,124,0.15)",
                        }}
                      >
                        <motion.div
                          animate={{ x: prefs.analytics ? 18 : 2 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="w-4 h-4 rounded-full bg-white absolute"
                        />
                      </button>
                    </div>

                    {/* Marketing */}
                    <div
                      className="flex items-center justify-between p-3 rounded-xl"
                      style={{
                        background: "rgba(115,44,124,0.05)",
                        border: "1px solid rgba(115,44,124,0.10)",
                      }}
                    >
                      <div>
                        <p
                          className="font-headline font-bold text-xs"
                          style={{ color: "#1a0a2e" }}
                        >
                          Marketing
                        </p>
                        <p className="text-[11px]" style={{ color: "#8a6fa0" }}>
                          Personalised ads & content
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          setPrefs((p) => ({ ...p, marketing: !p.marketing }))
                        }
                        className="w-9 h-5 rounded-full flex items-center flex-shrink-0 transition-all duration-300 relative"
                        style={{
                          background: prefs.marketing
                            ? "#732c7c"
                            : "rgba(115,44,124,0.15)",
                        }}
                      >
                        <motion.div
                          animate={{ x: prefs.marketing ? 18 : 2 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className="w-4 h-4 rounded-full bg-white absolute"
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              {/* Accept All */}
              <button
                onClick={() => save("all")}
                className="w-full py-2.5 rounded-xl text-xs font-headline font-black uppercase tracking-widest transition-all"
                style={{
                  background: "linear-gradient(135deg,#732c7c,#43175f)",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 0 16px rgba(115,44,124,0.30)",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Accept All
              </button>

              <div className="flex gap-2">
                {/* Manage / Save Custom */}
                <button
                  onClick={() =>
                    showDetails ? save("custom") : setShowDetails(true)
                  }
                  className="flex-1 py-2.5 rounded-xl text-xs font-headline font-bold transition-all"
                  style={{
                    border: "1.5px solid rgba(115,44,124,0.30)",
                    color: "#732c7c",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "rgba(115,44,124,0.07)";
                    e.currentTarget.style.borderColor = "rgba(115,44,124,0.60)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(115,44,124,0.30)";
                  }}
                >
                  {showDetails ? "Save Preferences" : "Manage"}
                </button>

                {/* Reject All */}
                <button
                  onClick={() => save("essential")}
                  className="flex-1 py-2.5 rounded-xl text-xs font-headline font-bold transition-all"
                  style={{
                    border: "1.5px solid rgba(115,44,124,0.15)",
                    color: "#8a6fa0",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "rgba(115,44,124,0.35)";
                    e.currentTarget.style.color = "#4a3560";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "rgba(115,44,124,0.15)";
                    e.currentTarget.style.color = "#8a6fa0";
                  }}
                >
                  Essential Only
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
