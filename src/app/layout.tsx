import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/tokens.css";
import "./globals.css";
import { CartDrawer } from "../components/cart/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luna 3D | Impresión 3D Inteligente",
  description: "Descubre artículos de tendencia, decoración y gadgets impresos en 3D bajo un sistema de optimización radical.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
