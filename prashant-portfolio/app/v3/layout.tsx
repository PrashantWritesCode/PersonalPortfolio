import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prashant Kumar | Builder's Portfolio",
  description:
    "Fullstack Builder specializing in .NET, Angular, and Azure. Building scalable solutions, shipping MVPs, and solving complex problems with modern tech stacks.",
  keywords: [
    "Prashant Kumar",
    "Fullstack Developer",
    ".NET Developer",
    "Angular Developer",
    "Azure Solutions Architect",
    "Web Development",
    "Cloud Computing",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Prashant Kumar" }],
  creator: "Prashant Kumar",
  publisher: "Prashant Kumar",
  metadataBase: new URL("https://prashant-portfolio.vercel.app"),
  alternates: {
    canonical: "/v3",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prashant-portfolio.vercel.app/v3",
    title: "Prashant Kumar | Builder's Portfolio",
    description:
      "Fullstack Builder specializing in .NET, Angular, and Azure. Building scalable solutions and shipping MVPs with modern tech stacks.",
    siteName: "Prashant Kumar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prashant Kumar - Fullstack Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Kumar | Builder's Portfolio",
    description:
      "Fullstack Builder specializing in .NET, Angular, and Azure. I BUILD. I SHIP. I SOLVE.",
    creator: "@PrashantBuilds",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function V3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
