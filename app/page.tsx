import { detectTheme, themes } from "@/lib/theme";
import DrawForm from "@/components/DrawForm";
import GhostMascot from "@/components/GhostMascot";

export default function Home() {
  const themeName = detectTheme();
  const theme = themes[themeName];
  const isWinter = themeName === "winter";

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-10 sm:py-16">
      {/* Background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(#FF007F 1px, transparent 1px), linear-gradient(90deg, #FF007F 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-2xl flex flex-col gap-8">
        {/* Header */}
        <header className="flex flex-col items-center gap-5 text-center">
          {/* Floating ghosts row */}
          <div className="flex items-end gap-6">
            <GhostMascot size={28} color={theme.ghostColor} animate />
            <GhostMascot size={64} color={theme.ghostColor} animate variant="idle" />
            <GhostMascot size={28} color={theme.ghostColor} animate />
          </div>

          {/* Title */}
          <div>
            <h1
              className="text-2xl sm:text-3xl font-['Press_Start_2P'] title-glitch cursor-blink"
              style={{ color: theme.ghostColor }}
            >
              GhostyRaffle
            </h1>
            <p className="mt-3 text-[8px] font-['Press_Start_2P'] text-[#B8A9D9] tracking-widest uppercase">
              {theme.label}
            </p>
          </div>

          {/* Tagline */}
          <p className="text-[8px] sm:text-[9px] font-['Press_Start_2P'] text-[#7B6FA0] leading-loose max-w-md">
            SECRET GIFT EXCHANGE — STATELESS & PRIVATE
            <br />
            NOT EVEN THE HOST KNOWS WHO GOT WHOM.
          </p>
        </header>

        {/* Info banner */}
        <div
          className="p-4 border-2 border-dashed"
          style={{ borderColor: isWinter ? "#1A3A6E" : "#3D1F6E" }}
        >
          <div className="flex items-start gap-3">
            <span className="text-lg flex-shrink-0">👻</span>
            <div>
              <p className="text-[8px] font-['Press_Start_2P'] text-[#B8A9D9] leading-loose">
                HOW IT WORKS
              </p>
              <ol className="mt-2 list-none flex flex-col gap-1">
                {[
                  "Add participants (min 3, max 50)",
                  "Hit START DRAW",
                  "Each player gets a secret email",
                  "No one sees the full list — not even you",
                ].map((step, i) => (
                  <li key={i} className="text-[7px] font-['Press_Start_2P'] text-[#7B6FA0] leading-loose">
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Main card */}
        <section
          className="pixel-border p-6 sm:p-8"
          style={{ backgroundColor: "#1E1035" }}
        >
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-[#2A1550]">
            <GhostMascot size={24} color={theme.ghostColor} animate={false} />
            <h2 className="text-[10px] font-['Press_Start_2P'] text-[#B8A9D9] uppercase tracking-wider">
              Participants
            </h2>
          </div>

          <DrawForm ghostColor={theme.ghostColor} />
        </section>

        {/* Privacy note */}
        <div className="text-center">
          <p className="text-[7px] font-['Press_Start_2P'] text-[#4A2080] leading-loose">
            ⚡ STATELESS · NO DATABASE · NO LOGS ⚡
            <br />
            MATCHES LIVE ONLY IN MEMORY DURING EXECUTION
          </p>
        </div>

        {/* Footer */}
        <footer className="text-center border-t-2 border-[#1A0D2E] pt-6">
          <p className="text-[7px] font-['Press_Start_2P'] text-[#2A1550]">
            GHOSTYRAFFLE © {new Date().getFullYear()} · BUILT WITH NEXT.JS & RESEND
          </p>
        </footer>
      </div>
    </main>
  );
}
