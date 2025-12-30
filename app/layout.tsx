import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/providers/I18nProvider";
import { QueryProvider } from "./providers/QueryProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Instinct S | Elite Outdoor Bootcamps",
  description: "Connecting with nature where we awaken instincts. Elite outdoor fitness bootcamps in mountains, beaches, and beautiful natural places.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans`}>
        <QueryProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
