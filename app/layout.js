import "./globals.css";

export const metadata = {
  title: "The Military Spices — Bold Flavours. Military Style Taste.",
  description:
    "Military-style cooking from The Military Spices, Hyderabad. Biryanis, fiery curries & bold non-veg favourites — order in one chat on WhatsApp.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2a1a0c",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,800;0,9..144,900;1,9..144,500;1,9..144,700&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
