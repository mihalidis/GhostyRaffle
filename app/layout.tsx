import type { Metadata } from "next";
import "./globals.css";
import ArcadeBackground from "@/components/ArcadeBackground";

export const metadata: Metadata = {
  title: "GhostyRaffle — Stateless Secret Gift Exchange",
  description:
    "A pixel-art secret gift exchange where no one — not even the host — can see who got matched with whom. Powered by the Ghosty Algorithm.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👻</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <ArcadeBackground />
        <div className="relative z-10 flex min-h-full min-w-0 flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
