import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRESER - Asociación para el Manejo Integral de la Fibromialgia",
  description: "OSC Asociación para el Manejo Integral y Preventivo de la Fibromialgia y la Fatiga Crónica Creser A. C. - Apoyo integral para pacientes con fibromialgia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
