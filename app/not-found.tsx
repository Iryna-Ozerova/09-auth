import type { Metadata } from "next"
import NotFoundClient from "./not-found.client"


export const metadata: Metadata = {
      title: "Page Not Found - Note Hub",
      description: "The page you are looking for does not exist in Note Hub.",
    openGraph: {
      title: "404 - Page Not Found",
      description: "Sorry, the page you requested could not be found.",
      url: "https://notehub.com/404", 
      images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Page Image",
      },
    ],
    type: "website",
  },
};

export default function NotFoundPage() {
  return <NotFoundClient />
}