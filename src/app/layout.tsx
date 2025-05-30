
import type { Metadata } from 'next';
import { Geist } from 'next/font/google'; // Using Geist Sans only as per P5R style (modern sans-serif)
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Persona Skill Forger',
  description: 'Forja tu Destino: ¡Desbloquea tu próxima Skill con IA!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
