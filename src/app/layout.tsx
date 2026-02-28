import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, Caveat, Pacifico } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Nav from "@/components/Nav";
import ThemeScript from "@/components/ThemeScript";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "After Us — Breakup Recovery & Growth Journal",
  description: "A minimalist, personal breakup recovery and growth journal.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${cormorant.variable} ${caveat.variable} ${pacifico.variable} antialiased`}>
        <ThemeScript />
        <ThemeProvider>
          <AuthProvider>
            <Nav />
            <main className="min-h-screen pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pb-14">{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
