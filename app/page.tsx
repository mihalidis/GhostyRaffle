import { detectTheme, themes } from "@/lib/theme";
import DrawForm from "@/components/DrawForm";
import GhostMascot from "@/components/GhostMascot";

/* Arcade background stars — positioned randomly via inline styles */
const STARS = [
  { top: "8%",  left: "5%",  dur: "3s",  delay: "0s" },
  { top: "15%", left: "12%", dur: "4s",  delay: "1.2s" },
  { top: "25%", left: "3%",  dur: "2.5s", delay: "0.5s" },
  { top: "40%", left: "8%",  dur: "3.5s", delay: "2s" },
  { top: "55%", left: "6%",  dur: "4.5s", delay: "0.8s" },
  { top: "70%", left: "10%", dur: "3s",  delay: "1.5s" },
  { top: "85%", left: "4%",  dur: "2.8s", delay: "3s" },
  { top: "12%", right: "6%", dur: "3.2s", delay: "0.3s" },
  { top: "22%", right: "10%",dur: "4s",  delay: "2.5s" },
  { top: "35%", right: "4%", dur: "2.5s", delay: "1s" },
  { top: "50%", right: "8%", dur: "3.8s", delay: "0.7s" },
  { top: "65%", right: "12%",dur: "3s",  delay: "2.2s" },
  { top: "78%", right: "5%", dur: "4.2s", delay: "1.8s" },
  { top: "90%", right: "9%", dur: "2.6s", delay: "0.4s" },
];

/* Pac-dots drifting down */
const PACDOTS = [
  { left: "7%",  dur: "14s", delay: "0s" },
  { left: "15%", dur: "18s", delay: "3s" },
  { left: "85%", dur: "16s", delay: "6s" },
  { left: "92%", dur: "13s", delay: "1s" },
  { left: "3%",  dur: "20s", delay: "8s" },
  { left: "95%", dur: "15s", delay: "4s" },
];

/* Side ghosts: colour + position + animation timing */
const SIDE_GHOSTS = [
  { color: "#FF007F", top: "18%", left: "2%",  dur: "6s",  delay: "0s" },
  { color: "#00E5FF", top: "50%", left: "3%",  dur: "7.5s", delay: "2s" },
  { color: "#7B00FF", top: "78%", left: "1%",  dur: "5.5s", delay: "1s" },
  { color: "#FFD700", top: "25%", right: "2%", dur: "8s",  delay: "1.5s" },
  { color: "#FF007F", top: "60%", right: "3%", dur: "6.5s", delay: "3s" },
  { color: "#00E5FF", top: "88%", right: "1%", dur: "7s",  delay: "0.5s" },
];

export default function Home() {
  const themeName = detectTheme();
  const theme = themes[themeName];
  const isWinter = themeName === "winter";

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#FF007F 1px, transparent 1px), linear-gradient(90deg, #FF007F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Arcade background elements ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Twinkling stars */}
        {STARS.map((s, i) => {
          const pos: Record<string, string> = { top: s.top };
          if ("left" in s && s.left) pos.left = s.left;
          if ("right" in s && s.right) pos.right = s.right;
          return (
            <div
              key={`star-${i}`}
              className="arcade-star"
              style={{ ...pos, "--dur": s.dur, "--delay": s.delay } as React.CSSProperties}
            />
          );
        })}

        {/* Pac-dots drifting down */}
        {PACDOTS.map((d, i) => (
          <div
            key={`dot-${i}`}
            className="arcade-dot"
            style={{
              left: d.left,
              top: "-10px",
              "--dur": d.dur,
              "--delay": d.delay,
            } as React.CSSProperties}
          />
        ))}

        {/* Floating ghosts on sides */}
        {SIDE_GHOSTS.map((g, i) => {
          const gpos: Record<string, string> = { top: g.top, position: "absolute" };
          if ("left" in g && g.left) gpos.left = g.left;
          if ("right" in g && g.right) gpos.right = g.right;
          return (
            <div
              key={`ghost-${i}`}
              className="arcade-ghost"
              style={{ ...gpos, "--dur": g.dur, "--delay": g.delay } as React.CSSProperties}
            >
              <GhostMascot size={20 + (i % 3) * 4} color={g.color} animate={false} />
            </div>
          );
        })}
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
