import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const url = "https://substack-ops.chavan.in";
const description =
  "Standalone Substack CLI + 26-tool MCP server. Your IDE drafts the replies. Zero AI API keys.";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: "substack-ops — reply to your Substack from Cursor. No API keys.",
  description,
  keywords: ["substack", "mcp", "cli", "cursor", "ai", "automation", "ops", "substack api"],
  alternates: {
    canonical: url,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "substack-ops",
    description,
    url,
    siteName: "substack-ops",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "substack-ops",
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 font-sans">
        <div
          style={
            {
              ["--accent" as string]: "oklch(0.65 0.2 40)",
            } as React.CSSProperties
          }
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "substack-ops",
                "operatingSystem": "Any",
                "applicationCategory": "DeveloperApplication",
                "description": description,
                "url": url,
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                }
              }),
            }}
          />
          {children}
        </div>
      </body>
    </html>
  );
}
