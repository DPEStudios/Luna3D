import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/tokens.css";
import "./globals.css";
import { CartDrawer } from "../components/cart/CartDrawer";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luna 3D | Impresión 3D Inteligente",
  description: "Descubre artículos de tendencia, decoración y gadgets impresos en 3D bajo un sistema de optimización radical.",
};

import { ToastContainer } from "../components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Header />
          {children}
          <Footer />
        </div>
        <CartDrawer />
        <ToastContainer />
      </body>
    </html>
  );
}
