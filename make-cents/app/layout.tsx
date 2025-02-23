import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={[
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          'bg-neutral-300 dark:bg-neutral-700',
          'text-neutral-800 dark:text-neutral-200',
        ].join(' ')}
      >
        {children}
      </body>
    </html>
  );
}

