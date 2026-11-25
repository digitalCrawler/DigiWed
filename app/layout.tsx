import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { GOOGLE_FONTS_HREF } from "@/lib/fonts";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FooterAd from "@/components/FooterAd";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Free Wedding Invitation Card Maker — Hindu, Muslim, Christian, Sikh & More",
    template: "%s | Shaadi Card Studio",
  },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Free Wedding Invitation Card Maker for Every Faith",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Wedding Invitation Card Maker — Shaadi Card Studio",
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "lifestyle",
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#f3ecd9",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: ["en-IN", "hi-IN"],
      publisher: { "@id": `${site.url}/#org` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${site.url}/templates?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      slogan: site.tagline,
    },
    {
      "@type": "WebApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      url: site.url,
      applicationCategory: "DesignApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript",
      description: site.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      featureList: [
        "Wedding card templates for every religion",
        "Canva-style drag and drop editor",
        "Hindi, English, Urdu and Punjabi fonts",
        "HD PNG and print-ready PDF download",
        "No watermark, no signup",
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsClient = site.adsense.client;
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={GOOGLE_FONTS_HREF} />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="has-footer-ad font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <FooterAd />
        {adsClient ? (
          <Script
            id="adsbygoogle-init"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
          />
        ) : null}
      </body>
    </html>
  );
}
