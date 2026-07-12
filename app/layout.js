import "./globals.css";
import { Archivo } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
  axes: ["wdth"],
});

export const metadata = {
  title: "The Military Spices | Bold Flavours. Military Style Taste.",
  description:
    "Military-hotel style cooking from The Military Spices, Hyderabad. Biryanis, fiery curries and bold non-veg favourites. Order in one chat on WhatsApp.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14160F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>{children}</body>
    </html>
  );
}
