import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.shortName}`
  },
  description: site.tagline,
  metadataBase: new URL(site.baseUrl),
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script src="https://cdn.weglot.com/weglot.min.js"></script>
        <script dangerouslySetInnerHTML={{ __html: `Weglot.initialize({ api_key: 'wg_212e4d298a21c5b5803a67a9cf455e4c8' });` }} />
      </head>
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
