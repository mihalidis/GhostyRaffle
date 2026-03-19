import { detectTheme, themes } from "@/lib/theme";
import DrawForm from "@/components/DrawForm";
import GhostMascot from "@/components/GhostMascot";

export default function Home() {
  const themeName = detectTheme();
  const theme = themes[themeName];

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-6 sm:py-8">
      <div className="page-bg-grid" aria-hidden />

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
              className={`text-xl sm:text-2xl font-['Press_Start_2P'] title-glitch cursor-blink ${theme.ghostText}`}
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
          className={`px-5 py-4 border-2 border-dashed bg-[#160D2A] ${theme.surfaceBorder}`}
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
                    <span className={theme.ghostText}>{i + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Main card */}
        <section className={`pixel-border p-5 sm:p-6 ${theme.surface}`}>
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
