import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Paws - Adopta a tu mascota y gestiona tu protectora",
  description: "Happy Paws es una aplicación para la adopación de mascotas, gestión de voluntariados y las gestiones para las protectoras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className} style={{margin:0, padding:0, overflowX:"hidden", overflowY: "auto"}}>{children}</body>
    </html>
  );
}


