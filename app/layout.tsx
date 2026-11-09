import type { Metadata, Viewport } from "next";
import "@fontsource/schibsted-grotesk/400.css";
import "@fontsource/schibsted-grotesk/600.css";
import "@fontsource/schibsted-grotesk/700.css";
import "@fontsource/schibsted-grotesk/800.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/noto-kufi-arabic/400.css";
import "@fontsource/noto-kufi-arabic/600.css";
import "@fontsource/noto-kufi-arabic/700.css";
import "@fontsource/noto-kufi-arabic/800.css";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Naif Alsalem | GRC Portfolio",
  description: "GRC portfolio of Naif Alsalem: an NCA ECC compliance case study in Arabic and English, and an ECC compliance platform.",
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
