import type { Metadata } from "next"
import NotesClient from "./Notes.client"
import { fetchNotes } from "@/lib/api/clientApi"
import type { NotesResponse } from "@/types/note"

type Props = {
  params: Promise<{ slug?: string[] }>; 
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params; 
  const perPage = 12;
  const initialPage = 1;
  const initialSearch = "";

  const tag = slug?.[0]; 

  const initialData: NotesResponse = await fetchNotes(
    initialPage,
    initialSearch,
    perPage,
    tag
  );

  return (
    <NotesClient
      initialPage={initialPage}
      initialSearch={initialSearch}
      initialData={initialData}
      initialTag={tag || ""}
    />
  );
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const tag = slug?.[0] || "All";

  return {
    title: `Notes: ${tag}`,
    description: `Browse notes filtered by the ${tag} category`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `Browse notes filtered by the ${tag} category`,
      url: `https://notehub.com/notes/${tag}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag,
        },
      ],
      type: 'website',
    },
  }
}