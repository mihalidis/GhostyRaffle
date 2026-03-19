import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
