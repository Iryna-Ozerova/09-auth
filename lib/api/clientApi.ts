import { nextServer } from "./api";
import type { Note, NewNoteData } from "@/types/note";

import type {
  User,
  RegisterRequest,
  LoginRequest,
  CheckSessionRequest,
} from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (query.trim()) params.search = query;
  if (tag && tag.toLowerCase() !== "all") {
    params.tag = tag;
  }

  const res = await nextServer.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  const res = await nextServer.post<Note>("/notes", noteData);
  return res.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

//register

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

//login

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

//checkSession

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

//getMe

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

//updateProfile
export const updateProfile = async (data: { username: string }) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};

//logout

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};
