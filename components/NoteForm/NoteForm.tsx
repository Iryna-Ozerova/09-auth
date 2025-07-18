"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import type { NewNoteData } from "@/types/note"
import { createNote } from "@/lib/api/clientApi"
import { useNoteDraftStore } from '@/lib/store/noteStore'

import css from "./NoteForm.module.css";


export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    },
    });

    const handleCancel = () => router.back();

    const handleSubmit = (formData: FormData) => {
    const values: NewNoteData = {
    title: formData.get("title")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    tag: formData.get("tag")?.toString() || "Todo",
  }; 

  mutate(values);
};

  return (
      <form action={handleSubmit} className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" defaultValue={draft?.title} onChange={handleChange} required className={css.input} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              defaultValue={draft?.content}
              onChange={handleChange}
              rows={8}
              className={css.textarea}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag"
              defaultValue={draft?.tag}
              onChange={handleChange}
              className={css.select}>
          
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>Create note</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}