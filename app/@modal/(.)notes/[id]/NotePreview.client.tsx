"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";

import Modal from "@/components/Modal/Modal";
import css from "./NoteDetails.module.css";

const NotePreview = () => {
  const router = useRouter();
  const close = () => router.back();

  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(parsedId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <button className={css.editBtn}>Edit note</button>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
