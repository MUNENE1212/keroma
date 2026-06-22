import { fraunces, inter, jetbrains } from "@/lib/fonts";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://keroma.ementech.co.ke"),
  title: {
    default: "KEROMA — Recipes that remember.",
    template: "%s · KEROMA",
  },
  description:
    "African heritage recipe intelligence. Tell us what's in your kitchen and we'll suggest real recipes from across the continent — with the cultural context that makes them worth making.",
  keywords: [
    "African recipes",
    "heritage cooking",
    "Kenyan food",
    "Swahili cooking",
    "AI recipes",
    "pantry to plate",
  ],
  authors: [{ name: "Munene Denis", url: "https://ementech.co.ke" }],
  creator: "EMENTECH — Emen Engineering",
  publisher: "KEROMA",
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://keroma.ementech.co.ke",
    siteName: "KEROMA",
    title: "KEROMA — Recipes that remember.",
    description:
      "African heritage recipe intelligence. From your pantry to a real meal.",
    images: [
      {
        url: "/og/default.png",
        width: 1280,
        height: 640,
        alt: "KEROMA — Recipes that remember.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KEROMA — Recipes that remember.",
    description: "African heritage recipe intelligence.",
    creator: "@MunE_nE",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#B5482A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-cream text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}