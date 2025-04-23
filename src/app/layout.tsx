/* ----------------------------------------------------------------
   src/app/layout.tsx
----------------------------------------------------------------- */
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

/* ---------------------------------------------------------------
   1.  Load Inter from Google Fonts
---------------------------------------------------------------- */
const inter = Inter({
  variable: '--font-inter',   // custom CSS var so you can keep the pattern
  subsets: ['latin'],
  display: 'swap',            // avoids FOIT (optional)
});

/* ---------------------------------------------------------------
   2.  Site-wide metadata
---------------------------------------------------------------- */
export const metadata: Metadata = {
  title: 'JoeyMed – Intake',
  description: 'Personalised tele-health programs for weight loss, sexual health, and travel wellness.',
};

/* ---------------------------------------------------------------
   3.  Root layout
---------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      {/* apply Inter font vars + antialiasing */}
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
