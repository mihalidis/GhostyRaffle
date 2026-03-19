import { detectTheme, themes } from "@/lib/theme";
import DrawForm from "@/components/DrawForm";
import GhostMascot from "@/components/GhostMascot";

export default function Home() {
  const themeName = detectTheme();
  const theme = themes[themeName];
  const isWinter = themeName === "winter";

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#FF007F 1px, transparent 1px), linear-gradient(90deg, #FF007F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Arcade background decorations ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Twinkling pink stars — scattered across screen */}
        <div style={{ position: "absolute", top: "8%", left: "5%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 3s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 4s ease-in-out infinite 1.2s" }} />
        <div style={{ position: "absolute", top: "45%", left: "8%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 3.5s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", top: "65%", left: "12%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 2.8s ease-in-out infinite 0.5s" }} />
        <div style={{ position: "absolute", top: "85%", left: "4%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 3.2s ease-in-out infinite 3s" }} />
        <div style={{ position: "absolute", top: "12%", right: "6%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 3.8s ease-in-out infinite 0.3s" }} />
        <div style={{ position: "absolute", top: "35%", right: "10%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 2.5s ease-in-out infinite 1.5s" }} />
        <div style={{ position: "absolute", top: "55%", right: "4%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 4.2s ease-in-out infinite 0.7s" }} />
        <div style={{ position: "absolute", top: "75%", right: "8%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 3s ease-in-out infinite 2.2s" }} />
        <div style={{ position: "absolute", top: "92%", right: "14%", width: 3, height: 3, background: "#FF007F", animation: "twinkle 3.5s ease-in-out infinite 1s" }} />

        {/* Twinkling cyan stars */}
        <div style={{ position: "absolute", top: "30%", left: "20%", width: 2, height: 2, background: "#00E5FF", animation: "twinkle 5s ease-in-out infinite 0.8s" }} />
        <div style={{ position: "absolute", top: "70%", left: "18%", width: 2, height: 2, background: "#00E5FF", animation: "twinkle 4.5s ease-in-out infinite 2.5s" }} />
        <div style={{ position: "absolute", top: "25%", right: "18%", width: 2, height: 2, background: "#00E5FF", animation: "twinkle 4s ease-in-out infinite 1.8s" }} />
        <div style={{ position: "absolute", top: "60%", right: "20%", width: 2, height: 2, background: "#00E5FF", animation: "twinkle 5.5s ease-in-out infinite 3s" }} />

        {/* Floating ghosts — left side */}
        <div style={{ position: "absolute", top: "15%", left: "2%", animation: "ghostDrift 7s ease-in-out infinite" }}>
          <GhostMascot size={22} color="#FF007F" animate={false} />
        </div>
        <div style={{ position: "absolute", top: "50%", left: "4%", animation: "ghostDrift 8s ease-in-out infinite 2.5s" }}>
          <GhostMascot size={18} color="#00E5FF" animate={false} />
        </div>
        <div style={{ position: "absolute", top: "80%", left: "1%", animation: "ghostDrift 6s ease-in-out infinite 1s" }}>
          <GhostMascot size={20} color="#7B00FF" animate={false} />
        </div>

        {/* Floating ghosts — right side */}
        <div style={{ position: "absolute", top: "22%", right: "2%", animation: "ghostDrift 8.5s ease-in-out infinite 1.5s" }}>
          <GhostMascot size={20} color="#FFD700" animate={false} />
        </div>
        <div style={{ position: "absolute", top: "58%", right: "3%", animation: "ghostDrift 7s ease-in-out infinite 3s" }}>
          <GhostMascot size={22} color="#FF007F" animate={false} />
        </div>
        <div style={{ position: "absolute", top: "85%", right: "1%", animation: "ghostDrift 6.5s ease-in-out infinite 0.5s" }}>
          <GhostMascot size={18} color="#00E5FF" animate={false} />
        </div>

        {/* Falling dots — drifting downward */}
        <div style={{ position: "absolute", top: 0, left: "3%", width: 3, height: 3, borderRadius: "50%", background: "#FF007F", animation: "dotFall 8s linear infinite" }} />
        <div style={{ position: "absolute", top: 0, left: "9%", width: 2, height: 2, borderRadius: "50%", background: "#FFD700", animation: "dotFall 11s linear infinite 2s" }} />
        <div style={{ position: "absolute", top: 0, left: "16%", width: 3, height: 3, borderRadius: "50%", background: "#00E5FF", animation: "dotFall 9s linear infinite 4.5s" }} />
        <div style={{ position: "absolute", top: 0, left: "22%", width: 2, height: 2, borderRadius: "50%", background: "#FF007F", animation: "dotFall 13s linear infinite 1s" }} />
        <div style={{ position: "absolute", top: 0, right: "4%", width: 3, height: 3, borderRadius: "50%", background: "#FFD700", animation: "dotFall 10s linear infinite 3s" }} />
        <div style={{ position: "absolute", top: 0, right: "11%", width: 2, height: 2, borderRadius: "50%", background: "#7B00FF", animation: "dotFall 12s linear infinite 5.5s" }} />
        <div style={{ position: "absolute", top: 0, right: "18%", width: 3, height: 3, borderRadius: "50%", background: "#00E5FF", animation: "dotFall 9.5s linear infinite 7s" }} />
        <div style={{ position: "absolute", top: 0, right: "24%", width: 2, height: 2, borderRadius: "50%", background: "#FFD700", animation: "dotFall 14s linear infinite 0.5s" }} />
        <div style={{ position: "absolute", top: 0, left: "30%", width: 2, height: 2, borderRadius: "50%", background: "#FF007F", animation: "dotFall 11.5s linear infinite 6s" }} />
        <div style={{ position: "absolute", top: 0, right: "30%", width: 2, height: 2, borderRadius: "50%", background: "#7B00FF", animation: "dotFall 10.5s linear infinite 8s" }} />
      </div>

      <div className="relative w-full max-w-2xl flex flex-col gap-5">
        {/* Header — compact */}
        <header className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-end gap-4">
            <GhostMascot size={22} color={theme.ghostColor} animate />
            <GhostMascot size={48} color={theme.ghostColor} animate variant="idle" />
            <GhostMascot size={22} color={theme.ghostColor} animate />
          </div>

          <div>
            <h1
              className="text-xl sm:text-2xl font-['Press_Start_2P'] title-glitch cursor-blink"
              style={{ color: theme.ghostColor }}
            >
              GhostyRaffle
            </h1>
            <p className="mt-1.5 text-[7px] font-['Press_Start_2P'] text-[#B8A9D9] tracking-widest uppercase">
              SECRET GIFT EXCHANGE
            </p>
          </div>
        </header>

        {/* How it works — larger text, better contrast */}
        <div
          className="px-5 py-4 border-2 border-dashed bg-[#160D2A]"
          style={{ borderColor: isWinter ? "#1A3A6E" : "#3D1F6E" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">👻</span>
            <div>
              <p className="text-[9px] font-['Press_Start_2P'] text-[#D4C8F0] leading-relaxed mb-2">
                HOW IT WORKS
              </p>
              <ol className="list-none flex flex-col gap-2">
                {[
                  "Add participants (min 3, max 50)",
                  "Hit START DRAW",
                  "Each player gets a secret email",
                  "No one sees the full list — not even you",
                ].map((step, i) => (
                  <li key={i} className="text-[8px] font-['Press_Start_2P'] text-[#B8A9D9] leading-relaxed">
                    <span style={{ color: theme.ghostColor }}>{i + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Main card */}
        <section
          className="pixel-border p-5 sm:p-6"
          style={{ backgroundColor: "#1E1035" }}
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-dashed border-[#2A1550]">
            <GhostMascot size={20} color={theme.ghostColor} animate={false} />
            <h2 className="text-[10px] font-['Press_Start_2P'] text-[#B8A9D9] uppercase tracking-wider">
              Participants
            </h2>
          </div>

          <DrawForm ghostColor={theme.ghostColor} />
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[8px] font-['Press_Start_2P'] text-[#B8A9D9] leading-loose">
            🔒 YOUR DATA IS NEVER SAVED — COMPLETELY PRIVATE
          </p>
          <p className="mt-1 text-[7px] font-['Press_Start_2P'] text-[#7B6FA0]">
            GHOSTYRAFFLE © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </main>
  );
}
