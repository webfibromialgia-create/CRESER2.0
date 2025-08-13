import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { homeSEO } from "@/lib/seo";
import { CRESEROrganizationSchema } from "./components/SEOSchema";
import GoogleTagManager from "./components/GoogleTagManager";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = homeSEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Meta tags adicionales para SEO */}
        <meta name="geo.region" content="MX-GUA" />
        <meta name="geo.placename" content="León, Guanajuato" />
        <meta name="geo.position" content="21.1253;-101.6861" />
        <meta name="ICBM" content="21.1253, -101.6861" />
        
        {/* Meta tags para redes sociales */}
        <meta property="og:site_name" content="CRESER - Asociación Fibromialgia" />
        <meta property="og:locale" content="es_MX" />
        <meta name="twitter:site" content="@creser_fibromialgia" />
        <meta name="twitter:creator" content="@creser_fibromialgia" />
        
        {/* Meta tags para dispositivos móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6B83BD" />
        <meta name="msapplication-TileColor" content="#6B83BD" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CRESER" />
        
        {/* Meta tags para búsquedas locales */}
        <meta name="business:contact_data:street_address" content="Paseo de las Águilas No. 95" />
        <meta name="business:contact_data:locality" content="León" />
        <meta name="business:contact_data:region" content="Guanajuato" />
        <meta name="business:contact_data:postal_code" content="37685" />
        <meta name="business:contact_data:country_name" content="México" />
        <meta name="business:contact_data:phone_number" content="+52-477-412-5698" />
        
        {/* Google Tag Manager */}
        <GoogleTagManager />
        
        {/* Google Analytics 4 - Etiqueta directa */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S90YCWHZX9"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S90YCWHZX9');
          `}
        </Script>
        
        {/* Schema.org estructurado */}
        <CRESEROrganizationSchema />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
