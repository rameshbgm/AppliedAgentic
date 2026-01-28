import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google'
import "./globals.css";
import { Lenis } from "@/lib/lenis";
import { Background3DWrapper } from "@/components/Background3DWrapper";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: "AppliedAgentic | Learning Platform",
  description: "Master Agentic AI and Production ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <Background3DWrapper />
        <Lenis>
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </Lenis>
      </body>
    </html>
  );
}

