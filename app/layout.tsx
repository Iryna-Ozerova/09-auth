import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import AuthProvider from "@/components/AuthProvider/AuthProvider"
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"

import "./globals.css"

export const metadata: Metadata = {
  title: "Note Hub",
  description: "Create, organize, and filter notes with tags in a simple, fast, and responsive web app.",
  openGraph: {
    title: "Note Hub",
      description: "Create, filter, and manage your notes with ease using Note Hub.",
    url: "/", //посилання на живу сторінку тут потрібно!
      images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Image",
      },
    ],
    type: "website",
  },
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
          <Header />
          {children}
          {modal}
          <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
