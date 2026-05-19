import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Becubo - Tecnología 3D",
  description: "Innovación tecnológica con un cubo 3D interactivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}