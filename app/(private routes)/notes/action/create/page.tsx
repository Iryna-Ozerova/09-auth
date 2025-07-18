import { Metadata } from 'next'
import NoteForm from "@/components/NoteForm/NoteForm"
import css from "./CreateNote.module.css"

export const metadata: Metadata = {
  title: "Create a new note",
  description: "Start a fresh note to keep track of your ideas.",
  openGraph: {
    title: "Create a new note",
    description: "Start a fresh note to keep track of your ideas.",
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://placehold.co/1200x630",
        width: 1200,
        height: 630,
        alt: "Create note",
      },
    ],
    type: "article",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}