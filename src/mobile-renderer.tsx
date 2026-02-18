import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import logo from "../assets/logo.png";

function MobileApp() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #0f0f11 0%, #1a1a2e 50%, #16213e 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Inter', 'Geist', system-ui, sans-serif",
                color: "#ffffff",
                padding: "24px",
                textAlign: "center",
            }}
        >
            {/* Logo */}
            <div
                style={{
                    width: "96px",
                    height: "96px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    marginBottom: "24px",
                    boxShadow: "0 0 40px rgba(99, 102, 241, 0.4)",
                }}
            >
                <img src={logo} alt="Codiner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Title */}
            <h1
                style={{
                    fontSize: "32px",
                    fontWeight: "800",
                    margin: "0 0 8px 0",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                Codiner
            </h1>

            <p
                style={{
                    fontSize: "16px",
                    color: "#94a3b8",
                    margin: "0 0 48px 0",
                    fontWeight: "500",
                }}
            >
                Free, local, open-source AI app builder
            </p>

            {/* Info Card */}
            <div
                style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "340px",
                    width: "100%",
                    marginBottom: "32px",
                    backdropFilter: "blur(10px)",
                }}
            >
                <div style={{ fontSize: "32px", marginBottom: "12px" }}>🖥️</div>
                <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 8px 0", color: "#e2e8f0" }}>
                    Desktop App Required
                </h2>
                <p style={{ fontSize: "14px", color: "#94a3b8", margin: 0, lineHeight: "1.6" }}>
                    Codiner's AI engine runs locally on your desktop. Download the desktop app to start building.
                </p>
            </div>

            {/* Download Button */}
            <a
                href="https://github.com/Subhan-Haider/Codiner-Software/releases"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "14px 28px",
                    borderRadius: "12px",
                    fontWeight: "700",
                    fontSize: "16px",
                    boxShadow: "0 4px 24px rgba(99, 102, 241, 0.4)",
                    marginBottom: "16px",
                }}
            >
                ⬇️ Download for Desktop
            </a>

            {/* Features */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    maxWidth: "340px",
                    width: "100%",
                    marginTop: "32px",
                }}
            >
                {[
                    { icon: "🤖", label: "AI Powered" },
                    { icon: "🔒", label: "100% Local" },
                    { icon: "⚡", label: "Fast Build" },
                    { icon: "🆓", label: "Free & Open" },
                ].map((f) => (
                    <div
                        key={f.label}
                        style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "12px",
                            padding: "16px 12px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <span style={{ fontSize: "24px" }}>{f.icon}</span>
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#cbd5e1" }}>{f.label}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <p style={{ fontSize: "12px", color: "#475569", marginTop: "40px" }}>
                v{__APP_VERSION__} • codiner.online
            </p>
        </div>
    );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");
const root = createRoot(container);
root.render(
    <StrictMode>
        <MobileApp />
    </StrictMode>
);
